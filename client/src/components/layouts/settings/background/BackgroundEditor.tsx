import React, { useState } from "react";
import ShadowEditor from "./ShadowEditor.tsx";
import GradientEditor from "./GradientEditor.tsx";
import ClipPathEditor from "./ClipPathEditor.tsx";
import PositionEditor from "./PositionEditor.tsx";
import BorderEditor from "./BorderEditor.tsx";
import PaddingEditor from "./PaddingEditor.tsx";
import MarginEditor from "./MarginEditor.tsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import BackgroundImageEditor from "./BackgroundImageEditor.tsx";

interface BackgroundEditorProps {
  objectPath: string;
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const BackgroundEditor: React.FC<BackgroundEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleEditor = () => setIsOpen((prev) => !prev);
  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getSetting = (key: string) => {
    try {
      return key.split(".").reduce((obj, prop) => obj?.[prop], settings);
    } catch (error) {
      console.error("Error resolving object path:", error);
      return undefined;
    }
  };



  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Background Editor Toggle */}
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleEditor}
      >
        Background Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-gray-100 w-full p-4 space-y-3">
          {/* Background Color */}
          <div className="flex items-center space-x-2">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              className="border rounded cursor-pointer"
              value={getSetting(`${objectPath}.color`) !== "" ? getSetting(`${objectPath}.color`) : "#ffffff"}
              onChange={(e) => handleSettingChange(`${objectPath}.color`, e.target.value)}
            />
            <button
              onClick={() => handleSettingChange(`${objectPath}.color`, "transparent")}
              className="px-2 py-1 text-xs border rounded bg-gray-200"
            >
              Transparent
            </button>
          </div>

          {/* Height & Width */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-sm">Height</label>
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm"
                value={getSetting("height")}
                onChange={(e) => handleSettingChange(`${objectPath}.height`, e.target.value)}
                placeholder="e.g., 100px or auto"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Width</label>
              <input
                type="text"
                className="border rounded px-2 py-1 text-sm"
                value={getSetting("width")}
                onChange={(e) => handleSettingChange(`${objectPath}.width`, e.target.value)}
                placeholder="e.g., 100% or auto"
              />
            </div>
          </div>

          {/* Expandable Sections */}
          {[
            { label: "Position", component: <PositionEditor settings={settings} objectPath={objectPath} /> },
            { label: "Border", component: <BorderEditor settings={settings} objectPath={objectPath} handleSettingChange={handleSettingChange} /> },
            { label: "Background Image", component: <BackgroundImageEditor settings={settings} objectPath={objectPath} /> },
            { label: "Padding", component: <PaddingEditor settings={settings} objectPath={objectPath}handleSettingChange={handleSettingChange} /> },
            { label: "Margin", component: <MarginEditor settings={settings} objectPath={objectPath} handleSettingChange={handleSettingChange} /> },
            { label: "Shadow", component: <ShadowEditor settings={settings} objectPath={objectPath} /> },
            { label: "Gradient", component: <GradientEditor settings={settings} objectPath={objectPath} /> },
            { label: "Clip Path", component: <ClipPathEditor settings={settings} objectPath={objectPath} /> },
          ].map(({ label, component }) => (
            <div key={label} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
                onClick={() => toggleSection(label)}
              >
                {label}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSections[label] ? "rotate-180" : ""}`} />
              </button>
              {openSections[label] && <div className="p-2 bg-white">{component}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundEditor;
