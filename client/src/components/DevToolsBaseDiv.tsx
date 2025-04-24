import React, { useState, useEffect } from 'react';

const DevToolsBaseDiv: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [width, setWidth] = useState(412);
  const [height, setHeight] = useState(915);
  const [scale, setScale] = useState(1);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const deviceSizes = [
    { name: 'Mobile', width: 412, height: 915 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1080, height: 720 },
  ];

  const handleDeviceClick = (device: { width: number, height: number }) => {
    setWidth(device.width);
    setHeight(device.height);
    setScale(calculateScale(device.width, device.height));
  };

  const calculateScale = (iframeWidth: number, iframeHeight: number) => {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const scaleHeight = screenHeight / iframeHeight;
    const scaleWidth = screenWidth / iframeWidth;
    return Math.min(scaleHeight, scaleWidth);
  };

  useEffect(() => {
    setScale(calculateScale(width, height));
    const handleResize = () => setScale(calculateScale(width, height));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center">
        <span>Chrome DevTools</span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gray-600 px-2 py-1 rounded"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded && (
        <div className="flex-grow flex items-center justify-center bg-gray-900 p-4">
          <div
            className="relative"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              overflow: 'hidden'
            }}
          >
            <iframe
              src="http://localhost:5175/"
              title="Responsive Preview"
              className="absolute top-0 left-0 w-full h-full border border-gray-300 bg-white"
              style={{
                transform: 'scale(1)',
                transformOrigin: 'top left'
              }}
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="bg-gray-800 text-white p-2 flex justify-center gap-4">
          {deviceSizes.map((device) => (
            <button
              key={device.name}
              onClick={() => handleDeviceClick(device)}
              className="bg-gray-600 px-4 py-2 rounded"
              disabled={!iframeLoaded}
            >
              {device.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevToolsBaseDiv;
