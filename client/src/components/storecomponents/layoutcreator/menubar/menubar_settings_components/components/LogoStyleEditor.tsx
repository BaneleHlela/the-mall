import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import BackgroundEditor from "../../../components/background/BackgroundEditor";
import TextEditor from "../../../TextEditor";
import { Upload } from "@mui/icons-material";
import UploadLogo from "../../../../../UploadLogo";

interface LogoStyleEditorProps {
  objectPath: string; // e.g. "menubar.desktop.logoStyle"
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const LogoStyleEditor: React.FC<LogoStyleEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleOpen}
      >
        Logo Style Settings
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      

      {isOpen && (
        <div className="mt-2 space-y-4 p-2 bg-gray-100 border border-gray-300 rounded">
          <BackgroundEditor
            objectPath={`${objectPath}.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
          <TextEditor
            objectPath={`${objectPath}.text`}
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
        </div>
      )}
    </div>
  );
};

export default LogoStyleEditor;
