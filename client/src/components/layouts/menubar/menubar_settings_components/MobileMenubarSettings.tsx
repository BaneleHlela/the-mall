import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import LinksStyleEditor from "./components/LinksStyleEditor";
import ExtrasStyleEditor from "./components/ExtrasStyleEditor";
import LogoStyleEditor from "./components/LogoStyleEditor";
import BackgroundEditor from "../../settings/background/BackgroundEditor.tsx";
import TextEditor from "../../settings/text/TextEditor.tsx";
import CartAndWishlistSettings from "../../settings/cartAndWishlistSettings.tsx";

interface MobileMenubarSettingsProps {
  objectPath: string; // Path within the settings object
  settings: Record<string, any>; // Complete settings object
  handleSettingChange: (field: string, value: any) => void;
}

const MobileMenubarEditor: React.FC<MobileMenubarSettingsProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const getSetting = (key: string) => {
    try {
      return objectPath
        .split(".")
        .reduce((current, prop) => current?.[prop], settings)?.[key];
    } catch {
      return undefined;
    }
  };

  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isPopMenuOpen, setIsPopMenuOpen] = useState(false);

  const toggleEditor = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Background Editor */}
      <CartAndWishlistSettings 
        objectPath="menubar.mobile"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
      <BackgroundEditor
        objectPath="menubar.mobile.background"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
      
      {/* Logo Style Dropdown */}
      <LogoStyleEditor 
        objectPath="menubar.mobile.logoStyle"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />

      {/* Hamburger Dropdown */}
      <div className="w-full">
        <button
          className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
          onClick={() => toggleEditor(setIsHamburgerOpen)}
        >
          Hamburger Menu Style
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isHamburgerOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isHamburgerOpen && (
          <div className="mt-2 space-y-4 p-2 bg-gray-100 border border-gray-300 rounded">
            <div>
              <label className="block mb-2">Hamburger Type</label>
              <select
                value={getSetting("menubar.mobile.hamburger.Type")}
                onChange={(e) =>
                  handleSettingChange("menubar.mobile.hamburger.Type", e.target.value)
                }
                className="w-full p-1 border rounded"
              >
                {["squash", "squeeze", "sling", "rotate"].map((type) => (
                  <option key={type} value={type}>
                    {type[0].toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <TextEditor
                objectPath="menubar.mobile.hamburger.hamburgerStyle.text"
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
              <BackgroundEditor
                objectPath="menubar.mobile.hamburger.hamburgerStyle.background"
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
            </div>
          </div>
        )}
      </div>

      {/* PopMenu Style Dropdown */}
      <div className="w-full">
        <button
          className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
          onClick={() => toggleEditor(setIsPopMenuOpen)}
        >
          Pop Menu Style
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${isPopMenuOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isPopMenuOpen && (
          <div className="mt-2 space-y-4 p-2 bg-gray-100 border border-gray-300 rounded">
            <div className="space-y-2">
              <label className="block mb-2">Cover Header</label>
              <input
                type="checkbox"
                checked={getSetting("menubar.mobile.popMenuStyle.coverHeader")}
                onChange={(e) =>
                  handleSettingChange("menubar.mobile.popMenuStyle.coverHeader", e.target.checked)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block mb-2">Burst Out</label>
              <input
                type="checkbox"
                checked={getSetting("menubar.mobile.popMenuStyle.burstOut")}
                onChange={(e) =>
                  handleSettingChange("menubar.mobile.popMenuStyle.burstOut", e.target.checked)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block mb-2">Transitions</label>
              <input
                type="text"
                value={getSetting("menubar.mobile.popMenuStyle.transitions.enter")}
                onChange={(e) =>
                  handleSettingChange("menubar.mobile.popMenuStyle.transitions.enter", e.target.value)
                }
                placeholder="Enter transition"
                className="w-full p-1 border rounded"
              />
              <input
                type="text"
                value={getSetting("menubar.mobile.popMenuStyle.transitions.exit")}
                onChange={(e) =>
                  handleSettingChange("menubar.mobile.popMenuStyle.transitions.exit", e.target.value)
                }
                placeholder="Exit transition"
                className="w-full p-1 border rounded"
              />
            </div>

            {/* Links and Extras Style Editor */}
            <LinksStyleEditor
              objectPath="menubar.mobile.popMenuStyle.links"
              settings={settings}
              handleSettingChange={handleSettingChange}
              availableLinks={["Home", "About", "Services", "Contact"]}
            />
            <ExtrasStyleEditor
              objectPath="menubar.mobile.popMenuStyle.extras"
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>
        )}
      </div>

      {/* Extras Style Editor (for menubar.mobile.extras) */}
      <ExtrasStyleEditor
        objectPath="menubar.mobile.extras"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default MobileMenubarEditor;
