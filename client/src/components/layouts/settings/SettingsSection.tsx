import React, { useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { BiEditAlt, BiTrash } from 'react-icons/bi';

// Sample data structure for layout divs
const initialLayoutDivs = [
  { id: '1', name: 'Hero Banner', isFixed: true }, // Unmovable
  { id: '2', name: 'Product Display' },
  { id: '3', name: 'About Us' },
  { id: '4', name: 'Contact Form' },
  { id: '5', name: 'Footer', isFixed: true }, // Unmovable
];

interface SettingsSection {
  width: number,
  height: number
}

const SettingsSection: React.FC<SettingsSection> = () => {
  const [divs, setDivs] = React.useState(initialLayoutDivs);

  useEffect(() => {
    console.log(divs);
  }, [divs]);

  // Handle reorder
  const onReorder = (newOrder: any) => {
    const fixedItems = divs.filter((div) => div.isFixed);
    const movableItems = divs.filter((div) => !div.isFixed);

    const reorderedDivs = [
      ...fixedItems,
      ...newOrder,
    ];

    setDivs(reorderedDivs);
  };

  return (
    <div className="h-full min-w-[200px] w-[25vw] bg-gray-800 p-3 overflow-y-auto">
      <h3 className="text-white font-semibold text-sm mb-2">Settings</h3>

      {/* Static Hero Banner item */}
      <div className="bg-gray-700 text-white p-2 rounded shadow flex justify-between items-center mb-2">
        <span className="text-xs">Hero Banner</span>
        <div className="flex gap-1">
          <button><BiEditAlt className="text-blue-400 text-xs" /></button>
          <button><BiTrash className="text-red-400 text-xs" /></button>
        </div>
      </div>

      {/* Reorderable items */}
      <Reorder.Group
        axis="y"
        values={divs.filter((div) => !div.isFixed)}
        onReorder={onReorder}
        className="space-y-1 overflow-auto"
      >
        {divs.filter((div) => !div.isFixed).map((div) => (
          <Reorder.Item key={div.id} value={div}>
            <div className="bg-gray-700 text-white p-2 rounded shadow flex justify-between items-center text-xs">
              <span>{div.name}</span>
              <div className="flex gap-1">
                <button><BiEditAlt className="text-blue-400" /></button>
                <button><BiTrash className="text-red-400" /></button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Static Footer item */}
      <div className="bg-gray-700 text-white p-2 rounded shadow flex justify-between items-center mt-2">
        <span className="text-xs">Footer</span>
        <div className="flex gap-1">
          <button><BiEditAlt className="text-blue-400 text-xs" /></button>
          <button><BiTrash className="text-red-400 text-xs" /></button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
