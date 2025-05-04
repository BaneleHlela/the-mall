import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DisplayEditorProps {
  objectPath: string;
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const validDisplayTypes = [
  "block", "inline", "inline-block", "flex", "inline-flex", "grid", "inline-grid",
  "none", "contents", "table",
];
const validFlexDirections = ["row", "row-reverse", "column", "column-reverse"];
const validJustifyContent = [
  "flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly",
];
const validAlignItems = ["stretch", "flex-start", "flex-end", "center", "baseline"];
const validFlexWrap = ["nowrap", "wrap", "wrap-reverse"];
const validOverflow = ["visible", "hidden", "scroll", "auto"];
const validVisibility = ["visible", "hidden", "collapse"];
const validFloat = ["left", "right", "none", "inline-start", "inline-end"];
const validClear = ["none", "left", "right", "both", "inline-start", "inline-end"];
const validAutoFlow = ["row", "column", "dense", "row dense", "column dense"];

const DisplayEditor: React.FC<DisplayEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleEditor = () => setIsOpen((prev) => !prev);
  const toggleSection = (section: string) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const getSetting = (key: string) => {
    try {
      return key.split(".").reduce((obj, prop) => obj?.[prop], settings);
    } catch {
      return undefined;
    }
  };

  const renderSelect = (
    label: string,
    field: string,
    options: string[],
    value: string
  ) => (
    <div className="flex flex-col space-y-1">
      <label className="text-sm">{label}</label>
      <select
        className="border rounded px-2 py-1 text-sm"
        value={value}
        onChange={(e) => handleSettingChange(field, e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );


  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
        onClick={toggleEditor}
      >
        Display Settings
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-gray-100 p-4 space-y-4">
          {renderSelect("Display", `${objectPath}.display`, validDisplayTypes, getSetting(`${objectPath}.display`))}
          {renderSelect("Visibility", `${objectPath}.visibility`, validVisibility, getSetting(`${objectPath}.visibility`))}

          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Overflow X", `${objectPath}.overflow.x`, validOverflow, getSetting(`${objectPath}.overflow.x`))}
            {renderSelect("Overflow Y", `${objectPath}.overflow.y`, validOverflow, getSetting(`${objectPath}.overflow.y`))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderSelect("Float", `${objectPath}.float`, validFloat, getSetting(`${objectPath}.float`))}
            {renderSelect("Clear", `${objectPath}.clear`, validClear, getSetting(`${objectPath}.clear`))}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm">Order</label>
            <input
              type="number"
              className="border rounded px-2 py-1 text-sm"
              value={getSetting(`${objectPath}.order`)}
              onChange={(e) => handleSettingChange(`${objectPath}.order`, parseInt(e.target.value))}
            />
          </div>
          {/* Flex Section */}
          {/* ["flex", "inline-flex"].includes(getSetting(`${objectPath}.display`)) &&  */}
          {(
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
                onClick={() => toggleSection("Flex")}
              >
                Flex Settings
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSections["Flex"] ? "rotate-180" : ""}`} />
              </button>
              {openSections["Flex"] && (
                <div className="p-2 bg-white space-y-3">
                  {renderSelect("Direction", `${objectPath}.flex.direction`, validFlexDirections, getSetting(`${objectPath}.flex.direction`))}
                  {renderSelect("Justify Content", `${objectPath}.flex.justifyContent`, validJustifyContent, getSetting(`${objectPath}.flex.justifyContent`))}
                  {renderSelect("Align Items", `${objectPath}.flex.alignItems`, validAlignItems, getSetting(`${objectPath}.flex.alignItems`))}
                  {renderSelect("Wrap", `${objectPath}.flex.wrap`, validFlexWrap, getSetting(`${objectPath}.flex.wrap`))}
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Gap</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.flex.gap`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.flex.gap`, e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grid Section */}
          {/* ["grid", "inline-grid"].includes(getSetting(`${objectPath}.display`)) &&  */}
          {(
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
                onClick={() => toggleSection("Grid")}
              >
                Grid Settings
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSections["Grid"] ? "rotate-180" : ""}`} />
              </button>
              {openSections["Grid"] && (
                <div className="p-2 bg-white space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Template Columns</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.grid.templateColumns`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.grid.templateColumns`, e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Template Rows</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.grid.templateRows`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.grid.templateRows`, e.target.value)}
                    />
                  </div>
                  {renderSelect("Auto Flow", `${objectPath}.grid.autoFlow`, validAutoFlow, getSetting(`${objectPath}.grid.autoFlow`))}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.gap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.gap`, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Row Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.rowGap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.rowGap`, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Column Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.columnGap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.columnGap`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Flex Section */}
          {getSetting(`${objectPath}.flex.enabled`) && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
                onClick={() => toggleSection("Flex")}
              >
                Flex Settings
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSections["Flex"] ? "rotate-180" : ""}`} />
              </button>
              {openSections["Flex"] && (
                <div className="p-2 bg-white space-y-3">
                  {renderSelect("Direction", `${objectPath}.flex.direction`, validFlexDirections, getSetting(`${objectPath}.flex.direction`))}
                  {renderSelect("Justify Content", `${objectPath}.flex.justifyContent`, validJustifyContent, getSetting(`${objectPath}.flex.justifyContent`))}
                  {renderSelect("Align Items", `${objectPath}.flex.alignItems`, validAlignItems, getSetting(`${objectPath}.flex.alignItems`))}
                  {renderSelect("Wrap", `${objectPath}.flex.wrap`, validFlexWrap, getSetting(`${objectPath}.flex.wrap`))}
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Gap</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.flex.gap`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.flex.gap`, e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grid Section */}
          {getSetting(`${objectPath}.grid.enabled`) && (
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-2 text-left bg-gray-200"
                onClick={() => toggleSection("Grid")}
              >
                Grid Settings
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${openSections["Grid"] ? "rotate-180" : ""}`} />
              </button>
              {openSections["Grid"] && (
                <div className="p-2 bg-white space-y-3">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Template Columns</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.grid.templateColumns`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.grid.templateColumns`, e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm">Template Rows</label>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      value={getSetting(`${objectPath}.grid.templateRows`)}
                      onChange={(e) => handleSettingChange(`${objectPath}.grid.templateRows`, e.target.value)}
                    />
                  </div>
                  {renderSelect("Auto Flow", `${objectPath}.grid.autoFlow`, validAutoFlow, getSetting(`${objectPath}.grid.autoFlow`))}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.gap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.gap`, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Row Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.rowGap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.rowGap`, e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm">Column Gap</label>
                      <input
                        type="text"
                        className="border rounded px-2 py-1 text-sm"
                        value={getSetting(`${objectPath}.grid.columnGap`)}
                        onChange={(e) => handleSettingChange(`${objectPath}.grid.columnGap`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayEditor;
