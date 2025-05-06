import React from "react";

interface BorderEditorProps {
  settings: Record<string, any>;
  objectPath: string;
  handleSettingChange: (path: string, value: any) => void;
}

const validBorderStyles = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
];

const validBorderDirections = ["all", "x", "y", "t", "r", "b", "l"];

const BorderEditor: React.FC<BorderEditorProps> = ({
  settings,
  objectPath,
  handleSettingChange,
}) => {
  const getSetting = (key: string) => {
    try {
      const fullPath = [...objectPath.split("."), ...key.split(".")];
      return fullPath.reduce((current, prop) => current?.[prop], settings);
    } catch (error) {
      console.error("Error resolving object path:", error);
      return undefined;
    }
  };

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
    <div className="bg-gray-100 w-full p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold">Border Settings</h3>

      {/* Border Style */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Border Style</label>
        <select
          value={getSetting("border.borderStyle") || ""}
          onChange={handleChange("border.borderStyle")}
          className="p-2 border rounded bg-white text-sm"
        >
          {validBorderStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      {/* Border Width */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Border Width</label>
        <input
          type="text"
          value={getSetting("border.borderWidth") || ""}
          onChange={handleChange("border.borderWidth")}
          placeholder="e.g., 2px"
          className="p-2 border rounded text-sm"
        />
      </div>

      {/* Border Direction */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Border Direction</label>
        <select
          value={getSetting("border.borderDirection") || ""}
          onChange={handleChange("border.borderDirection")}
          className="p-2 border rounded bg-white text-sm"
        >
          {validBorderDirections.map((direction) => (
            <option key={direction} value={direction}>
              {direction}
            </option>
          ))}
        </select>
      </div>

      {/* Border Color */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Border Color</label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={getSetting("border.color") || "#000000"}
            onChange={handleChange("border.color")}
            className="w-10 h-10 border rounded"
          />
          <button
            type="button"
            onClick={() => handleSettingChange(`${objectPath}.border.color`, "transparent")}
            className="px-3 py-1 border border-gray-400 rounded text-sm hover:bg-gray-200"
          >
            Transparent
          </button>
        </div>
      </div>

      {/* Border Radius */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Border Radius</label>
        <input
          type="text"
          value={getSetting("border.borderRadius") || ""}
          onChange={handleChange("border.borderRadius")}
          placeholder="e.g., full or 10px"
          className="p-2 border rounded text-sm"
        />
      </div>
    </div>
  );
};

export default BorderEditor;
