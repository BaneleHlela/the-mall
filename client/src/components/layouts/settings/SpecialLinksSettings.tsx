import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store.ts';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice.ts';
import { getBackgroundStyles } from '../../../utils/stylingFunctions.ts';
import {useState} from "react";
import BackgroundEditor from "./background/BackgroundEditor.tsx";
import TextEditor from "./text/TextEditor.tsx";

const SpecialLinksSettings = ({ linkItems }) => {
  const dispatch = useDispatch();
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);
  const { background } = menubar.linksStyle.wide || {};
  const [specialLinks, setSpecialLinks] = useState({}); // Initialize as an empty object

  const [linkIndex, setLinkIndex] = useState(''); // Input for specifying the link index

  const handleSettingChange = (field, value) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleAddSpecialLink = () => {
    if (!linkIndex || specialLinks[linkIndex]) {
      alert('Invalid or duplicate link index!');
      return;
    }

    const backgroundStyles = getBackgroundStyles(menubar?.linksStyle.wide.links?.all?.background) || {};
    const color = backgroundStyles.backgroundColor;

    // Create the newLink object
    const newLink = {
      index: linkIndex,
      background: {},
      text: {},
    };

    // Update local state
    const updatedSpecialLinks = { ...specialLinks, [linkIndex]: newLink };
    setSpecialLinks(updatedSpecialLinks); // Ensure immediate update in the component

    // Update Redux state
    handleSettingChange('menubar.linksStyle.wide.links.special', updatedSpecialLinks);
    setLinkIndex(''); // Clear input field
  };

  const handleRemoveSpecialLink = (index) => {
    const { [index]: _, ...remainingSpecialLinks } = specialLinks;
    setSpecialLinks(remainingSpecialLinks); // Update local state

    // Update Redux state
    handleSettingChange('menubar.linksStyle.wide.links.special', remainingSpecialLinks);
  };

  return (
    <div>
      <label htmlFor="linkIndex">Enter Link Index:</label>
      <input
        id="linkIndex"
        type="text"
        value={linkIndex}
        onChange={(e) => setLinkIndex(e.target.value)}
        placeholder="Enter link index"
        className="border p-2 mb-2"
      />
      <button
        onClick={handleAddSpecialLink}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Special Styling
      </button>

      <label>Special Links Editor</label>
      {Object.keys(specialLinks).map((index) => (
        <div key={index} className="p-4 border mb-4">
          <p>Editing link index: {index}</p>
          <BackgroundEditor
            objectPath={`menubar.linksStyle.wide.links.special.${index}.background`}
            settings={menubar}
            handleSettingChange={handleSettingChange}
          />
          <TextEditor
            objectPath={`menubar.linksStyle.wide.links.special.${index}.text`}
            settings={menubar}
            handleSettingChange={handleSettingChange}
          />
          <button
            className="bg-pink-100 w-[20vh] h-[5vh]"
            onClick={() => handleRemoveSpecialLink(index)}
          >
            Remove Special Styling
          </button>
        </div>
      ))}
    </div>
  );
};

export default SpecialLinksSettings;
