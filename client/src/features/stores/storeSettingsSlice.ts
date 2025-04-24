import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from "../../types/storeTypes"; // Adjust this path based on your project structure
import defaultStore from '../../utils/defaults/defaultStoreConfig';


// Define the store state interface
interface StoreSettingsState {
  currentStore: Store;
  isLoading: boolean;
  error: string | null;
}

const initialState: StoreSettingsState = {
  currentStore: defaultStore, // Initialize with the default store
  isLoading: false,
  error: null,
};

// Create the store settings slice
const storeSettingsSlice = createSlice({
  name: 'storeSettings',
  initialState,
  reducers: {
    // Set the initial store configuration
    setInitialStore: (state, action: PayloadAction<Store>) => {
      state.currentStore = action.payload;
    },
    
    // Update a field in the store settings
    updateStoreSetting: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const { field, value } = action.payload;
      const keys = field.split('.'); // Split the field name into nested keys
      let current: any = state.currentStore;

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
      });
    },

    // Start loading state (for async operations like fetching store data)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error message
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setInitialStore, updateStoreSetting, setLoading, setError } = storeSettingsSlice.actions;

export default storeSettingsSlice.reducer;
