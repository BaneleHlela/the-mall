import React, { useState } from "react";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BackgroundEditor from "../../../settings/background/BackgroundEditor.tsx";
import TextEditor from "../../../settings/text/TextEditor.tsx";


const availableSocialIcons = ["facebook", "x", "linkedin", "instagram", "medium"];

const DraggableIcon = ({ icon, index, moveIcon, handleDelete }: any) => {
  const [, ref] = useDrag({
    type: "icon",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "icon",
    hover: (item: any) => {
      if (item.index !== index) {
        moveIcon(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex justify-between items-center px-2 py-1 border rounded bg-white shadow-sm"
    >
      <span>{icon.name}</span>
      <input
        className="ml-2 flex-1 p-1 border rounded"
        placeholder="Redirect URL"
        value={icon.redirectTo || ""}
        onChange={(e) => handleDelete(index, { ...icon, redirectTo: e.target.value })}
      />
      <TrashIcon
        className="w-4 h-4 text-red-500 ml-2 cursor-pointer"
        onClick={() => handleDelete(index)}
      />
    </div>
  );
};

interface ExtrasStyleEditorProps {
  objectPath: string; // e.g. "menubar.desktop.extras"
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const ExtrasStyleEditor: React.FC<ExtrasStyleEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [socialOpen, setSocialOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const [buttonOpen, setButtonOpen] = useState(false);

  const toggleMain = () => setIsOpen((prev) => !prev);
  const fullPath = (field: string) => `${objectPath}.${field}`;
  const extrasType = settings?.menubar?.desktop?.extras?.type || "socialIcons";

  const icons = settings?.menubar?.desktop?.extras?.socialIcons?.icons || [];

  const updateIcons = (newIcons: any[]) => {
    handleSettingChange(fullPath("socialIcons.icons"), newIcons);
  };

  const moveIcon = (fromIndex: number, toIndex: number) => {
    const updated = [...icons];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    updateIcons(updated);
  };

  const handleIconChange = (index: number, newData: any) => {
    const updated = [...icons];
    updated[index] = newData;
    updateIcons(updated);
  };

  const addIcon = () => {
    if (icons.length >= 3) return;
    const nextAvailable = availableSocialIcons.find(
      (i) => !icons.find((ic: any) => ic.name === i)
    );
    if (nextAvailable) {
      updateIcons([...icons, { name: nextAvailable, redirectTo: "" }]);
    }
  };

  const deleteIcon = (index: number) => {
    const updated = [...icons];
    updated.splice(index, 1);
    updateIcons(updated);
  };

  return (
    <div className="w-full">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleMain}
      >
        Extras Style Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="mt-2 space-y-4 p-2 bg-gray-100 border border-gray-300 rounded">
          {/* Selection between Action Button or Social Icons */}
          <div className="space-y-2 p-2 border rounded bg-white">
            <p className="text-sm font-medium">Use:</p>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="extrasType"
                  value="socialIcons"
                  checked={extrasType === "socialIcons"}
                  onChange={() => handleSettingChange(fullPath("type"), "socialIcons")}
                />
                <span>Social Icons</span>
              </label>
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="extrasType"
                  value="button"
                  checked={extrasType === "button"}
                  onChange={() => handleSettingChange(fullPath("type"), "button")}
                />
                <span>Action Button</span>
              </label>
            </div>
          </div>

          {/* Social Icons Editor */}
          {extrasType === "socialIcons" && (
            <div className="border p-2 rounded">
              <button
                onClick={() => setSocialOpen((prev) => !prev)}
                className="w-full flex justify-between items-center bg-gray-200 px-2 py-1 rounded"
              >
                Social Icons
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${socialOpen ? "rotate-180" : ""}`}
                />
              </button>
              {socialOpen && (
                <div className="mt-2 space-y-2">
                  <DndProvider backend={HTML5Backend}>
                    {icons.map((icon: any, index: number) => (
                      <DraggableIcon
                        key={index}
                        icon={icon}
                        index={index}
                        moveIcon={moveIcon}
                        handleDelete={(i: number, newData?: any) =>
                          newData
                            ? handleIconChange(i, newData)
                            : deleteIcon(i)
                        }
                      />
                    ))}
                  </DndProvider>

                  {icons.length < 3 && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                      onClick={addIcon}
                    >
                      + Add Icon
                    </button>
                  )}

                  <BackgroundEditor
                    objectPath={fullPath("socialIcons.background")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                  <TextEditor
                    objectPath={fullPath("socialIcons.text")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                  <BackgroundEditor
                    objectPath={fullPath("socialIcons.perIcon.background")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Action Button Editor */}
          {extrasType === "button" && (
            <div className="border p-2 rounded">
              <button
                onClick={() => setButtonOpen((prev) => !prev)}
                className="w-full flex justify-between items-center bg-gray-200 px-2 py-1 rounded"
              >
                Action Button
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${buttonOpen ? "rotate-180" : ""}`}
                />
              </button>
              {buttonOpen && (
                <div className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <label>Show Icon</label>
                    <input
                      type="checkbox"
                      checked={settings?.menubar?.desktop?.extras?.button?.icon?.display || false}
                      onChange={(e) =>
                        handleSettingChange(`${objectPath}.button.icon.display`, e.target.checked)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Icon Name</label>
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      value={settings?.menubar?.desktop?.extras?.button?.icon?.name || ""}
                      onChange={(e) =>
                        handleSettingChange(`${objectPath}.button.icon.name`, e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Redirect URL</label>
                    <input
                      type="text"
                      className="w-full p-1 border rounded"
                      value={settings?.menubar?.desktop?.extras?.button?.redirectTo || ""}
                      onChange={(e) =>
                        handleSettingChange(`${objectPath}.button.redirectTo`, e.target.value)
                      }
                    />
                  </div>

                  <BackgroundEditor
                    objectPath={fullPath("button.style.background")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                  <TextEditor
                    objectPath={fullPath("button.style.text")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />

                  <BackgroundEditor
                    objectPath={fullPath("button.icon.style.background")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                  <TextEditor
                    objectPath={fullPath("button.icon.style.text")}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                  />
                </div>
              )}
            </div>
          )}

          {/* Extra Icons Editor */}
          <div className="border p-2 rounded">
            <button
              onClick={() => setExtraOpen((prev) => !prev)}
              className="w-full flex justify-between items-center bg-gray-200 px-2 py-1 rounded"
            >
              Extra Icons
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${extraOpen ? "rotate-180" : ""}`}
              />
            </button>
            {extraOpen && (
              <div className="mt-2 space-y-2">
                <BackgroundEditor
                  objectPath={fullPath("extraIcons.background")}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
                <TextEditor
                  objectPath={fullPath("extraIcons.text")}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
                <BackgroundEditor
                  objectPath={fullPath("extraIcons.perIcon.background")}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtrasStyleEditor;
