import { useDispatch, useSelector } from 'react-redux';
import { setPrimaryColor, setSecondaryColor, setAccentColor } from '../../../features/layouts/layoutSettingsSlice.ts';
import { RootState } from '../../../app/store.ts';

const ColorSettings = () => {
  const dispatch = useDispatch();
  const { primaryColor, secondaryColor, textColor, accentColor } = useSelector((state: RootState) => state.layoutSettings);
  console.log(primaryColor)
  const handleColorChange = (colorType: 'primary' | 'secondary' | 'accent', newColor: string) => {
    switch (colorType) {
      case 'primary':
        dispatch(setPrimaryColor(newColor));
        break;
      case 'secondary':
        dispatch(setSecondaryColor(newColor));
        break;
      case 'accent':
        dispatch(setAccentColor(newColor));
        break;
      default:
        console.warn(`Unknown color type: ${colorType}`);
    }
  };

  return (
      <div>
        <div>
          <label>Primary Color:</label>
          <input
              type="color"
              value={primaryColor}
              onChange={(e) => handleColorChange('primary', e.target.value)}
          />
        </div>

        <div>
          <label>Secondary Color:</label>
          <input
              type="color"
              value={secondaryColor}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
          />
        </div>

        <div>
          <label>Text Color:</label>
          <input
              type="color"
              value={textColor}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
          />
        </div>

        <div>
          <label>Accent Color:</label>
          <input
              type="color"
              value={accentColor}
              onChange={(e) => handleColorChange('accent', e.target.value)}
          />
        </div>
      </div>
  );
};

export default ColorSettings;
