import React, { useState } from 'react';
import GoogleFontsSelector from './layoutcreator/components/GoogleFontsSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ScribblerComponent = () => {
  const [selectedFont, setSelectedFont] = useState<string>('');
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar)
  console.log(menubar)
  return (
    <div style={{ fontFamily: menubar?.textStyle?.fontFamily }}>
      <GoogleFontsSelector onFontSelect={setSelectedFont} />
      <h1>Hello World</h1>
      <p>This is a sample paragraph.</p>
    </div>
  );
};

export default ScribblerComponent;
