const validDisplayTypes = [
    "block",
    "inline",
    "inline-block",
    "flex",
    "inline-flex",
    "grid",
    "inline-grid",
    "none",
    "contents",
    "table",
  ];
  
  const validFlexDirections = ["row", "row-reverse", "column", "column-reverse"];
  const validJustifyContent = [
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ];
  const validAlignItems = ["stretch", "flex-start", "flex-end", "center", "baseline"];
  const validFlexWrap = ["nowrap", "wrap", "wrap-reverse"];
  const validOverflow = ["visible", "hidden", "scroll", "auto"];
  const validVisibility = ["visible", "hidden", "collapse"];
  
  const displaySchema = {
    display: {
      type: String,
      enum: validDisplayTypes,
      default: "block",
    },
    visibility: {
      type: String,
      enum: validVisibility,
      default: "visible",
    },
    overflow: {
      x: {
        type: String,
        enum: validOverflow,
        default: "visible",
      },
      y: {
        type: String,
        enum: validOverflow,
        default: "visible",
      },
    },
    flex: {
      enabled: { type: Boolean, default: false },
      direction: {
        type: String,
        enum: validFlexDirections,
        default: "row",
      },
      justifyContent: {
        type: String,
        enum: validJustifyContent,
        default: "flex-start",
      },
      alignItems: {
        type: String,
        enum: validAlignItems,
        default: "stretch",
      },
      wrap: {
        type: String,
        enum: validFlexWrap,
        default: "nowrap",
      },
      gap: { type: String, default: "0" },
    },
    grid: {
      enabled: { type: Boolean, default: false },
      templateColumns: { type: String, default: "" }, // e.g. "1fr 1fr"
      templateRows: { type: String, default: "" },
      gap: { type: String, default: "0" },
      rowGap: { type: String, default: "" },
      columnGap: { type: String, default: "" },
      autoFlow: {
        type: String,
        enum: ["row", "column", "dense", "row dense", "column dense"],
        default: "row",
      },
    },
    float: {
      type: String,
      enum: ["left", "right", "none", "inline-start", "inline-end"],
      default: "none",
    },
    clear: {
      type: String,
      enum: ["none", "left", "right", "both", "inline-start", "inline-end"],
      default: "none",
    },
    order: {
      type: Number,
      default: 0,
    },
  };
  
  export default displaySchema;
  