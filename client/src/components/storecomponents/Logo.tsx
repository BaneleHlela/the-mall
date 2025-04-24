import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store.ts";
import { getBackgroundStyles, getTextStyles } from "../../utils/stylingFunctions.ts";

interface LogoProps {
  objectPath: string;
  logo: {
    url: string;
    text?: string;
  };
}

const Logo: React.FC<LogoProps> = ({ objectPath, logo }) => {
  const { url, text } = logo;

  const componentData = useSelector((state: RootState) => {
    const pathSegments = objectPath.split(".");
    return pathSegments.reduce((current, segment) => current?.[segment], state.layoutSettings.menubar);
  });


  const { style } = componentData || {};
  const resolvedText = text || "Your Brand"; // Default fallback text

  return (
    <div
      className="flex justify-center p-0 m-0 overflow-hidden"
      style={{
        ...getBackgroundStyles(style?.background),
        maxHeight: "20vh",
      }}
    >
      {url?.length > 0 ? (
        <img src={url} alt="logo" className="h-full w-auto p-0" />
      ) : (
        <span
          style={{
            ...getTextStyles(style?.text),
          }}
        >
          {resolvedText}
        </span>
      )}
    </div>
  );
};

export default Logo;
