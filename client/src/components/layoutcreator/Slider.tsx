import React from "react";
import { Box, Stack, Slider, Typography, IconButton } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { get } from "mongoose";
import { RootState } from "../../app/store";
import { updateSetting } from "../../features/layouts/layoutSettingsSlice";

interface SliderComponentProps {
  objectPath: string; // e.g., "layout.settings"
  field: string; // e.g., "height"
  range?: [number, number]; // Min and max range
  units?: string[]; // Allowed units (default: ["px", "vh", "vw", "%"])
}

const SliderComponent: React.FC<SliderComponentProps> = ({
  objectPath,
  field,
  range = [0, 100],
  units = ["px", "vh", "vw", "%"],
}) => {
  const dispatch = useDispatch();
  const fullFieldPath = `${objectPath}.${field}`;

  // ✅ Safely retrieve the setting value from Redux
  const setting = useSelector((state: RootState) => get(state, fullFieldPath, "0px"));

  // ✅ Extract numeric value and unit
  const numericValue = parseFloat(setting) || 0;
  const unit = units.find((u) => setting.endsWith(u)) || units[0];

  const updateSettingValue = (newValue: string) => {
    dispatch(updateSetting({ field: fullFieldPath, value: newValue }));
  };

  const handleIncrement = () => {
    updateSettingValue(`${Math.min(numericValue + 1, range[1])}${unit}`);
  };

  const handleDecrement = () => {
    updateSettingValue(`${Math.max(numericValue - 1, range[0])}${unit}`);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      updateSettingValue(`${newValue}${unit}`);
    }
  };

  const switchUnit = () => {
    const currentIndex = units.indexOf(unit);
    const newIndex = (currentIndex + 1) % units.length;
    updateSettingValue(`${numericValue}${units[newIndex]}`);
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", border: "1px solid gray" }}>
      <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
        <Stack direction="column" alignItems="center">
          <IconButton size="small" onClick={handleIncrement}>
            <ArrowDropUp />
          </IconButton>

          <Typography variant="body1">{numericValue}</Typography>

          <IconButton size="small" onClick={handleDecrement}>
            <ArrowDropDown />
          </IconButton>
        </Stack>

        {/* ✅ Ensure Slider re-renders when value updates */}
        <Slider
          key={`${numericValue}-${unit}`} // Forces re-render if needed
          aria-label="Value"
          value={numericValue}
          onChange={handleSliderChange}
          min={range[0]}
          max={range[1]}
          valueLabelDisplay="auto"
        />

        <Stack direction="column" alignItems="center">
          <IconButton size="small" onClick={switchUnit}>
            <ArrowDropUp />
          </IconButton>

          <Typography variant="body1">{unit}</Typography>

          <IconButton size="small" onClick={switchUnit}>
            <ArrowDropDown />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SliderComponent;
