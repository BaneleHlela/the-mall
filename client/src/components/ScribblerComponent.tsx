import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import GoogleFontsSelector from "./layouts/settings/GoogleFontsSelector.tsx";
import CartAndWishlist from './layouts/preview/CartAndWishlist.tsx';
import { ShoppingBagCartIcon } from 'mall-cart-icon';
const ScribblerComponent = () => {
  const [selectedFont, setSelectedFont] = useState<string>('');
  const menubar = useSelector((state: RootState) => state.layoutSettings.menubar)


  return (
    <div style={{ fontFamily: menubar?.textStyle?.fontFamily }}>
      <GoogleFontsSelector onFontSelect={setSelectedFont} />
      <h1>Hello World</h1>
      <p>This is a sample paragraph.</p>
      <CartAndWishlist settings={menubar?.mobile} cartCount={7}/>

    </div>
  );
};

export default ScribblerComponent;
