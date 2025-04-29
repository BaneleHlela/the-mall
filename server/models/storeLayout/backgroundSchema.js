const validBorderStyles = [
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
  ];
  
const validBorderDirections = ["all", "x", "y", "t", "r", "b", "l"]; // t = top, r = right, b = bottom, l = left, all = full border

const backgroundSchema = {
  color: { type: String, default: "#ffffff" },
  height: { type: String, default: "" },
  width: { type: String, default: "" },
  padding: {
    left: { type: String, default: "" },
    right: { type: String, default: "" },
    top: { type: String, default: "" },
    bottom: { type: String, default: "" },
  },
  margin: {
    left: { type: String, default: "" },
    right: { type: String, default: "" },
    top: { type: String, default: "" },
    bottom: { type: String, default: "" },
  },
  border: {
    borderStyle: {
      type: String,
      enum: validBorderStyles,
      default: "solid",
    },
    borderWidth: {
      type: String,
      default: "2px",
    },
    borderRadius: {
      type: String,
      default: "",
    },
    borderDirection: {
      type: String,
      enum: validBorderDirections,
      default: "b",
    },
    color: {
      type: String,
      default: "",
    },
  },
  shadow: {
    addShadow: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String,
      default: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
    },
  },
  opacity: { type: Number, default: 1 }, // 0 to 1
  backgroundImage: {
    url: { type: String, default: "" },
    size: { type: String, enum: ["auto", "cover", "contain"], default: "cover" },
    position: { type: String, default: "center" },
    repeat: { type: String, enum: ["no-repeat", "repeat", "repeat-x", "repeat-y"], default: "no-repeat" },
    attachment: { type: String, enum: ["scroll", "fixed", "local"], default: "scroll" }
  },
  gradient: {
    enabled: { type: Boolean, default: false },
    style: {
      type: String,
      default: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
    },
  },
  clipPath: {
    enabled: { type: Boolean, default: false },
    value: { type: String, default: "" },
  },
  position: {
    type: {
      type: String,
      enum: ["static", "relative", "absolute", "fixed", "sticky"],
      default: "",
      required: false,
    },
    adjustments: {
      top: { type: String, default: "" },
      right: { type: String, default: "" },
      bottom: { type: String, default: "" },
      left: { type: String, default: "" },
      zIndex: { type: Number, default: 0 },
    },
  },
};


export default backgroundSchema;