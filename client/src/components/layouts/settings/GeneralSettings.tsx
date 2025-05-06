import React, { useState } from 'react';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store.ts';
import UploadLogo from '../../UploadLogo.tsx';

const GeneralSettings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const currentStore = useSelector((state: RootState) => state.stores.currentStore);

  if (!currentStore) return <div>Loading store data...</div>;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        General Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-gray-100 w-full p-4">
          <UploadLogo storeId={currentStore._id} />
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
