import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useDevice } from '../../context/DeviceContext';
import { useRenderContext } from '../../context/RenderContext';
import { getBackgroundStyles, getBorderStyles, getTextStyles } from '../../../utils/stylingFunctions';

interface RenderLinksProps {
  linkItems: string[];
}

const RenderLinks: React.FC<RenderLinksProps> = ({ linkItems }) => {
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar);
  const { device } = useDevice();
  const renderContext = useRenderContext();

  const desktop = menubar.desktop;
  const tablet = menubar.tablet;
  const [showMore, setShowMore] = useState(false);

  const renderLink = (
    link: string,
    index: number,
    textStyle: any,
    linksStyle: any
  ) => {
    const specialLink = linksStyle?.links?.special?.[index];
    const defaultBg = getBackgroundStyles(linksStyle?.links?.all?.background);
    const specialBg = specialLink?.background ? getBackgroundStyles(specialLink.background) : {};
    const text = specialLink?.text ? getTextStyles(specialLink.text) : getTextStyles(textStyle);

    return (
      <li
        key={index}
        className="flex items-center justify-center text-center"
        style={specialLink ? specialBg : defaultBg}
      >
        <a href={`#${link}`} style={text} className='hover:bg-gray-200 hover:rounded-md transition'>
          {link}
        </a>
      </li>
    );
  };

  if (renderContext === 'websitePreview') {
    if (device === 'desktop') {
      return (
        <ul
          className="flex items-center space-x-4"
          style={{
            ...getBackgroundStyles(desktop?.linksStyle?.background),
            ...getBorderStyles(desktop?.linksStyle?.background?.border),
          }}
        >
          {linkItems.map((link, index) =>
            renderLink(link, index, menubar?.textStyle, desktop?.linksStyle)
          )}
        </ul>
      );
    }

    if (device === 'tablet') {
      return (
        <ul
          className="flex items-center space-x-4 relative"
          style={{
            ...getBackgroundStyles(tablet?.linksStyle?.background),
            ...getBorderStyles(tablet?.linksStyle?.background?.border),
          }}
        >
          {linkItems.slice(0, 3).map((link, index) =>
            renderLink(link, index, menubar?.textStyle, tablet?.linksStyle)
          )}
          {linkItems.length > 3 && (
            <li className="relative">
              <button
                onClick={() => setShowMore(prev => !prev)}
                style={getTextStyles(tablet?.textStyle)}
              >
                More
              </button>
              {showMore && (
                <ul className="absolute right-0 mt-2 bg-white shadow-md rounded z-10 p-2 space-y-2"
                    style={getBackgroundStyles(tablet?.linksStyle?.background)}>
                  {linkItems.slice(3).map((link, index) =>
                    renderLink(link, index + 3, tablet?.textStyle, tablet?.linksStyle)
                  )}
                </ul>
              )}
            </li>
          )}
        </ul>
      );
    }

    return null; // mobile
  }
  

  // "live" mode (normal Tailwind responsive classes)
  return (
    <>
      <ul
        className="hidden lg:flex items-center space-x-4"
        style={{
          ...getBackgroundStyles(desktop?.linksStyle?.background),
          ...getBorderStyles(desktop?.linksStyle?.background?.border),
        }}
      >
        {linkItems.map((link, index) =>
          renderLink(link, index, menubar?.textStyle, desktop?.linksStyle)
        )}
      </ul>

      <ul
        className="hidden md:flex lg:hidden items-center space-x-4 relative"
        style={{
          ...getBackgroundStyles(tablet?.linksStyle?.background),
          ...getBorderStyles(tablet?.linksStyle?.background?.border),
        }}
      >
        {linkItems.slice(0, 3).map((link, index) =>
          renderLink(link, index, menubar?.textStyle, tablet?.linksStyle)
        )}
        {linkItems.length > 3 && (
          <li className="relative">
            <button
              onClick={() => setShowMore(prev => !prev)}
              style={getTextStyles(tablet?.textStyle)}
            >
              More
            </button>
            {showMore && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded z-10 p-2 space-y-2"
                  style={getBackgroundStyles(tablet?.linksStyle?.background)}>
                {linkItems.slice(3).map((link, index) =>
                  renderLink(link, index + 3, tablet?.textStyle, tablet?.linksStyle)
                )}
              </ul>
            )}
          </li>
        )}
      </ul>
    </>
  );
};

export default RenderLinks;
