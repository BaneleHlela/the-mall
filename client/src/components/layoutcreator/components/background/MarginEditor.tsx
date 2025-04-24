import React from "react";

interface MarginEditorProps {
  settings: Record<string, any>;
  objectPath: string;
  handleSettingChange: (path: string, value: any) => void;
}

const directions = ["top", "right", "bottom", "left"];

const MarginEditor: React.FC<MarginEditorProps> = ({
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
    <div className="bg-gray-100 p-4 flex flex-col space-y-4 border border-gray-300 rounded-md">
      <h3 className="text-lg font-semibold">Margin Settings</h3>

      <div className="grid grid-cols-2 gap-4">
        {directions.map((direction) => (
          <div key={`margin-${direction}`}>
            <label className="block font-medium capitalize">{`Margin ${direction}`}</label>
            <input
              type="text"
              value={getSetting(`margin.${direction}`) || ""}
              onChange={handleChange(`margin.${direction}`)}
              placeholder="e.g., 10px"
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarginEditor;
