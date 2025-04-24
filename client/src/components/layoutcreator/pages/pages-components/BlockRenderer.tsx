import React from 'react';
import { useDispatch } from 'react-redux';
import DisplayEditor from '../../components/display/DisplayEditor';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const itemOptions = ['div', 'text', 'button'];

const BlockRenderer = ({ block, path }) => {
  const dispatch = useDispatch();

  const handleAddChild = (type: string) => {
    const newChild = {
      type,
      id: Date.now(),
      ...(type === 'div'
        ? { display: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, children: [] }
        : { settings: {} })
    };

    const updatedChildren = [...(block.children || []), newChild];

    dispatch(updateSetting({
      field: `${path}.children`,
      value: updatedChildren
    }));
  };

  const renderContent = () => {
    switch (block.type) {
      case 'div':
        return (
          <div className="border-l-4 pl-2 border-blue-300 my-2 bg-gray-50 p-2 rounded">
            <DisplayEditor
              settings={block.display}
              onChange={(newDisplay) =>
                dispatch(updateSetting({ field: `${path}.display`, value: newDisplay }))
              }
            />

            {(block.children || []).map((child, idx) => (
              <BlockRenderer key={child.id || idx} block={child} path={`${path}.children.${idx}`} />
            ))}

            <div className="mt-2">
              <label className="text-sm">Add to this block:</label>
              <div className="flex gap-2 mt-1">
                {itemOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleAddChild(type)}
                    className="text-blue-500 text-xs hover:underline"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="bg-yellow-50 border p-2 my-1 rounded text-sm">
            {/* TODO: Plug in TextSettingsEditor */}
            <p className="text-gray-700">Text Block Settings (coming soon)</p>
          </div>
        );
      case 'button':
        return (
          <div className="bg-green-50 border p-2 my-1 rounded text-sm">
            {/* TODO: Plug in ButtonSettingsEditor */}
            <p className="text-gray-700">Button Block Settings (coming soon)</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};

export default BlockRenderer;
