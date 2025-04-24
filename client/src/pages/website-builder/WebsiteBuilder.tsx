import React from 'react';
import SettingsSection2 from '../../components/layoutcreator/SettingsSection2.tsx';
import StorePage from '../StorePage.tsx';
import { FaMobileAlt } from 'react-icons/fa';
import { IoIosDesktop, IoMdTabletPortrait } from 'react-icons/io';
import { DeviceProvider, useDevice } from '../../components/context/DeviceContext.tsx';
import { RenderProvider } from '../../components/context/RenderContext.tsx'; 
import SaveLayoutButton from '../../components/layoutcreator/components/SaveLayoutButton.tsx';
import ScribblerComponent from '../../components/ScribblerComponent.tsx';

const DeviceSelector: React.FC = () => {
  const { setDevice } = useDevice();

  const deviceSizes = [
    { name: 'Mobile', icon: FaMobileAlt, value: 'mobile' },
    { name: 'Tablet', icon: IoMdTabletPortrait, value: 'tablet' },
    { name: 'Desktop', icon: IoIosDesktop, value: 'desktop' },
  ];

  return (
    <div className="bg-gray-800 h-auto flex justify-center items-center border-black border">
      <div className="device-selector flex gap-2">
        {deviceSizes.map(({ name, icon: IconComponent, value }) => (
          <button
            key={name}
            onClick={() => setDevice(value as 'mobile' | 'tablet' | 'desktop')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center gap-2"
          >
            <IconComponent className="h-5 w-5" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const WebsiteBuilderContent: React.FC = () => {
  const { device } = useDevice();

  const sizeMap = {
    mobile: { width: 412, height: 840, scale: 0.8 },
    tablet: { width: 775, height: 1024, scale: 1 },
    desktop: { width: 1080, height: 720, scale: 1 },
  };

  const { width, height, scale } = sizeMap[device];

  return (
    <RenderProvider value="websitePreview"> {/* ✅ Wrap in RenderProvider */}
      <div className="h-screen">

        {/* Device togglers */}
        <div className="h-[7vh]">
          <DeviceSelector />
        </div>

        <div className="website-builder h-[93vh] flex flex-row">
          {/* Settings section */}
          <SettingsSection2 />

          {/* Preview Area */}
          <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center p-0">
            <div
              className="transform origin-top"
              style={{
                transform: `scale(${scale})`,
                width,
                height,
                border: '1px solid gray',
                backgroundColor: '#d0e6ff',
                aspectRatio: `${width}/${height}`,
                overflow: 'hidden',
              }}
            >
              <StorePage storeId="673b12d6bc4d7c110af208ac" />

            </div>
          </div>

          <SaveLayoutButton />
        </div>
      </div>
    </RenderProvider>
  );
};

const WebsiteBuilder: React.FC = () => (
  <DeviceProvider>
    <WebsiteBuilderContent />
  </DeviceProvider>
);

export default WebsiteBuilder;
