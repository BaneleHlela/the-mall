import React from "react";
import { getBackgroundStyles, getTextStyles } from "../../../utils/stylingFunctions.ts";
import { Squash, Squeeze, Sling, Rotate } from "hamburger-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store.ts";
import DynamicIcon from "../../layoutcreator/components/DynamicIcon.tsx";
import { getAnimationClass } from "../../../utils/helperFunctions.ts";

interface RenderExtrasProps {
  layout: any;
  open: boolean;
  toggleMenu: () => void;
}



const RenderExtras: React.FC<RenderExtrasProps> = ({ open, toggleMenu }) => {
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);

  const desktopExtras = menubar?.desktop?.extras || {};
  const mobileExtras = menubar?.mobile?.extras || {};
  const hamburger = menubar?.mobile?.hamburger;

  const { socialIcons, button, extraIcons } = desktopExtras;
  const { extraIcons: mobileExtraIcons } = mobileExtras;

  return (
    <>
      {/* Desktop & Tablet */}
      <div className="hidden md:flex h-full items-center gap-2">
        {/* Button */}
        {button?.display && (
          <a
            href={button.redirectTo || "#"}
            style={{
              ...getBackgroundStyles(button?.style?.background),
              ...getTextStyles(button?.style?.text),
            }}
            className={`px-4 py-2 rounded-md ${getAnimationClass(button?.style)}`}
          >
            {button.icon?.display ? (
              <span className="flex items-center gap-1">
                <DynamicIcon name={button.icon?.name} />
              </span>
            ) : (
              "Button"
            )}
          </a>
        )}

        {/* Social Icons */}
        {socialIcons?.icons?.length > 0 && (
          <div
            className={`flex gap-2 ${getAnimationClass(socialIcons?.style)}`}
            style={{
              ...getBackgroundStyles(socialIcons?.style?.background),
            }}
          >
            {socialIcons.icons.map((icon, index) => (
              <a
                key={index}
                href={icon.redirectTo || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...getBackgroundStyles(socialIcons?.style?.single?.background),
                  ...getTextStyles(socialIcons?.style?.text),
                }}
                className="p-2 rounded-full"
              >
                <DynamicIcon name={icon.name} />
              </a>
            ))}
          </div>
        )}

        {/* Extra Icons */}
        {extraIcons?.enabled && extraIcons.icons?.length > 0 && (
          <div className={`flex gap-2 ${getAnimationClass(extraIcons?.style)}`}>
            {extraIcons.icons.map((icon, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center p-2 rounded-full"
                style={{
                  ...getBackgroundStyles(extraIcons?.style?.background),
                  ...getTextStyles(extraIcons?.style?.text),
                }}
              >
                <a href={icon.redirectTo || "#"} target="_blank" rel="noopener noreferrer">
                  <DynamicIcon name={icon.name} />
                </a>
                {extraIcons.count && extraIcons.count > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                    {extraIcons.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center">
        {/* Mobile Extra Icons */}
        {mobileExtraIcons?.enabled && mobileExtraIcons.icons?.length > 0 && (
          <div className={`flex gap-2 items-center ${getAnimationClass(mobileExtraIcons?.style)}`}>
            {mobileExtraIcons.icons.map((icon, index) => (
              <div
                key={index}
                className="relative p-2 rounded-full flex items-center justify-center"
                style={{
                  ...getBackgroundStyles(mobileExtraIcons?.style?.background),
                  ...getTextStyles(mobileExtraIcons?.style?.text),
                }}
              >
                <a href={icon.redirectTo || "#"} target="_blank" rel="noopener noreferrer">
                  <DynamicIcon name={icon.name} />
                </a>
                {mobileExtraIcons.count && mobileExtraIcons.count > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                    {mobileExtraIcons.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hamburger Menu */}
        {hamburger?.Type && (
          <div
            className="flex items-center z-50"
            style={{
              border: "none",
              ...getBackgroundStyles(hamburger?.hamburgerStyle?.background),
              ...getTextStyles(hamburger?.hamburgerStyle?.text),
            }}
          >
            {hamburger.Type === "squash" && (
              <Squash
                toggled={open}
                toggle={toggleMenu}
                size={Number(hamburger?.hamburgerStyle?.text?.fontSize) || 20}
              />
            )}
            {hamburger.Type === "squeeze" && (
              <Squeeze
                toggled={open}
                toggle={toggleMenu}
                size={Number(hamburger?.hamburgerStyle?.text?.fontSize) || 20}
              />
            )}
            {hamburger.Type === "sling" && (
              <Sling
                toggled={open}
                toggle={toggleMenu}
                size={Number(hamburger?.hamburgerStyle?.text?.fontSize) || 20}
              />
            )}
            {hamburger.Type === "rotate" && (
              <Rotate
                toggled={open}
                toggle={toggleMenu}
                size={Number(hamburger?.hamburgerStyle?.text?.fontSize) || 20}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RenderExtras;
