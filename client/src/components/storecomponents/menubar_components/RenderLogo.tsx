import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../utils/stylingFunctions";

interface RenderLogoProps {
  logo: {
    url?: string;
    text?: string;
  };
}

const RenderLogo: React.FC<RenderLogoProps> = ({ logo }) => {
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);

  const desktopLogoStyle = menubar?.desktop?.logoStyle;
  const mobileLogoStyle = menubar?.mobile?.logoStyle;

  const renderLogoContent = (style: any) => {
    const { // placement = {},
      background,
      text: textStyle,
    } = style || {};

    return (
      <div
        className="flex items-center justify-center"
        style={{
          // position: placement?.isAbsolute ? "absolute" : "static",
          // top: placement?.topMargin,
          ...getBackgroundStyles(background),
          maxHeight: "20vh",
          ...getBorderStyles(background?.border),
        }}
      >
        {logo?.url?.length > 0 ? (
          <img src={logo.url} alt="logo" className="h-full w-auto p-0" />
        ) : (
          <span style={getTextStyles(textStyle)}>
            {logo?.text || "Your Brand"}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden md:flex">
        {renderLogoContent(desktopLogoStyle)}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden">
        {renderLogoContent(mobileLogoStyle)}
      </div>
    </>
  );
};

export default RenderLogo;
