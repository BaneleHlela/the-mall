import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BackgroundEditor from "../components/background/BackgroundEditor.tsx";
import TextEditor from "../components/text/TextEditor.tsx";
import TransitionDropdown from "./TransitionDropdown.tsx";
import { RootState } from "../../../app/store.ts";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice.ts";

const MobileMenuEditor = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.layoutSettings);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
      <div>
        {/* Layout Style */}
        <div className="bg-blue-500 text-lg p-4">
          Layout Style
          <select
              value={settings.menubar?.linksStyle?.mobile?.menu?.layoutStyle?.join(",")}
              onChange={(e) =>
                  handleSettingChange(
                      "menubar.linksStyle.mobile.menu.layoutStyle",
                      e.target.value.split(",")
                  )
              }
              className="border rounded p-2 mt-2"
          >
            <option value="logo,links,extras">Logo, Links, Extras</option>
            <option value="links,logo">Links, Logo</option>
            <option value="extras,links,logo">Extras, Links, Logo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Header</label>
          <select
              value={menubar?.linksStyle?.mobile?.menu?.coverHeader}
              onChange={(e) =>
                  handleSettingChange('menubar.linksStyle.mobile.menu.coverHeader', e.target.value === "enabled")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Burst Out?</label>
          <select
              value={menubar?.linksStyle?.mobile?.menu?.burstOut}
              onChange={(e) =>
                  handleSettingChange('menubar.linksStyle.mobile.menu.burstOut', e.target.value === "enabled")
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        {/* Transitions */}
        <div className="bg-yellow-500 text-lg p-4">
          Transitions
          <TransitionDropdown
              objectPath="menubar.linksStyle.mobile.menu.transitions"
              selected={settings.menubar?.linksStyle?.mobile?.menu?.transitions}
              handleSettingChange={handleSettingChange}
          />
        </div>

        {/* Hamburger Menu */}
        <div className="bg-red-500 text-lg p-4">
          Hamburger Menu
          <label>Type</label>
          <select
              value={settings.menubar?.linksStyle?.mobile?.hamburger?.Type}
              onChange={(e) =>
                  handleSettingChange("menubar.linksStyle.mobile.hamburger.Type", e.target.value)
              }
              className="border rounded p-2 mt-2"
          >
            <option value="squash">Squash</option>
            <option value="squeeze">Squeeze</option>
            <option value="sling">Sling</option>
            <option value="rotate">Rotate</option>
          </select>

          <TextEditor
              objectPath="menubar.linksStyle.mobile.hamburger.hamburgerStyle.text"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
          <BackgroundEditor
              objectPath="menubar.linksStyle.mobile.hamburger.hamburgerStyle.background"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
        </div>

        {/* Background and Text Styling */}
        <div className="bg-green-500 text-lg p-4">
          Background
          <BackgroundEditor
              objectPath="menubar.linksStyle.mobile.menu.background"
              settings={settings}
              handleSettingChange={handleSettingChange}
          />
          {/* Text Styling */}
          <div className="mt-4">
            <label className="block font-semibold">Text Styling</label>
            <TextEditor
                objectPath="menubar.linksStyle.mobile.menu.links.text"
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
          </div>
        </div>
      </div>
  );
};

export default MobileMenuEditor;
