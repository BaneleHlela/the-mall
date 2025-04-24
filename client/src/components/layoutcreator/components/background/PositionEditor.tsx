import React from "react";
import { useDispatch } from "react-redux";
import { getSetting } from "../../../../utils/helperFunctions";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";

interface PositionEditorProps {
  objectPath: string;
  settings: Record<string, any>;
}

const PositionEditor: React.FC<PositionEditorProps> = ({ objectPath, settings }) => {
  const dispatch = useDispatch();

  const defaultPosition = {
    type: "static",
    adjustments: {
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto",
      zIndex: 0,
    },
  };

  const positionSettings = getSetting(settings, `${objectPath}.position`, defaultPosition);
  const { type, adjustments = {} } = positionSettings;

  const handleTypeChange = (newType: string) => {
    dispatch(updateSetting({ field: `${objectPath}.position.type`, value: newType }));
  };

  const handleAdjustmentChange = (field: string, value: string | number) => {
    dispatch(updateSetting({ field: `${objectPath}.position.adjustments.${field}`, value }));
  };

  return (
    <div className="bg-gray-100 w-full p-4 border border-gray-300 rounded-lg space-y-3">
      <h3 className="text-lg font-semibold">Position Settings</h3>

      {/* Position Type Selector */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Position Type</label>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="p-2 border rounded bg-white text-sm"
        >
          <option value="static">Static</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>

      {/* Position Adjustments */}
      <p className="text-sm">Adjustments (if selected option is adjustable)</p>
      <div className="grid grid-cols-2 gap-4">
        {["top", "right", "bottom", "left"].map((field) => (
          <div key={field} className="flex flex-col space-y-1">
            <label className="text-sm font-medium capitalize">{field}</label>
            <input
              type="text"
              value={adjustments[field]}
              onChange={(e) => handleAdjustmentChange(field, e.target.value)}
              placeholder="e.g., auto or 10px"
              className="p-2 border rounded text-sm"
            />
          </div>
        ))}

        {/* zIndex Adjustment */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">zIndex</label>
          <input
            type="number"
            value={adjustments.zIndex}
            onChange={(e) => handleAdjustmentChange("zIndex", Number(e.target.value))}
            className="p-2 border rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default PositionEditor;
