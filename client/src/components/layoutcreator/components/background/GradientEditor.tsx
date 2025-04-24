import React from "react";
import { useDispatch } from "react-redux";
import { getSetting } from "../../../../utils/helperFunctions";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";

interface GradientEditorProps {
  objectPath: string;
  settings: Record<string, any>;
}

const GradientEditor: React.FC<GradientEditorProps> = ({ objectPath, settings }) => {
  const dispatch = useDispatch();

  const gradientSettings = getSetting(settings, `${objectPath}.gradient`, { enabled: false, style: "" });
  const { enabled, style } = gradientSettings;

  const toggleEnabled = () => {
    dispatch(updateSetting({ field: `${objectPath}.gradient.enabled`, value: !enabled }));
  };

  const handleGradientChange = (value: string) => {
    dispatch(updateSetting({ field: `${objectPath}.gradient.style`, value }));
  };

  return (
    <div className="bg-gray-100 p-4 flex flex-col space-y-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">Gradient Settings</h3>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={toggleEnabled} className="w-5 h-5 accent-blue-500" />
        <span className="text-gray-700 font-medium">Enable Gradient</span>
      </label>

      {enabled && (
        <div>
          <label className="block font-medium text-gray-700">Gradient Style</label>
          <input
            type="text"
            value={style}
            onChange={(e) => handleGradientChange(e.target.value)}
            placeholder="e.g., linear-gradient(to right, #ff0000 0%, #0000ff 100%)"
            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default GradientEditor;
