import React from "react";
import { useDispatch } from "react-redux";
import { getSetting } from "../../../../utils/helperFunctions";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";

interface BackgroundImageEditorProps {
  objectPath: string;
  settings: Record<string, any>;
}

const BackgroundImageEditor: React.FC<BackgroundImageEditorProps> = ({ objectPath, settings }) => {
  const dispatch = useDispatch();

  const defaultBackground = {
    url: "",
    size: "cover",
    position: "center",
    repeat: "no-repeat",
    attachment: "scroll",
  };

  const backgroundSettings = getSetting(settings, `${objectPath}.backgroundImage`, defaultBackground);
  const { url, size, position, repeat, attachment } = backgroundSettings;

  const handleChange = (field: string, value: string) => {
    dispatch(updateSetting({ field: `${objectPath}.backgroundImage.${field}`, value }));
  };

  return (
    <div className="bg-gray-100 w-full p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold">Background Image Settings</h3>

      {/* Image URL */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={settings?.backgroundImage?.url}
          onChange={(e) => handleChange("url", e.target.value)}
          placeholder="Enter image URL"
          className="p-2 border rounded text-sm"
        />
      </div>

      {/* Background Size */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Size</label>
        <select
          value={settings?.backgroundImage?.size}
          onChange={(e) => handleChange("size", e.target.value)}
          className="p-2 border rounded bg-white text-sm"
        >
          <option value="auto">Auto</option>
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
      </div>

      {/* Background Position */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Position</label>
        <select
          value={settings?.backgroundImage?.position}
          onChange={(e) => handleChange("position", e.target.value)}
          className="p-2 border rounded bg-white text-sm"
        >
          <option value="center">Center</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* Background Repeat */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Repeat</label>
        <select
          value={settings?.backgroundImage?.repeat}
          onChange={(e) => handleChange("repeat", e.target.value)}
          className="p-2 border rounded bg-white text-sm"
        >
          <option value="no-repeat">No Repeat</option>
          <option value="repeat">Repeat</option>
          <option value="repeat-x">Repeat Horizontally</option>
          <option value="repeat-y">Repeat Vertically</option>
        </select>
      </div>

      {/* Background Attachment */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Attachment</label>
        <select
          value={settings?.backgroundImage?.attachment}
          onChange={(e) => handleChange("attachment", e.target.value)}
          className="p-2 border rounded bg-white text-sm"
        >
          <option value="scroll">Scroll</option>
          <option value="fixed">Fixed</option>
          <option value="local">Local</option>
        </select>
      </div>
    </div>
  );
};

export default BackgroundImageEditor;
