import React from "react";
import { transitions} from "../../../utils/menubarTransitions.ts";

interface TransitionDropdownProps {
  objectPath: string;
  selected: any;
  handleSettingChange: (field: string, value: any) => void;
}

const TransitionDropdown: React.FC<TransitionDropdownProps> = ({
  objectPath,
  selected,
  handleSettingChange,
}) => {
  return (
    <div>
      <label>Select Transition</label>
      <select
        value={selected?.enter || ""}
        onChange={(e) =>
          handleSettingChange(`${objectPath}.enter`, e.target.value)
        }
        className="border rounded p-2 mt-2"
      >
        {Object.entries(transitions).map(([key, value]) => (
          <option key={key} value={value.enter}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TransitionDropdown;
