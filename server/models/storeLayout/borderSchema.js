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

const validBorderDirections = ["t", "r", "b", "l", "all"]; // t = top, r = right, b = bottom, l = left, all = full border

const borderSchema = {
  borderStyle: {
    type: String,
    enum: validBorderStyles,
    default: "double",
  },
  borderWidth: {
    type: String,
    default: "2px",
  },
  borderRadius: {
    type: String,
    default: "full",
  },
  borderDirection: {
    type: String,
    enum: validBorderDirections,
    default: "b",
  },
  color: {
    type: String,
    default: "#ff0000"
  }
}
export default borderSchema;
