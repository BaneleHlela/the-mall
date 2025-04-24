export const applyFont = (fontFamily: string) => {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
    / /g,
    '+'
  )}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};


export const getSetting = (settings: Record<string, any>, objectPath: string, defaultValue: any) => {
  try {
    const resolvedSetting = objectPath.split(".").reduce((current, prop) => {
      if (!current || current[prop] === undefined) {
        console.error(`Path not found at: ${prop}`);
        return undefined;
      }
      return current[prop];
    }, settings);

    return resolvedSetting || defaultValue;
  } catch (error) {
    console.error("Error resolving object path:", error);
    return defaultValue;
  }
};


export const parseSetting = (
  setting: string
): {
  value: number | null;
  unit: "px" | "vh" | "vw" | "%" | "auto";
  isDisabled: boolean;
} => {
  if (setting === "auto") {
    return {
      value: null, // No numeric value for "auto"
      unit: "auto",
      isDisabled: true, // Slider is disabled in "auto" mode
    };
  }

  const match = setting.match(/^(\d+)(px|vh|vw|%)$/);
  if (match) {
    return {
      value: parseInt(match[1], 10), // Extract the numeric value
      unit: match[2] as "px" | "vh" | "vw" | "%", // Extract the unit
      isDisabled: false, // Slider is enabled for px, vh, vw, and %
    };
  }

  console.error(`Invalid setting value: ${setting}`);
  return {
    value: 50, 
    unit: "px", 
    isDisabled: false, 
  };
};


