import React, { useState } from "react";
import BackgroundEditor from "../../components/background/BackgroundEditor";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import TextEditor from "../../TextEditor";
import LinksStyleEditor from "./components/LinksStyleEditor";
import ExtrasStyleEditor from "./components/ExtrasStyleEditor";
import LogoStyleEditor from "./components/LogoStyleEditor";

interface DesktopMenubarSettingsProps {
  objectPath: string; // Path within the settings object
  settings: Record<string, any>; // Complete settings object
  handleSettingChange: (field: string, value: any) => void;
}

const DesktopMenubarSettings: React.FC<DesktopMenubarSettingsProps> = ({
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

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleEditor = () => setIsOpen((prev) => !prev)  

  return (
    <div className="w-full">
      {/* Drag and drop for itemsLayoutStyle */}
      <BackgroundEditor
        objectPath="menubar.desktop.background"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
      {/* Dropdown for logostyle, with text and background */}
      <LogoStyleEditor
        objectPath="menubar.desktop.logoStyle"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />

      {/* Dropdown for linksStyle ...*/}
      <LinksStyleEditor
        objectPath="menubar.desktop.linksStyle"
        settings={settings}
        handleSettingChange={handleSettingChange}
        availableLinks={["Home", "About", "Services", "Contact"]}
      />
      
      {/* Dropdown for Extras ... */}
      <ExtrasStyleEditor
        objectPath="menubar.desktop.extras"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default DesktopMenubarSettings;
