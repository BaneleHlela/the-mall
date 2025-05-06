import React from "react";

interface TextAnimationEditorProps {
  objectPath: string;
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const TextAnimationEditor: React.FC<TextAnimationEditorProps> = ({
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

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-md font-semibold">Animation Settings</h3>

      {/* Animation Type */}
      <div className="flex items-center gap-2">
        <label className="w-32">Animation</label>
        <select
          value={getSetting("animation")}
          onChange={handleChange("animation")}
          className="border rounded-md px-2 py-1"
        >
          <option value="none">None</option>
          <option value="fade-in">Fade In</option>
          <option value="slide-in-left">Slide In Left</option>
          <option value="slide-in-right">Slide In Right</option>
          <option value="slide-in-top">Slide In Top</option>
          <option value="slide-in-bottom">Slide In Bottom</option>
          <option value="fade-in-left">Fade In Left</option>
          <option value="fade-in-right">Fade In Right</option>
          <option value="fade-in-top">Fade In Top</option>
          <option value="fade-in-bottom">Fade In Bottom</option>
          <option value="zoom-in">Zoom In</option>
          <option value="zoom-out">Zoom Out</option>
          <option value="bounce">Bounce</option>
          <option value="rainbow">Colorful</option>
          <option value="typing">Typewriter</option>
        </select>
      </div>

      {/* Animation Duration
      <div className="flex items-center gap-2">
        <label className="w-32">Duration (ms)</label>
        <input
          type="number"
          value={getSetting("animationDuration")}
          onChange={handleChange("animationDuration")}
          className="border rounded-md px-2 py-1 w-full"
          placeholder="e.g., 500"
        />
      </div> */}

      {/* Animation Delay */}
      {/* <div className="flex items-center gap-2">
        <label className="w-32">Delay (ms)</label>
        <input
          type="number"
          value={getSetting("animationDelay")}
          onChange={handleChange("animationDelay")}
          className="border rounded-md px-2 py-1 w-full"
          placeholder="e.g., 0"
        />
      </div> */}

      {/* Animation Iterations */}
      {/* <div className="flex items-center gap-2">
        <label className="w-32">Iterations</label>
        <input
          type="text"
          value={getSetting("animationIterationCount")}
          onChange={handleChange("animationIterationCount")}
          className="border rounded-md px-2 py-1 w-full"
          placeholder="e.g., 1 / infinite"
        />
      </div> */}
    </div>
  );
};

export default TextAnimationEditor;
