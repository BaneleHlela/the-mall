import { useState } from "react";
import BackgroundEditor from "./background/BackgroundEditor.tsx";
import {useSelector} from "react-redux";
import DisplayEditor from "./display/DisplayEditor.tsx";
import TextEditor from "./text/TextEditor.tsx";
import ButtonEditor from "./ButtonEditor.tsx";
import ImageUploader from "./ImageUploader.tsx";


interface DivEditorProps {
  objectPath: string;
  settings: {
    display?: any;
    background?: any;
    divs?: any[];
    texts?: any[];
    buttons?: any[];
    images?: any[]; // To hold images
  };
  handleSettingChange: (field: string, value: any) => void;
  index: number;
}

const DivEditor = ({ objectPath, settings, handleSettingChange, index }: DivEditorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImageUploaderVisible, setImageUploaderVisible] = useState(false); // State to control ImageUploader visibility
  const itemOptions = ["text", "button", "div", "image"]; // Added "image" option
  const layoutId = useSelector((state: any) => state.layoutSettings._id);
  const handleAddItem = (type: string) => {
    const plural = type === "text" ? "texts" : type === "button" ? "buttons" : type === "image" ? "images" : "divs";
    const items = settings[plural] || [];
    const newPath = `${objectPath}.${plural}`;
    const updatedItems = [...items, {}];
    handleSettingChange(newPath, updatedItems);
    setDropdownOpen(false);
    
    // If an image is being added, show the ImageUploader
    if (type === "image") {
      setImageUploaderVisible(true);
    }
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

      {/* Render TextEditors */}
      {(settings?.texts || []).map((text, i) => (
        <TextEditor
          key={`text-${i}`}
          objectPath={`${objectPath}.texts.${i}`}
          settings={text}
          handleSettingChange={handleSettingChange}
        />
      ))}

      {/* Render ButtonEditors */}
      {(settings?.buttons || []).map((btn, i) => (
        <ButtonEditor
          key={`button-${i}`}
          objectPath={`${objectPath}.buttons.${i}`}
          settings={btn}
          handleSettingChange={handleSettingChange}
        />
      ))}

      {/* Render ImageUploaders */}
      {/* {(settings?.images || []).map((img, i) => (
        <ImageUploader
          key={`image-${i}`}
          objectPath={`${objectPath}.images.${i}`}
          settings={img}
          handleSettingChange={handleSettingChange}
        />
      ))} */}

      {/* Conditionally Render ImageUploader when visible */}
      {isImageUploaderVisible && (
        <ImageUploader
          objectPath={`${objectPath}.images.${settings?.images?.length || 0}`}
          handleSettingChange={handleSettingChange}
        />
      )}

      {/* Render DivEditor recursively */}
      {(settings?.divs || []).map((div, i) => (
        <DivEditor
          key={`div-${i}`}
          objectPath={`${objectPath}.divs.${i}`}
          settings={div}
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
