import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import BackgroundEditor from "../../../components/background/BackgroundEditor";
import TextEditor from "../../../components/text/TextEditor";


interface LinksStyleEditorProps {
  objectPath: string; // e.g. "menubar.desktop.linksStyle"
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
  availableLinks: string[]; // e.g. ["Home", "About", "Services"]
}

const hoverOptions = ["default", "underline", "highlight", "bold", "scale"];

const LinksStyleEditor: React.FC<LinksStyleEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
  availableLinks,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [specialOpen, setSpecialOpen] = useState(false);
  const [selectedSpecialLink, setSelectedSpecialLink] = useState("");

  const fullPath = (field: string) => `${objectPath}.${field}`;

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const toggleSpecialOpen = () => setSpecialOpen((prev) => !prev);

  const specialLinks = settings?.menubar?.desktop?.linksStyle?.links?.special || {};

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleOpen}
      >
        Links Style Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-4 p-2 bg-gray-100 border border-gray-300 rounded">
          <BackgroundEditor
            objectPath={`${objectPath}.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
          />

          {/* All Links Styling */}
          <div className="border p-2 rounded">
            <p className="font-semibold mb-1">All Links</p>
            <label className="block mb-2 text-sm">Hover Effect</label>
            <select
              value={settings?.menubar?.desktop?.linksStyle?.links?.all?.hover || "default"}
              onChange={(e) =>
                handleSettingChange(`${objectPath}.links.all.hover`, e.target.value)
              }
              className="w-full rounded border-gray-300 p-1"
            >
              {hoverOptions.map((option) => (
                <option key={option} value={option}>
                  {option[0].toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>

            <div className="mt-2">
              <BackgroundEditor
                objectPath={`${objectPath}.links.all.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
            </div>
            {/* <div className="mt-2">
              <TextEditor
                objectPath={`${objectPath}.links.all.textStyle`}
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
            </div> */}
          </div>

          {/* Special Link Styling */}
          <div className="border p-2 rounded">
            <button
              onClick={toggleSpecialOpen}
              className="w-full flex justify-between items-center bg-gray-200 px-2 py-1 rounded"
            >
              Special Link Styles
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${specialOpen ? "rotate-180" : ""}`}
              />
            </button>

            {specialOpen && (
              <div className="mt-3 space-y-3">
                <select
                  value={selectedSpecialLink}
                  onChange={(e) => setSelectedSpecialLink(e.target.value)}
                  className="w-full rounded border-gray-300 p-1"
                >
                  <option value="">-- Select Link to Style --</option>
                  {availableLinks.map((link) => (
                    <option key={link} value={link}>
                      {link}
                    </option>
                  ))}
                </select>

                {selectedSpecialLink && (
                  <div className="space-y-2 p-2 border rounded bg-white">
                    <TextEditor
                      objectPath={`${objectPath}.links.special.${selectedSpecialLink}.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                    <BackgroundEditor
                      objectPath={`${objectPath}.links.special.${selectedSpecialLink}.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinksStyleEditor;
