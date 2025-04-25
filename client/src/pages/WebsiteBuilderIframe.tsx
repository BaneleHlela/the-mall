import React, {useState} from 'react';
import { FaMobileAlt } from "react-icons/fa";
import { IoIosDesktop, IoMdTabletPortrait } from "react-icons/io";
import SettingsSection2 from '../components/storecomponents/layoutcreator/SettingsSection2.tsx';
import Menubar from '../components/storecomponents/Menubar.tsx';
import WebsitePreview from '../components/WebsitePreview.tsx';

const WebsiteBuilderIframe: React.FC = () => {
  const layoutId = "";

  const [width, setWidth] = useState(412);
  const [height, setHeight] = useState(840);

  const deviceSizes = [
    { name: 'Mobile', width: 412, height: 840 },
    { name: 'Tablet', width: 775, height: 1024 },
    { name: 'Desktop', width: 1080, height: 720 },
  ];

  const handleDeviceClick = (device: { width: number, height: number }) => {
    setWidth(device.width);
    setHeight(device.height);
  };

  return (
      <div className="h-screen">
        <Menubar layoutId='6735de6e667ae350517109cc'/>
        {/* togglers */}
        <div className="h-[7vh]">
          <div className="bg-gray-800 h-auto flex justify-center items-center border-black border">
            <div className="device-selector flex gap-2">
              {deviceSizes.map((device) => {
                let IconComponent;
                if (device.name === 'Mobile') IconComponent = FaMobileAlt;
                else if (device.name === 'Tablet') IconComponent = IoMdTabletPortrait;
                else if (device.name === 'Desktop') IconComponent = IoIosDesktop;

                return (
                    <button
                        key={device.name}
                        onClick={() => handleDeviceClick(device)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center gap-2"
                    >
                      {IconComponent && <IconComponent className="h-5 w-5"/>}
                      <span>{device.name}</span>
                    </button>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="website-builder h-[93vh] flex flex-row">
          {/* Settings section */}
          <SettingsSection2/>
          {/* Website Preview, width adjusted */}
          {width === 412 &&
              <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center p-0">
                {/* <StorePage storeId='673b12d6bc4d7c110af208ac' renderedIn="layoutCreator"/> */}
                <iframe
                    src='../components/WebsitePreview.tsx'
                    title="Responsive Preview"
                    className="scale-[0.7]"
                    style={{
                      position: 'absolute',
                      width: width,
                      height: height,
                      border: '1px solid gray',
                      backgroundColor: '#d0e6ff',
                      aspectRatio: `${width}/${height}`
                    }}
                />
              </div>
          }
          {width === 775 &&
              <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center p-0">
                <iframe
                    src='../components/WebsitePreview.tsx'
                    title="Responsive Preview"
                    className="scale-[0.7]"
                    style={{
                      position: 'absolute',
                      width: width,
                      height: height,
                      border: '1px solid gray',
                      backgroundColor: '#d0e6ff',
                      aspectRatio: `${width}/${height}`
                    }}
                />
              </div>
          }
          {width === 1080 &&
              <div className="overflow-auto relative w-full max-h-full flex flex-row items-center justify-center p-0">
                <iframe
                    src='../components/WebsitePreview.tsx'
                    title="Responsive Preview"
                    className="scale-[0.9]"
                    style={{
                      position: 'absolute',
                      width: width,
                      height: height,
                      border: '1px solid gray',
                      backgroundColor: '#d0e6ff',
                      aspectRatio: `${width}/${height}`
                    }}
                />
              </div>
          }
          <button>Save</button>
        </div>

      </div>
  );
};


export default WebsiteBuilderIframe;
