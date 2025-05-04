import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import AddItemDropdown from "../../components/AddItemDropDown";
import BackgroundEditor from "../../components/background/BackgroundEditor";
import DisplayEditor from "../../components/display/DisplayEditor";
import DivEditor from "../../DivEditor";
import TextEditor from "../../components/text/TextEditor";
import ButtonEditor from "../../components/ButtonEditor";
import ImageUploader from "../../components/ImageUploader";


const PerPageSettings = () => {
  const dispatch = useDispatch();
  const pages = useSelector((state: RootState) => state.layoutSettings.pages);
  const [openPage, setOpenPage] = useState<string | null>(null);
  const [openDevice, setOpenDevice] = useState<Record<string, string | null>>({});
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const devices = ['mobile', 'tablet', 'desktop'];
  const itemOptions = ['text', 'button', 'div', "image", "animation"];

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handleAddItem = (pageKey: string, device: string, type: string) => {
    const plural = type === 'div' ? 'divs' : type === 'button' ? 'buttons' : type === 'text' ? 'texts' : type + 's';
    const itemPath = `pages.${pageKey}.${device}.${plural}`;
    const currentItems = pages[pageKey]?.[device]?.[plural] || [];
    const updatedItems = [...currentItems, {}]; // no need for newItem details yet
    dispatch(updateSetting({ field: itemPath, value: updatedItems }));
    setDropdownOpen(null);
  };
  
  

  if (!pages) return <p>No pages available.</p>;

  return (
    <div className="space-y-2">
      {Object.keys(pages).map((pageKey) => {
        const isOpen = openPage === pageKey;

        return (
          <div key={pageKey} className="border border-gray-300 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
              onClick={() => setOpenPage(isOpen ? null : pageKey)}
            >
              {`${pageKey} settings`}
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="p-4 bg-gray-50 space-y-2 h-screen">
                <p className="text-sm text-gray-600 mb-2 font-semibold">
                  Edit <span className="capitalize">{pageKey}</span> by device
                </p>

                {devices.map((device) => {
                  const isDeviceOpen = openDevice[pageKey] === device;
                  const dropdownKey = `${pageKey}-${device}`;

                  return (
                    <div key={device} className="border border-gray-200 rounded">
                      <button
                        className="w-full flex justify-between items-center p-2 bg-gray-100"
                        onClick={() =>
                          setOpenDevice((prev) => ({
                            ...prev,
                            [pageKey]: isDeviceOpen ? null : device,
                          }))
                        }
                      >
                        {device}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDeviceOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDeviceOpen && (
                        <div className="p-3 space-y-3">
                          <DisplayEditor
                            objectPath={`pages.${pageKey}.${device}.display`}
                            settings={pages[pageKey][device]?.display || []}
                            handleSettingChange={handleSettingChange}
                          />
                          
                          <BackgroundEditor
                            objectPath={`pages.${pageKey}.${device}.background`}
                            settings={pages[pageKey][device]?.display || []}
                            handleSettingChange={handleSettingChange}
                          />

                          {/* === Render Text Editors === */}
                            {(pages[pageKey][device]?.texts || []).map((_, index) => (
                            <div key={`text-${index}`} className="border p-2 rounded bg-white">
                                <p className="text-xs font-medium text-gray-500 mb-1">Text {index}</p>
                                <BackgroundEditor
                                objectPath={`pages.${pageKey}.${device}.texts.${index}.background`}
                                settings={pages[pageKey][device]?.texts?.[index]?.background || {}}
                                handleSettingChange={handleSettingChange}
                                />
                                <TextEditor
                                objectPath={`pages.${pageKey}.${device}.texts.${index}.text`}
                                settings={pages[pageKey][device]?.texts?.[index]?.background || {}}
                                handleSettingChange={handleSettingChange}
                                />
                            </div>
                            ))}

                            {/* === Render Button Editors === */}
                            {(pages[pageKey][device]?.buttons || []).map((btn, i) => (
                              <ButtonEditor
                                key={`button-${i}`}
                                objectPath={`pages.${pageKey}.${device}.buttons.${i}`}
                                settings={btn}
                                handleSettingChange={handleSettingChange}
                              />
                            ))}
                             {/* === Render Div Editors === */}
                            {(pages[pageKey][device]?.divs || []).map((div, index) => (
                            <DivEditor
                                key={`div-${index}`}
                                objectPath={`pages.${pageKey}.${device}.divs.${index}`}
                                settings={div}
                                handleSettingChange={handleSettingChange}
                                index={index}
                            />
                            ))}
                            {/* === Render Image Editors === */}
                            {(pages[pageKey][device]?.images || []).map((image, index) => (
                              <ImageUploader
                                key={`image-${index}`}
                                objectPath={`pages.${pageKey}.${device}.images.${index}`}
                                settings={image}
                                handleSettingChange={handleSettingChange}
                              />
                            ))}




                          {/* Add Item Dropdown */}
                          <AddItemDropdown
                            open={dropdownOpen === dropdownKey}
                            onToggle={() =>
                                setDropdownOpen(dropdownOpen === dropdownKey ? null : dropdownKey)
                            }
                            onSelect={(type) => handleAddItem(pageKey, device, type)}
                            />

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PerPageSettings;
