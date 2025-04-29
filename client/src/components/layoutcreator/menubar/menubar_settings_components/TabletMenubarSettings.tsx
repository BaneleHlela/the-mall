import React, { useState } from "react";
import BackgroundEditor from "../../components/background/BackgroundEditor";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import TextEditor from "../../components/text/TextEditor";
import LinksStyleEditor from "./components/LinksStyleEditor";
import ExtrasStyleEditor from "./components/ExtrasStyleEditor";

interface TabletMenubarSettingsProps {
  objectPath: string; // Path within the settings object
  settings: Record<string, any>; // Complete settings object
  handleSettingChange: (field: string, value: any) => void;
}

const TabletMenubarSettings: React.FC<TabletMenubarSettingsProps> = ({
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
  const toggleEditor = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      {/* Background Editor for Tablet Menubar */}
      <BackgroundEditor
        objectPath="menubar.tablet.background"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />

      {/* Logo Style Dropdown */}
      <LogoStyleEditor 
        objectPath="menubar.tablet.logoStyle"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />

      {/* Links Style Editor */}
      <LinksStyleEditor
        objectPath="menubar.tablet.linksStyle"
        settings={settings}
        handleSettingChange={handleSettingChange}
        availableLinks={["Home", "About", "Services", "Contact"]}
      />

      {/* Extras Style Editor */}
      <ExtrasStyleEditor
        objectPath="menubar.tablet.extras"
        settings={settings}
        handleSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default TabletMenubarSettings;
