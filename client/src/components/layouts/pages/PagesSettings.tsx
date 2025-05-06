import React, { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import AddPageModal from './pages-components/AddPageModal';
import PerPageSettingsEditor from './pages-components/PerPageSettingsEditor'; // ✅ import here
import PerPageSettings from './pages-components/PerPageSettingsEditor';

const PagesSettings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const currentStore = useSelector((state: RootState) => state.stores.currentStore);

  if (!currentStore) return <div>Loading store data...</div>;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-4 relative">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Pages Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-gray-100 w-full p-4 space-y-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add page
          </button>

          <PerPageSettings />
        </div>
      )}

      {showModal && <AddPageModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PagesSettings;
