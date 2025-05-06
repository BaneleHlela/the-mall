import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { createLayout, editLayout } from '../../../features/layouts/layoutSlice';

const SaveLayoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const layoutSettings = useSelector((state: RootState) => state.layoutSettings);
  const activeLayout = useSelector((state: RootState) => state.layout.activeLayout);
  const [showOptions, setShowOptions] = useState(false);

  const handleSaveClick = () => {
    if (activeLayout && activeLayout._id) {
      setShowOptions(true);
    } else {
      dispatch(createLayout(layoutSettings));
      console.log("New layout created.");
    }
  };

  const handleOption = (action: 'overwrite' | 'new') => {
    if (action === 'overwrite' && activeLayout?._id) {
      dispatch(editLayout({ layoutId: activeLayout._id, layoutConfig: layoutSettings }));
      console.log(`Layout ${activeLayout._id} overwritten.`, layoutSettings);
      
    } else {
      const { _id, __v, ...cleanedLayoutSettings } = layoutSettings;
      dispatch(createLayout(cleanedLayoutSettings));
      console.log("New layout created.");
    }
    setShowOptions(false);
  };

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
      {showOptions ? (
        <div className="bg-white p-4 rounded shadow-md border border-gray-300">
          <p className="mb-2 text-sm font-medium">Save layout as:</p>
          <button
            onClick={() => handleOption('overwrite')}
            className="block w-full px-4 py-1 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Overwrite Existing
          </button>
          <button
            onClick={() => handleOption('new')}
            className="block w-full px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create New Layout
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700"
          onClick={handleSaveClick}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default SaveLayoutButton;
