import React, { useEffect, useState } from 'react';
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../utils/stylingFunctions.ts";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import RenderLogo from "./menubar_components/RenderLogo.tsx";
import RenderLinks from "./menubar_components/RenderLinks.tsx";
import RenderExtras from "./menubar_components/RenderExtras.tsx";
import MobileMenu from "./menubar_components/RenderMobileMenu.tsx";

interface MenubarProps {
  layoutId?: string;
}

const Menubar: React.FC<MenubarProps> = ({ layoutSettingsFrom }) => {
  const dispatch = useDispatch();
  const menubar = layoutSettingsFrom ? layoutSettingsFrom : useSelector((state: RootState) => state.layoutSettings.menubar);
  const currentStore = useSelector((state: RootState) => state.stores.currentStore);
  const [linkItems, setLinkItems] = useState<string[]>(["Home", "About", "Services", "Products"]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => setOpen(prev => !prev);

  const renderComponent = (type: string, index: number) => {
    switch (type) {
      case 'logo':
        return (
          <div key={`logo-${index}`}>
            <RenderLogo logo={currentStore?.logo} />
          </div>
        );
      case 'links':
        return (
          <div key={`links-${index}`} className='md:hidden'>
            <RenderLinks
              menubar={menubar}
              linkItems={linkItems}
              open={open}
              toggleMenu={toggleMenu}
            />
          </div>
        );
      case 'extras':
        return (
          <div key={`extras-${index}`}>
            <RenderExtras
              open={open}
              toggleMenu={toggleMenu}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <nav
      style={{
        ...getTextStyles(menubar?.textStyle),
        ...getBackgroundStyles(menubar?.background),
        ...getBorderStyles(menubar?.background?.border),
      }}
      className={`flex ${menubar?.isSticky ? 'sticky' : 'relative'} 
      items-center justify-between z-50 max-w-[100vw]`}
    >
      
      {menubar?.layoutStyle?.map((item: any, index: number) => renderComponent(item, index))}
      <MobileMenu 
        open={open} toggleMenu={toggleMenu} 
        linkItems={linkItems} layout={menubar} 
        key="MobileMenu"
        />
    </nav>
  );
};

export default Menubar;
