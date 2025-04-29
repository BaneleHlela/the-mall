type BorderDirection = 'all' | 'y' | 'x' | 't' | 'b' | 'r' | 'l';
type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

export const applyBorderStyles = (borderDirection: BorderDirection, borderWidth: string, borderStyle: string, borderColor: string) => {
  const borderStyles = {
    all: { border: `${borderWidth}px ${borderStyle} ${borderColor}` },
    y: {
      borderTop: `${borderWidth}px ${borderStyle} ${borderColor}`,
      borderBottom: `${borderWidth}px ${borderStyle} ${borderColor}`,
    },
    x: {
      borderLeft: `${borderWidth}px ${borderStyle} ${borderColor}`,
      borderRight: `${borderWidth}px ${borderStyle} ${borderColor}`,
    },
    t: { borderTop: `${borderWidth}px ${borderStyle} ${borderColor}` },
    b: { borderBottom: `${borderWidth}px ${borderStyle} ${borderColor}` },
    r: { borderRight: `${borderWidth}px ${borderStyle} ${borderColor}` },
    l: { borderLeft: `${borderWidth}px ${borderStyle} ${borderColor}` },
  };

  return borderStyles[borderDirection] || {};
};

export const getBorderStyles = (border /*: typeof backgroundSchema["border"]*/) => {
  if (!border) return {};
  const { borderDirection, borderWidth, borderStyle, color, borderRadius } = border;

  const styles: { [key: string]: string } = {};

  const setRadius = (directions: string[]) => {
    const radius = borderRadius || "0px";
    if (directions.includes("t")) {
      styles.borderTopLeftRadius = radius;
      styles.borderTopRightRadius = radius;
    }
    if (directions.includes("b")) {
      styles.borderBottomLeftRadius = radius;
      styles.borderBottomRightRadius = radius;
    }
    if (directions.includes("l")) {
      styles.borderTopLeftRadius = radius;
      styles.borderBottomLeftRadius = radius;
    }
    if (directions.includes("r")) {
      styles.borderTopRightRadius = radius;
      styles.borderBottomRightRadius = radius;
    }
    if (directions.includes("x")) {
      styles.borderTopLeftRadius = radius;
      styles.borderBottomLeftRadius = radius;
      styles.borderTopRightRadius = radius;
      styles.borderBottomRightRadius = radius;
    }
    if (directions.includes("y")) {
      styles.borderTopLeftRadius = radius;
      styles.borderTopRightRadius = radius;
      styles.borderBottomLeftRadius = radius;
      styles.borderBottomRightRadius = radius;
    }
    if (directions.includes("all")) {
      styles.borderRadius = radius;
    }
  };

  switch (borderDirection) {
    case "all":
      setRadius(["all"]);
      styles.borderWidth = borderWidth || "0px";
      styles.borderStyle = borderStyle || "solid";
      styles.borderColor = color;
      break;
    case "y":
      setRadius(["y"]);
      styles.borderTopWidth = styles.borderBottomWidth = borderWidth || "0px";
      styles.borderTopStyle = styles.borderBottomStyle = borderStyle || "solid";
      styles.borderTopColor = styles.borderBottomColor = color || "transparent";
      break;
    case "x":
      setRadius(["x"]);
      styles.borderLeftWidth = styles.borderRightWidth = borderWidth || "0px";
      styles.borderLeftStyle = styles.borderRightStyle = borderStyle || "solid";
      styles.borderLeftColor = styles.borderRightColor = color || "transparent";
      break;
    case "t":
      setRadius(["t"]);
      styles.borderTopWidth = borderWidth || "0px";
      styles.borderTopStyle = borderStyle || "solid";
      styles.borderTopColor = color || "transparent";
      break;
    case "r":
      setRadius(["r"]);
      styles.borderRightWidth = borderWidth || "0px";
      styles.borderRightStyle = borderStyle || "solid";
      styles.borderRightColor = color || "transparent";
      break;
    case "b":
      setRadius(["b"]);
      styles.borderBottomWidth = borderWidth || "0px";
      styles.borderBottomStyle = borderStyle || "solid";
      styles.borderBottomColor = color || "transparent";
      break;
    case "l":
      setRadius(["l"]);
      styles.borderLeftWidth = borderWidth || "0px";
      styles.borderLeftStyle = borderStyle || "solid";
      styles.borderLeftColor = color || "transparent";
      break;
    default:
      break;
  }

  return styles;
};


export const getBackgroundStyles = (background) => {
  if (!background) return {};

  const styles = {
    backgroundColor: background.color || "",
    height: background.height || "",
    width:  background.width || "",
    marginTop: `${background.margin?.top || ""}`,
    marginBottom: `${background.margin?.bottom || ""}`,
    marginLeft: `${background.margin?.left || ""}`,
    marginRight: `${background.margin?.right || ""}`,
    paddingTop: `${background.padding?.top || ""}`,
    paddingBottom: `${background.padding?.bottom || ""}`,
    paddingLeft: `${background.padding?.left || ""}`,
    paddingRight: `${background.padding?.right || ""}`,
    opacity: background.opacity || 1, // 1 by default
    boxShadow: background.shadow?.addShadow ? background.shadow.style : "",
    clipPath: background.clipPath?.enabled ? background.clipPath.value : "",
    position: background.position?.type || "",
    zIndex: background.position?.adjustments?.zIndex ?? "",
    top: background.position?.adjustments?.top || "",
    right: background.position?.adjustments?.right || "",
    bottom: background.position?.adjustments?.bottom || "",
    left: background.position?.adjustments?.left || "",
  };

  // Handle background image styles
  if (background.backgroundImage?.url) {
    styles.backgroundImage = `url(${background.backgroundImage.url})`;
    styles.backgroundSize = background.backgroundImage.size || "cover";
    styles.backgroundPosition = background.backgroundImage.position || "center";
    styles.backgroundRepeat = background.backgroundImage.repeat || "no-repeat";
  }

  // Handle gradient if enabled
  if (background.gradient?.enabled) {
    styles.backgroundImage = background.gradient.style; // Gradient replaces `backgroundImage`
  }

  return styles;
};

