import defaultMenubarConfig from "./defaultMenubarConfig.ts";

export const backgroundFill = {
  padding: {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
  },
  margin: {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
  },
  border: {
    borderStyle: "double",
    borderWidth: "2px",
    borderRadius: "full",
    borderDirection: "b",
    color: "#ff0000",
  },
  shadow: {
    addShadow: false,
    style: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  },
  color: "#ffffff",
  height: "auto",
  width: "auto",
}
export const textFill =  {
  color: "#000000",
  weight: "normal",
  fontSize: "auto",
  fontFamily: "Arial, sans-serif",
  fontStyle: "normal",
  lineHeight: "1.5",
  letterSpacing: "normal",
  textDecoration: "none",
  textAlign: "",
  textTransform: "none",
  textShadow: "none",
  backgroundColor: "transparent",
}

export const borderFill = {
  borderStyle: "none",
  borderWidth: "1",
  borderRadius: "",
  borderDirection: "all",
  color: "#000000"
}

const defaultLayoutConfig = {
  store: null,
  menubar: defaultMenubarConfig,
  hero: "basic",
  theme: "default",
  divs: [],
  footer: "basic",
  colors: {
    primary: "#ffffff",
    secondary: "#ead5d5",
    text: "#000000",
    accent: "#ff8a00",
  },
  customCSS: "",
  icons: [],
  pages: {
  }
}

export default defaultLayoutConfig;
