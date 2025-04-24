import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

interface AddPageModalProps {
  onClose: () => void;
}

const pages = [
  "Welcome",
  "Reviews",
  "Products",
  "Services",
  "Qualifications",
  "Team",
  "Footer",
  "Gallery",
  "Portfolio",
  "BookNow",
  "Promotions",
  "FAQs",
  "Contact",
  "Location",
  "Wishlist",
  "Events",
  "Loyalty",
  "Membership"
];

const toCamelCaseKey = (name: string) =>
  name.charAt(0).toLowerCase() + name.slice(1);

const AddPageModal: React.FC<AddPageModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleAddPage = (page: string) => {
    const key = toCamelCaseKey(page);
    dispatch(updateSetting({ field: `pages.${key}`, value: {} }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Select a Page to Add</h2>
        <ul className="space-y-2 max-h-72 overflow-y-auto">
          {pages.map((page, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition"
              onClick={() => handleAddPage(page)}
            >
              {page}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddPageModal;
