import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useDevice } from "../../context/DeviceContext";
import { useRenderContext } from "../../context/RenderContext";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../utils/stylingFunctions";

interface RenderLogoProps {
  logo: {
    url?: string;
    text?: string;
  };
}

const RenderLogo: React.FC<RenderLogoProps> = ({ logo }) => {
  const { device } = useDevice();
  const renderContext = useRenderContext();
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);

  const desktopLogoStyle = menubar?.desktop?.logoStyle;
  const mobileLogoStyle = menubar?.mobile?.logoStyle;

  // Choose appropriate style based on device
  const logoStyle = device === "mobile" ? mobileLogoStyle : desktopLogoStyle;

  const {
    placement = {},
    background,
    text: textStyle,
  } = logoStyle || {};

  const logoContent = logo?.url?.length > 0 ? (
    <img src={logo.url} alt="logo" className="h-full w-auto p-0" />
  ) : (
    <span style={{ ...getTextStyles(textStyle) }}>
      {logo?.text || "Your Brand"}
    </span>
  );

  return (
    <>
      {/* Desktop & Tablet */}
      <div
        className={`${
          renderContext === "websitePreview" && device !== "mobile"
            ? "hidden md:flex items-center justify-center"
            : "hidden"
        }`}
        style={{
          position: placement?.isAbsolute ? "absolute" : "static",
          top: placement?.topMargin,
          ...getBackgroundStyles(background),
          maxHeight: "20vh",
          ...getBorderStyles(menubar?.desktop?.logoStyle?.background?.border)
        }}
      >
        {logoContent}
      </div>

      {/* Mobile */}
      <div
        className={`${
          renderContext === "websitePreview" && device === "mobile"
            ? "flex items-center justify-center"
            : "md:hidden hidden"
        }`}
        style={{
          position: placement?.isAbsolute ? "absolute" : "static",
          top: placement?.topMargin,
          ...getBackgroundStyles(background),
          paddingLeft: "",
          maxHeight: "20vh",
        }}
      >
        {logoContent}
      </div>
    </>
  );
};

export default RenderLogo;
