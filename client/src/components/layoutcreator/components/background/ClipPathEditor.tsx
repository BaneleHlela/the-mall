import React from "react";
import { useDispatch } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import { getSetting } from "../../../../utils/helperFunctions";

interface ClipPathEditorProps {
  objectPath: string;
  settings: Record<string, any>;
}

const ClipPathEditor: React.FC<ClipPathEditorProps> = ({ objectPath, settings }) => {
  const dispatch = useDispatch();

  const clipPathSettings = getSetting(settings, `${objectPath}.clipPath`, { enabled: false, style: "" });
  const { enabled, style } = clipPathSettings;

  const toggleEnabled = () => {
    dispatch(updateSetting({ field: `${objectPath}.clipPath.enabled`, value: !enabled }));
  };

  const handleClipPathChange = (value: string) => {
    dispatch(updateSetting({ field: `${objectPath}.clipPath.style`, value }));
  };


  return (
    <div className="bg-gray-100 p-4 flex flex-col space-y-4 border border-gray-300 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">Clip Path Editor</h3>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={enabled} onChange={toggleEnabled} className="w-5 h-5 accent-blue-500" />
        <span className="text-gray-700 font-medium">Enable Clip Path</span>
      </label>

      {enabled && (
        <div>
          <label className="block font-medium text-gray-700">Clip Path Value</label>
          <input
            type="text"
            value={style}
            onChange={(e) => handleClipPathChange(e.target.value)}
            placeholder="e.g., polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            className="p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default ClipPathEditor;
