import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import BackgroundEditor from '../components/background/BackgroundEditor';
import TextEditor from '../components/text/TextEditor';
import MenubarExtrasEditor from '../MenubarExtrasEditor';
import LogoDisplaySettings from '../LogoDisplaySettings';
import LinksSettings from '../LinksSettings';
import DesktopMenubarSettings from './menubar_settings_components/DesktopMenubarSettings';
import TabletMenubarSettings from './menubar_settings_components/TabletMenubarSettings';
import MobileMenubarSettings from './menubar_settings_components/MobileMenubarSettings';
import LayoutStyleDnD from '../components/LayoutStyleDnd';
import { RootState } from '../../../app/store';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import UploadLogo from '../../UploadLogo';

const MenuSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.layoutSettings);
  const currentStore = useSelector((state: RootState) => state.stores.currentStore);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDeviceOption, setSelectedDeviceOption] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});


  if (!currentStore) {
    return <div>Loading store data...</div>;
  }

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const toggleEditor = () => setIsOpen((prev) => !prev);
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleEditor}
      >
        Menu Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-gray-100 w-full p-1 space-y-3">
          <div className='relative p-2'>
            <div className='absolute -top-1 left-3 bg-gray-100 px-2'>
              <p className='font-medium'>General</p>
            </div>
            <div className='border-[3px] rounded-md pt-4'>
              <LayoutStyleDnD />
              <div className="flex items-center space-x-2 p-2">
                <label>Has Search Bar</label>
                <input
                  type="checkbox"
                  checked={settings.menubar.hasSearchbar}
                  onChange={(e) => handleSettingChange('menubar.hasSearchbar', e.target.checked)}
                />
              </div>
              <div className="flex items-center space-x-2 p-2">
                <label>Is Sticky</label>
                <input
                  type="checkbox"
                  checked={settings.menubar.isSticky}
                  onChange={(e) => handleSettingChange('menubar.isSticky', e.target.checked)}
                />
              </div>
              <BackgroundEditor 
                objectPath="menubar.background" 
                settings={settings} 
                handleSettingChange={handleSettingChange}
              />
              <TextEditor 
                objectPath="menubar.textStyle" 
                settings={settings} 
                handleSettingChange={handleSettingChange}
              />
            </div>
          </div>

          <div className='border-[3px] rounded-md p-1'>
            <label htmlFor="deviceEditorDropdown" className="block text-sm font-medium text-gray-700">
              Edit Menubar by Device
            </label>
            <select
              id="deviceEditorDropdown"
              value={selectedDeviceOption || ''}
              onChange={(e) => setSelectedDeviceOption(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            >
              <option value="">-- Select Device View --</option>
              <option value="desktop">Desktop Menubar Settings</option>
              <option value="tablet">Tablet Menubar Settings</option>
              <option value="mobile">Mobile Menubar Settings</option>
            </select>

            <div className="mt-4">
              {selectedDeviceOption === 'desktop' && (
                <DesktopMenubarSettings
                  objectPath="menubar.desktop"
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
              )}
              {selectedDeviceOption === 'tablet' && (
                <TabletMenubarSettings
                  objectPath="menubar.tablet"
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
              )}
              {selectedDeviceOption === 'mobile' && (
                <MobileMenubarSettings
                  objectPath="menubar.mobile"
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
              )}
            </div>
          </div>

          

          <div className='border-[3px] rounded-md p-1'>
            <label htmlFor="editorDropdown" className="block text-sm font-medium text-gray-700">
              Choose what to edit
            </label>
            <select
              id="editorDropdown"
              value={selectedOption || ''}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
            >
              <option value="">-- Select --</option>
              <option value="menubarExtras">Menubar Extras Editor</option>
              <option value="logoSettings">Logo Display Settings</option>
              <option value="linkSettings">Links Settings Editor</option>
            </select>

            <div className="mt-4">
              {selectedOption === 'menubarExtras' && <MenubarExtrasEditor/>}
              {selectedOption === 'logoSettings' && <LogoDisplaySettings storeId={currentStore._id} />}
              {selectedOption === 'linkSettings' && <LinksSettings linkItems={["Home", "About", "Services", "Products"]} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSettings;
