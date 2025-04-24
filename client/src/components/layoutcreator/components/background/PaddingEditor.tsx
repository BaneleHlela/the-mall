import React from "react";

interface PaddingEditorProps {
  settings: Record<string, any>;
  objectPath: string;
  handleSettingChange: (path: string, value: any) => void;
}

const directions = ["top", "right", "bottom", "left"];

const PaddingEditor: React.FC<PaddingEditorProps> = ({
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
    <div className="bg-gray-100 w-full p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold">Padding Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        {directions.map((direction) => (
          <div key={`padding-${direction}`} className="flex flex-col space-y-1">
            <label className="text-sm font-medium">
              {`Padding ${direction.charAt(0).toUpperCase() + direction.slice(1)}`}
            </label>
            <input
              type="text"
              value={getSetting(`padding.${direction}`) || ""}
              onChange={handleChange(`padding.${direction}`)}
              placeholder="e.g., 10px"
              className="p-2 border rounded text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaddingEditor;
