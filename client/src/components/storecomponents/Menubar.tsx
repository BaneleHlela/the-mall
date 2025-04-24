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

const Menubar: React.FC<MenubarProps> = () => {
  const dispatch = useDispatch();
  const layout = useSelector((state: RootState) => state.layoutSettings.menubar);
  const currentStore = useSelector((state: RootState) => state.stores.currentStore);
  const [linkItems, setLinkItems] = useState<string[]>(["Home", "About", "Services", "Products"]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => setOpen(prev => !prev);

  const renderComponent = (type: string) => {
    switch (type) {
      case 'logo':
        return <div>
          <RenderLogo key="logo" logo={currentStore?.logo} />
        </div>;
      case 'links':
        return (
          <div className='md:hidden'>
            <RenderLinks
              key="links"
              menubar={layout}
              linkItems={linkItems}
              open={open}
              toggleMenu={toggleMenu}
            />
          </div>
        );
      case 'extras':
        return (
          <div>
            <RenderExtras
              key="extras"
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
        ...getTextStyles(layout?.textStyle),
        ...getBackgroundStyles(layout?.background),
        ...getBorderStyles(layout?.background?.border),
      }}
      className={`flex ${layout?.isSticky ? 'sticky top-0' : 'relative'} 
      items-center justify-between z-50`}
    >
      {layout?.layoutStyle?.map((item) => renderComponent(item))}
      <MobileMenu open={open} toggleMenu={toggleMenu} linkItems={linkItems} layout={layout} />
    </nav>
  );
};

export default Menubar;