export const getInheritedBorder = (backgroundChild, backgroundParent) => {
  if (!backgroundChild && !backgroundParent) return {};

  const background = backgroundChild && Object.keys(backgroundChild).length ? backgroundChild : backgroundParent;

  const styles = {
    backgroundColor: background?.color || "transparent",
    height: background?.height || "auto",
    width: background?.width || "auto",
    marginTop: `${background?.margin?.top || ""}`,
    marginBottom: `${background?.margin?.bottom || ""}`,
    marginLeft: `${background?.margin?.left || ""}`,
    marginRight: `${background?.margin?.right || ""}`,
    paddingTop: `${background?.padding?.top || ""}`,
    paddingBottom: `${background?.padding?.bottom || ""}`,
    paddingLeft: `${background?.padding?.left || ""}`,
    paddingRight: `${background?.padding?.right || ""}`,
    ...getBorderStyles(background?.border),
    boxShadow: background?.shadow?.addShadow ? background.shadow.style : "none",
  };

  return styles;
};


export const getTextStyles = (text) => {
  if (!text) return {}; // Return empty object if no text object is provided

  const styles: any = {};

  // Text styles
  if (text.color) styles.color = text.color;
  if (text.weight) styles.fontWeight = text.weight;
  if (text.fontSize) styles.fontSize = text.fontSize;
  if (text.fontFamily) styles.fontFamily = text.fontFamily;
  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textAlign) styles.textAlign = text.textAlign;
  if (text.textTransform) styles.textTransform = text.textTransform;
  if (text.textShadow) styles.textShadow = text.textShadow;
  if (text.backgroundColor !== undefined) {
    styles.backgroundColor = text.backgroundColor;
  } else {
    styles.backgroundColor = 'transparent';
  }

  // Animation styles
  if (text.animationType && text.animationType !== 'none') {
    // We assume you have matching animation classes like fade-in-left, slide-in, etc.
    styles.animationDuration = text.animationDuration || '2s';
    styles.animationDelay = text.animationDelay || '0s';
    styles.animationIterationCount = text.animationIteration || '1';
  }

  return styles;
};


export const getInheritedTextStyles = (textChild, textParent) => {
  const text = textChild && Object.keys(textChild).length ? textChild : textParent;

  if (!text) return {}; // Return empty object if no text object is provided

  const styles: any = {};

  if (text.color) styles.color = text.color;
  if (text.weight) styles.fontWeight = text.weight;
  if (text.fontSize) styles.fontSize = text.fontSize;
  if (text.fontFamily) styles.fontFamily = text.fontFamily;
  if (text.fontStyle) styles.fontStyle = text.fontStyle;
  if (text.lineHeight) styles.lineHeight = text.lineHeight;
  if (text.letterSpacing) styles.letterSpacing = text.letterSpacing;
  if (text.textDecoration) styles.textDecoration = text.textDecoration;
  if (text.textAlign) styles.textAlign = text.textAlign;
  if (text.textTransform) styles.textTransform = text.textTransform;
  if (text.textShadow) styles.textShadow = text.textShadow;
  if (text.backgroundColor !== undefined) {
    styles.backgroundColor = text.backgroundColor;
  } else {
    styles.backgroundColor = 'transparent';
  }

  return styles;
};


export const getDisplayStyles = (display: any) => {
  if (!display) return {};

  const styles: Record<string, any> = {
    display: display.display || "block",
    visibility: display.visibility || "visible",
    overflowX: display.overflow?.x || "visible",
    overflowY: display.overflow?.y || "visible",
    float: display.float || "none",
    clear: display.clear || "none",
    order: display.order ?? 0,
  };

  if (display.display?.includes("flex")) {
    styles.flexDirection = display.flex?.direction || "row";
    styles.justifyContent = display.flex?.justifyContent || "flex-start";
    styles.alignItems = display.flex?.alignItems || "stretch";
    styles.flexWrap = display.flex?.wrap || "nowrap";
    styles.gap = display.flex?.gap || "0";
  }

  if (display.display?.includes("grid")) {
    styles.gridTemplateColumns = display.grid?.templateColumns || "";
    styles.gridTemplateRows = display.grid?.templateRows || "";
    styles.gap = display.grid?.gap || "0"; // grid gap can override flex gap if grid
    styles.rowGap = display.grid?.rowGap || "";
    styles.columnGap = display.grid?.columnGap || "";
    styles.gridAutoFlow = display.grid?.autoFlow || "row";
  }

  return styles;
};


