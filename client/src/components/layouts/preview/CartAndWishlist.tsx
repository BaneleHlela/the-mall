import React from "react";
import {
  ShoppingBagCartIcon,
  BasicCartIconA,
  BasicCartIconB,
  FilledTrolleyCartIcon,
  HealthCareBasketCartIcon,
  HealthCareCartIcon,
  ShoppingBasketCartIconB,
  ShoppingBasketCartIconC,
  ShoppingBasketCartIconD,
  BasicBagCartIcon,
  StylishBagCartIcon,
  TrolleyCartIconA,
  TrolleyCartIconB,
  TrolleyCartIconC,
  TrolleyCartIconD,
} from "mall-cart-icon";
import { MdFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { getBackgroundStyles, getBorderStyles, getDisplayStyles, getTextStyles } from "../../../utils/stylingFunctions";
import defaultMenubarConfig from "../../../utils/default_layout/defaultMenubarConfig";

const iconMap: Record<string, React.FC<any>> = {
  ShoppingBagCartIcon,
  BasicCartIconA,
  BasicCartIconB,
  FilledTrolleyCartIcon,
  HealthCareBasketCartIcon,
  HealthCareCartIcon,
  ShoppingBasketCartIconB,
  ShoppingBasketCartIconC,
  ShoppingBasketCartIconD,
  BasicBagCartIcon,
  StylishBagCartIcon,
  TrolleyCartIconA,
  TrolleyCartIconB,
  TrolleyCartIconC,
  TrolleyCartIconD,
  MdFavorite,
  GrFavorite,
};

interface CartAndWishlistProps {
  settings: {
    cartAndWishlist: {
      isDisplayed: boolean;
      display: React.CSSProperties;
      background: React.CSSProperties;
      text: React.CSSProperties;
      cartIcon: {
        name: string;
        background: React.CSSProperties;
      };
      cartCount: {
        text: React.CSSProperties;
        background: React.CSSProperties;
      };
      wishlistIcon: {
        isDisplayed: boolean;
        name: string;
        background: React.CSSProperties;
      };
    };
  };
  cartCount: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

const CartAndWishlist: React.FC<CartAndWishlistProps> = ({
  settings,
  cartCount,
  // onCartClick,
  // onWishlistClick,
}) => {
  const cfg = settings?.cartAndWishlist ? settings?.cartAndWishlist : defaultMenubarConfig.desktop.cartAndWishlist;
  console.log(cfg)
  if (!cfg?.isDisplayed) return null;

  const CartIcon = iconMap[cfg.cartIcon.name];
  const WishlistIcon = iconMap[cfg.wishlistIcon.name];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        ...getDisplayStyles(cfg.display),
        ...getBorderStyles(cfg.background.border), 
        ...getBackgroundStyles(cfg.background),
      }}
    >
      {/* Cart */}
      <div
        style={{
          // cursor: onCartClick ? "pointer" : undefined,
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          gap: 4,
        }}
        // onClick={onCartClick}
      >
        <div style={{ ...getBorderStyles(cfg.cartIcon.background.border), ...getBackgroundStyles(cfg.cartIcon.background) }}>
          <CartIcon size={cfg.cartIcon?.text?.fontSize} color={cfg.cartIcon?.text?.color}/>
        </div>
        <div 
          style={{ 
            ...getBorderStyles(cfg.cartCount.background.border), 
            ...getBackgroundStyles(cfg.cartCount.background) 
          }}
          className="flex items-center justify-center"
        >
          <span style={{ ...getTextStyles(cfg.cartCount.text) }}>{cartCount}</span>
        </div>
      </div>

      {/* Wishlist */}
      {cfg.wishlistIcon.isDisplayed && (
        <div
          style={{
            //cursor: onWishlistClick ? "pointer" : undefined,
            display: "flex",
            alignItems: "center",
          }}
          //onClick={onWishlistClick}
        >
          <div style={{ ...getBorderStyles(cfg.wishlistIcon.background.border), ...getBackgroundStyles(cfg.wishlistIcon.background) }}>
            <WishlistIcon size={cfg.wishlistIcon?.text?.fontSize} color={cfg.wishlistIcon?.text?.color}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartAndWishlist;
