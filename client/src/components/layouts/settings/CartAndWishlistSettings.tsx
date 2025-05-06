import React from "react";
import { cartIcons } from "../../../utils/helperArrays";
import BackgroundEditor from "./background/BackgroundEditor";
import DisplayEditor from "./display/DisplayEditor";
import TextEditor from "./text/TextEditor";

interface CartAndWishlistSettingsProps {
  objectPath: string;
  settings: Record<string, any>;
  handleSettingChange: (field: string, value: any) => void;
}

const wishlistIcons = ["GrFavorite", "MdFavorite"];

const CartAndWishlistSettings: React.FC<CartAndWishlistSettingsProps> = ({
  objectPath,
  settings,
  handleSettingChange,
}) => {
  const fullPath = (field: string) => `${objectPath}.cartAndWishlist.${field}`;

  const renderIconSelector = (
    label: string,
    options: string[],
    path: string,
    currentValue: string
  ) => (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <select
        value={currentValue}
        onChange={(e) => handleSettingChange(path, e.target.value)}
        className="w-full border px-3 py-2 rounded"
      >
        {options.map((iconName) => (
          <option key={iconName} value={iconName}>
            {iconName}
          </option>
        ))}
      </select>
    </div>
  );

  const isDisplayed =
    settings?.cartAndWishlist?.isDisplayed;

  const wishlistDisplayed =
    settings?.cartAndWishlist?.wishlistIcon?.isDisplayed;

  return (
    <div className="space-y-6">
      {/* Toggle Display */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isDisplayed}
          onChange={(e) =>
            handleSettingChange(fullPath("isDisplayed"), e.target.checked)
          }
        />
        <label className="font-semibold">Enable Cart & Wishlist</label>
      </div>

      {true && (
        <>
          {/* Display */}
          <div>
            <h3 className="font-bold mb-2">Display</h3>
            <DisplayEditor
              objectPath={fullPath("display")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Background */}
          <div>
            <h3 className="font-bold mb-2">Background</h3>
            <BackgroundEditor
              objectPath={fullPath("background")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="font-bold mb-2">Text</h3>
            <TextEditor
              objectPath={fullPath("text")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Cart Icon */}
          <div>
            <h3 className="font-bold mb-2">Cart Icon</h3>
            {renderIconSelector(
              "Cart Icon",
              cartIcons,
              fullPath("cartIcon.name"),
              settings?.cartAndWishlist?.cartIcon?.name
            )}
            <BackgroundEditor
              objectPath={fullPath("cartIcon.background")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Cart Count */}
          <div>
            <h3 className="font-bold mb-2">Cart Count</h3>
            <TextEditor
              objectPath={fullPath("cartCount.text")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
            <BackgroundEditor
              objectPath={fullPath("cartCount.background")}
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </div>

          {/* Wishlist Icon */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={wishlistDisplayed}
                onChange={(e) =>
                  handleSettingChange(
                    fullPath("wishlistIcon.isDisplayed"),
                    e.target.checked
                  )
                }
              />
              <label className="font-semibold">Enable Wishlist Icon</label>
            </div>

            {true && (
              <>
                {renderIconSelector(
                  "Wishlist Icon",
                  wishlistIcons,
                  fullPath("wishlistIcon.name"),
                  settings?.cartAndWishlist?.wishlistIcon?.name
                )}
                <BackgroundEditor
                  objectPath={fullPath("wishlistIcon.background")}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartAndWishlistSettings;
