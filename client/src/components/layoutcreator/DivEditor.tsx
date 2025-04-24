import { useState } from "react";
import DisplayEditor from "./components/display/DisplayEditor";
import BackgroundEditor from "./components/background/BackgroundEditor";
import TextEditor from "./TextEditor";

interface DivEditorProps {
  objectPath: string;
  settings: {
    display?: any;
    background?: any;
    divs?: any[];
    texts?: any[];
    buttons?: any[];
  };
  handleSettingChange: (field: string, value: any) => void;
  index: number;
}

const DivEditor = ({ objectPath, settings, handleSettingChange, index }: DivEditorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemOptions = ["text", "button", "div"];
  
  const handleAddItem = (type: string) => {
    const plural = type === "text" ? "texts" : type === "button" ? "buttons" : "divs";
    const items = settings[plural] || [];
    const newPath = `${objectPath}.${plural}`;
    const updatedItems = [...items, {}];
    handleSettingChange(newPath, updatedItems);
    setDropdownOpen(false);
  };

  return (
    <div className="border p-2 rounded bg-white mt-2">
      <p className="text-xs font-medium text-gray-500 mb-1">Div {index}</p>

      <DisplayEditor
        objectPath={`${objectPath}.display`}
        settings={settings?.display || {}}
        handleSettingChange={handleSettingChange}
      />

      <BackgroundEditor
        objectPath={`${objectPath}.background`}
        settings={settings?.background || {}}
        handleSettingChange={handleSettingChange}
      />

        {(settings?.texts || []).map((text, i) => (
        <TextEditor
            key={`text-${i}`}
            objectPath={`${objectPath}.texts.${i}`}
            settings={text}
            handleSettingChange={handleSettingChange}
        />
        ))}

        {/* {(settings?.buttons || []).map((btn, i) => (
        <ButtonEditor
            key={`button-${i}`}
            objectPath={`${objectPath}.buttons.${i}`}
            settings={btn}
            handleSettingChange={handleSettingChange}
        />
        ))} */}

        {/* {(settings?.images || []).map((img, i) => (
        <ImageEditor
            key={`image-${i}`}
            objectPath={`${objectPath}.images.${i}`}
            settings={img}
            handleSettingChange={handleSettingChange}
        />
        ))} */}

        {/* {(settings?.animations || []).map((anim, i) => (
        <AnimationEditor
            key={`anim-${i}`}
            objectPath={`${objectPath}.animations.${i}`}
            settings={anim}
            handleSettingChange={handleSettingChange}
        />
        ))} */}

        {(settings?.divs || []).map((div, i) => (
        <DivEditor
            key={`div-${i}`}
            objectPath={`${objectPath}.divs.${i}`}
            settings={div}
            handleSettingChange={handleSettingChange}
            index={i}
        />
        ))}


      {(settings.divs || []).map((childDiv, i) => (
        <DivEditor
          key={`div-${i}`}
          objectPath={`${objectPath}.divs.${i}`}
          settings={childDiv}
          handleSettingChange={handleSettingChange}
          index={i}
        />
      ))}

      {/* Add Item Dropdown */}
      <div className="relative mt-2">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
        >
          + Add Item
        </button>

        {dropdownOpen && (
          <div className="absolute mt-2 w-40 bg-white shadow-lg rounded border border-gray-200 z-10">
            {itemOptions.map((option) => (
              <button
                key={option}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleAddItem(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DivEditor;
