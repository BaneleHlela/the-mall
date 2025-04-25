import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../../app/store.ts";
import Logo from "../Logo.tsx";
import DynamicIcon from "../layoutcreator/DynamicIcon.tsx";
import { getBackgroundStyles, getTextStyles } from "../../../utils/stylingFunctions.ts";

interface MobileMenuProps {
  linkItems: string[];
  open: boolean;
  toggleMenu: () => void;
  layout: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ linkItems, open, toggleMenu, layout }) => {
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);
  const logo = useSelector((state: RootState) => state.stores.currentStore.logo);

  const { background } = menubar;
  const { popMenuStyle } = menubar?.mobile || {};
  const { textStyle } = menubar;
  const extras = menubar.mobile.extras || {};
  const { socialIcons, button } = extras;

  return (
    <div
      style={{
        ...getBackgroundStyles(background),
        height: "full",
        width: popMenuStyle?.width,
        ...getTextStyles(textStyle),
        backgroundColor: background?.color,
      }}
      className={`
        ${popMenuStyle?.coverHeader ? "fixed right-0 bottom-0" : "absolute top-full"}
        md:hidden w-screen h-screen transform transition-transform duration-300 ease-in-out 
        ${open ? popMenuStyle?.transitions?.enter : popMenuStyle?.transitions?.exit} 
        ${popMenuStyle?.burstOut ? "opacity-0" : ""} 
        font-bold flex flex-col justify-evenly items-center z-40
      `}
    >
      {/* Logo Section */}
      <div className="flex flex-col gap-2">
        <Logo objectPath="logoStyle" logo={logo} />
      </div>

      {/* Navigation Links */}
      <div>
        {linkItems.map((item, index) => (
          <a key={index} href={`#${item}`} className="flex flex-col" onClick={toggleMenu}>
            {item}
          </a>
        ))}
      </div>

      {/* Button & Social Icons */}
      <div>
        {button?.display ? (
          <a
            href={button.redirectTo || "#"}
            style={{
              ...getBackgroundStyles(button.style?.background),
              ...getTextStyles(button.style?.text),
            }}
          >
            {button.icon?.display ? <DynamicIcon name={button.icon.name} /> : "Button"}
          </a>
        ) : (
          <div
            style={{ ...getBackgroundStyles(socialIcons?.style?.background) }}
            className="flex flex-row"
          >
            {socialIcons?.icons?.map((icon, index) => (
              <a
                key={index}
                href={icon.redirectTo || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...getBackgroundStyles(socialIcons?.style?.single?.background),
                  ...getTextStyles(socialIcons?.style?.text),
                  backgroundColor: "transparent",
                }}
                className="bg-transparent"
              >
                <DynamicIcon name={icon.name} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
