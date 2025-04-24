import React from "react";
import { useDispatch } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";

interface ShadowEditorProps {
  objectPath: string;
  settings: Record<string, any>;
}

const getShadowSetting = (settings: Record<string, any>, objectPath: string) => {
  try {
    const resolvedShadow = objectPath.split(".").reduce((current, prop) => {
      if (!current || current[prop] === undefined) {
        console.error(`Path not found at: ${prop}`);
        return undefined;
      }
      return current[prop];
    }, settings);

    return resolvedShadow || { addShadow: false, style: "0px 1px 2px 0px #00000080" };
  } catch (error) {
    console.error("Error resolving object path:", error);
    return { addShadow: false, style: "0px 1px 2px 0px #00000080" };
  }
};

const ShadowEditor: React.FC<ShadowEditorProps> = ({ objectPath, settings }) => {
  const dispatch = useDispatch();

  const shadowSettings = getShadowSetting(settings, `${objectPath}.shadow`);
  const { addShadow, style } = shadowSettings;

  const toggleAddShadow = () => {
    dispatch(updateSetting({ field: `${objectPath}.shadow.addShadow`, value: !addShadow }));
  };

  const handleShadowChange = (value: string) => {
    dispatch(updateSetting({ field: `${objectPath}.shadow.style`, value }));
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col space-y-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">Shadow Settings</h3>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={addShadow} onChange={toggleAddShadow} className="w-5 h-5 accent-blue-500" />
        <span className="text-gray-700 font-medium">Enable Shadow</span>
      </label>

      {addShadow && (
        <div>
          <label className="block font-medium text-gray-700">Shadow Style</label>
          <input
            type="text"
            value={style}
            onChange={(e) => handleShadowChange(e.target.value)}
            placeholder="e.g., 0px 4px 6px rgba(0, 0, 0, 0.1)"
            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default ShadowEditor;
