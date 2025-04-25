import React, { useState } from "react";
import GoogleFontsSelector from "./components/GoogleFontsSelector.tsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface TextEditorProps {
  objectPath: string; // Path within the settings object
  settings: Record<string, any>; // Complete settings object
  handleSettingChange: (field: string, value: any) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSetting = (key: string) => {
    try {
      return objectPath
        .split(".")
        .reduce((current, prop) => current?.[prop], settings)?.[key];
    } catch {
      return undefined;
    }
  };

  const handleFontSelect = (font: string) => {
    handleSettingChange(`${objectPath}.fontFamily`, font);
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
      / /g,
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
    <div className="w-full">
      {/* Dropdown Toggle */}
      <button
        className="w-full flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Text Settings</span>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-b-md shadow-md space-y-4">
          {/* Color */}
          <div className="flex items-center gap-2">
            <label className="w-32">Color</label>
            <input
              type="color"
              value={getSetting("color") || "#000000"}
              onChange={handleChange("color")}
              className="w-10 h-10 rounded-md border"
            />
          </div>
          {/*Input*/}
          <div className="flex flex-col gap-2">
            <label className="text-sm">Input Text</label>
            <input
              type="text"
              value={getSetting("input")}
              onChange={handleChange("input")}
              className="border rounded-md px-2 py-1 w-full"
              placeholder="Enter text here"
            />
          </div>
          {/* Background Color */}
          <div className="flex items-center space-x-2">
            <label className="text-sm">Color:</label>
            <input
              type="color"
              className="border rounded cursor-pointer"
              value={getSetting(`${objectPath}.backgroundColor`) !== "" ? getSetting(`${objectPath}.backgroundColor`) : "#ffffff"}
              onChange={(e) => handleSettingChange(`${objectPath}.backgroundColor`, e.target.value)}
            />
            <button
              onClick={() => handleSettingChange(`${objectPath}.backgroundColor`, "transparent")}
              className="px-2 py-1 text-xs border rounded bg-gray-200"
            >
              Transparent
            </button>
          </div>

          {/* Weight */}
          <div className="flex items-center gap-2">
            <label className="w-32">Weight</label>
            <select
              value={getSetting("weight") || "normal"}
              onChange={handleChange("weight")}
              className="border rounded-md px-2 py-1"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="bolder">Bolder</option>
              <option value="lighter">Lighter</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-2">
            <label className="w-32">Font Size</label>
            <input
              type="text"
              value={getSetting("fontSize")}
              onChange={handleChange("fontSize")}
              className="border rounded-md px-2 py-1 w-full"
              placeholder="e.g., 16px"
            />
          </div>

          {/* Font Family */}
          <GoogleFontsSelector onFontSelect={handleFontSelect} />

          {/* Font Style */}
          <div className="flex items-center gap-2">
            <label className="w-32">Font Style</label>
            <select
              value={getSetting("fontStyle") || "normal"}
              onChange={handleChange("fontStyle")}
              className="border rounded-md px-2 py-1"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="oblique">Oblique</option>
            </select>
          </div>

          {/* Line Height */}
          <div className="flex items-center gap-2">
            <label className="w-32">Line Height</label>
            <input
              type="text"
              value={getSetting("lineHeight") || "1.5"}
              onChange={handleChange("lineHeight")}
              className="border rounded-md px-2 py-1 w-full"
              placeholder="e.g., 1.5"
            />
          </div>

          {/* Letter Spacing */}
          <div className="flex items-center gap-2">
            <label className="w-32">Letter Spacing</label>
            <input
              type="text"
              value={getSetting("letterSpacing") || "normal"}
              onChange={handleChange("letterSpacing")}
              className="border rounded-md px-2 py-1 w-full"
              placeholder="e.g., normal"
            />
          </div>

          {/* Text Decoration */}
          <div className="flex items-center gap-2">
            <label className="w-32">Text Decoration</label>
            <select
              value={getSetting("textDecoration") || "none"}
              onChange={handleChange("textDecoration")}
              className="border rounded-md px-2 py-1"
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="line-through">Line Through</option>
              <option value="overline">Overline</option>
            </select>
          </div>

          {/* Text Align */}
          <div className="flex items-center gap-2">
            <label className="w-32">Text Align</label>
            <select
              value={getSetting("textAlign") || "left"}
              onChange={handleChange("textAlign")}
              className="border rounded-md px-2 py-1"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>

          {/* Text Transform */}
          <div className="flex items-center gap-2">
            <label className="w-32">Text Transform</label>
            <select
              value={getSetting("textTransform") || "none"}
              onChange={handleChange("textTransform")}
              className="border rounded-md px-2 py-1"
            >
              <option value="none">None</option>
              <option value="capitalize">Capitalize</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
            </select>
          </div>

          {/* Text Shadow */}
          <div className="flex items-center gap-2">
            <label className="w-32">Text Shadow</label>
            <input
              type="text"
              value={getSetting("textShadow") || "none"}
              onChange={handleChange("textShadow")}
              className="border rounded-md px-2 py-1 w-full"
              placeholder="e.g., 2px 2px 5px rgba(0,0,0,0.3)"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
