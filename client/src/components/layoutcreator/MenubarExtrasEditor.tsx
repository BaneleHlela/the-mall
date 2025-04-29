import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from "./components/text/TextEditor.tsx";
import BackgroundEditor from "./components/background/BackgroundEditor.tsx";
import { RootState } from '../../app/store.ts';
import { updateSetting } from '../../features/layouts/layoutSettingsSlice.ts';

const RenderExtrasEditor = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.layoutSettings);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div>
      {/* Social Icons */}
      <div className="bg-green-500 text-lg">
        Social Icons
        <BackgroundEditor
          objectPath="menubar.extras.socialIcons.style.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <TextEditor
          objectPath="menubar.extras.socialIcons.style.text"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        Single Icon
        <BackgroundEditor
          objectPath="menubar.extras.socialIcons.style.single.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      </div>

      {/* Extra Icons */}
      <div className="bg-yellow-500 text-lg">
        Extra Icons
        <BackgroundEditor
          objectPath="menubar.extras.extraIcons.style.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <TextEditor
          objectPath="menubar.extras.extraIcons.style.text"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        Single Icon
        <BackgroundEditor
          objectPath="menubar.extras.extraIcons.style.single.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      </div>

      {/* Button */}
      <div className="bg-red-500 text-lg">
        Button
        <BackgroundEditor
          objectPath="menubar.extras.button.style.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <TextEditor
          objectPath="menubar.extras.button.style.text"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        Button Icon
        <BackgroundEditor
          objectPath="menubar.extras.button.icon.style.background"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <TextEditor
          objectPath="menubar.extras.button.icon.style.text"
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
        <label>Icon Name</label>
        <input
          type="text"
          value={settings?.menubar?.extras?.button?.icon.name}
          onChange={(e) => handleSettingChange('menubar.extras.button.icon.name', e.target.value)}
        />
      </div>
    </div>
  );
};

export default RenderExtrasEditor;
