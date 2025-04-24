import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menubar } from "../../types/layoutTypes"; // Update the path as necessary
import defaultMenubarConfig from "../../utils/default_layout/defaultMenubarConfig.ts";
import defaultLayoutConfig from '../../utils/default_layout/defaultLayoutConfig.ts';

interface LayoutSettingsState {
  menubar: Menubar;
}

//const layout: Menubar = useSelector((state: RootState) => state.layoutSettings.menubar);

const initialState: LayoutSettingsState = {
  ...defaultLayoutConfig
};

const layoutSettingsSlice = createSlice({
  name: 'layoutSettings',
  initialState,
  reducers: {
    setInitialLayout: (state, action: PayloadAction<Menubar>) => {
      return action.payload;
    },
    updateSetting: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const {field, value} = action.payload;
      const keys = field.split('.');
      let current: any = state;

      // Traverse and create missing objects
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          // Update the value on the last key
          current[key] = value;
        } else {
          // Ensure the current key is an object
          current[key] = current[key] || {};
          current = current[key];
        }
      })
    }
  },
});

export const { updateSetting, setInitialLayout } = layoutSettingsSlice.actions;
export default layoutSettingsSlice.reducer;
