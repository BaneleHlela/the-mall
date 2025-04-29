import { useState } from "react";
import TextEditor from "./text/TextEditor";
import BackgroundEditor from "./background/BackgroundEditor";

interface ButtonEditorProps {
  objectPath: string;
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const ButtonEditor: React.FC<ButtonEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded p-2">
      <button
        className="w-full text-left font-semibold py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Button Editor " : "Show Button Editor "}
      </button>
      {isOpen && (
        <div className="mt-2 space-y-4">
          <TextEditor 
            settings={settings}
            objectPath={`${objectPath}.text`}
            handleSettingChange={handleSettingChange}
          />
          <BackgroundEditor 
            settings={settings}
            objectPath={`${objectPath}.background`}
            handleSettingChange={handleSettingChange}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonEditor;
