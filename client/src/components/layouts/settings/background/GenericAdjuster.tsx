import React, { useState, useEffect } from "react";
import { Slider, IconButton, Typography, Stack, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useDispatch } from "react-redux";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";

type GenericAdjusterProps = {
  label: string; // e.g., "Height", "Width"
  initialSetting: string; // e.g., "50px", "auto"
  units: Array<"px" | "vh" | "vw" | "%" | "auto">; // Allowed units
  objectPath: string; // Path to the field in the store
};

const GenericAdjuster: React.FC<GenericAdjusterProps> = ({
  label,
  initialSetting,
  units,
  objectPath,
}) => {
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState<number | null>(null); // Numeric value
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number>(0); // Unit index
  const [isSliderDisabled, setIsSliderDisabled] = useState<boolean>(false); // Slider state

  // Parse setting value and unit from initialSetting
  const parseSetting = (setting: string | undefined) => {
    if (!setting) {
      return { value: null, unit: "auto", isDisabled: true }; // Default to "auto"
    }

    if (setting === "auto") {
      return { value: null, unit: "auto", isDisabled: true };
    }

    const match = setting.match(/^(\d+)(px|vh|vw|%)$/);
    if (match) {
      return {
        value: parseInt(match[1], 10),
        unit: match[2] as "px" | "vh" | "vw" | "%",
        isDisabled: false,
      };
    }

    console.warn("Unrecognized setting format:", setting);
    return { value: 50, unit: "px", isDisabled: false }; // Default fallback
  };

  useEffect(() => {
    const { value, unit, isDisabled } = parseSetting(initialSetting);

    setCurrentValue(value);

    if (units) {
      // Ensure the unit exists in the units array before setting currentUnitIndex
      const unitIndex = units.indexOf(unit as typeof units[number]);
      setCurrentUnitIndex(unitIndex >= 0 ? unitIndex : 0); // Default to 0 if the unit is not found
    }

    setIsSliderDisabled(isDisabled);
  }, [initialSetting, units]);

  // Handle slider change
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newValueStr = `${newValue}${units[currentUnitIndex] || "px"}`;
    setCurrentValue(newValue as number);
    handleChange("slider", newValueStr);
  };

  // Handle unit toggle
  const handleToggle = (direction: "up" | "down") => {
    const newIndex =
      direction === "up"
        ? (currentUnitIndex + 1) % units.length
        : (currentUnitIndex - 1 + units.length) % units.length;

    // Ensure newIndex is within valid bounds
    if (newIndex >= 0 && newIndex < units.length) {
      const newUnit = units[newIndex];
      setCurrentUnitIndex(newIndex);
      setIsSliderDisabled(newUnit === "auto");
      handleChange("unit", newUnit);
    }
  };

  // Handle change function for dispatching to Redux
  const handleChange = (field: string, value: string) => {
    console.log(`Dispatching updateSetting with field: ${field}, value: ${value}`);
    dispatch(updateSetting({ field: `${objectPath}.${field}`, value }));
  };

  // Debugging logs
  useEffect(() => {
    console.log("units:", units); // Logs the units array
    console.log("currentUnitIndex:", currentUnitIndex); // Logs the current index
    console.log("currentUnit:", units ? units[currentUnitIndex] : "Invalid Unit"); // Logs the current unit value
  }, [units, currentUnitIndex]);

  return (
    <Stack spacing={2}>
      {/* Label */}
      <Typography variant="h6" align="center">
        {label}
      </Typography>

      {/* Controls: Toggle Unit and Slider */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Toggle Unit */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton onClick={() => handleToggle("up")}>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography variant="body2">
            {units && units[currentUnitIndex] !== undefined ? units[currentUnitIndex] : "Invalid Unit"}
          </Typography>
          <IconButton onClick={() => handleToggle("down")}>
            <ArrowDownwardIcon />
          </IconButton>
        </Box>

        {/* Slider */}
        <Box flex={1}>
          <Slider
            value={currentValue || 0}
            onChange={handleSliderChange}
            min={1}
            max={100}
            valueLabelDisplay="auto"
            disabled={isSliderDisabled}
            aria-labelledby={`${label.toLowerCase()}-slider`}
          />
        </Box>
      </Box>

      {/* Value Display */}
      <Typography variant="body2" align="center">
        {label} ({units && units[currentUnitIndex] !== undefined ? units[currentUnitIndex] : "Invalid Unit"}):{" "}
        {currentValue !== null ? currentValue : "Auto"}
      </Typography>
    </Stack>
  );
};

export default GenericAdjuster;
