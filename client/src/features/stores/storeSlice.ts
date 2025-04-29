import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Store, StoreState } from '../../types/storeTypes';
import storeService from '../../services/storeAPI';
import defaultStore from '../../utils/defaults/defaultStoreConfig';

// Initial state for store settings
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

// --- Existing Thunks ---
export const addStore = createAsyncThunk<Store, Omit<Store, 'id'>>(
  'stores/addStore',
  async (storeData) => await storeService.addStore(storeData)
);

export const editStore = createAsyncThunk<Store, { storeId: string; updatedStore: Omit<Store, 'id'> }>(
  'stores/editStore',
  async ({ storeId, updatedStore }) => await storeService.editStore(storeId, updatedStore)
);

export const deleteStore = createAsyncThunk<string, string>(
  'stores/deleteStore',
  async (storeId) => await storeService.deleteStore(storeId)
);

export const fetchStores = createAsyncThunk<Store[], void>(
  'stores/fetchStores',
  async () => await storeService.getStores()
);

export const fetchStoresByOwner = createAsyncThunk<Store[], string>(
  'stores/fetchStoresByOwner',
  async (ownerId) => await storeService.getStoresByOwner(ownerId)
);

export const fetchStoreById = createAsyncThunk<Store, string>(
  'store/fetchStoreById',
  async (storeId, thunkAPI) => {
    try {
      const response = await storeService.getStoreById(storeId);
      return response;
    } catch (error) {
      console.error("Error fetching store:", error);
      // Propagate error to the slice
      return thunkAPI.rejectWithValue('Failed to fetch store');
    }
  }
);


// --- Upload Store Logo ---
export const uploadStoreLogo = createAsyncThunk<string, { storeId: string; logoFile: File }>(
  'stores/uploadStoreLogo',
  async ({ storeId, logoFile }) => await storeService.uploadStoreLogo(storeId, logoFile)
);

// --- Delete Store Logo ---
export const deleteStoreLogo = createAsyncThunk<string, { storeId: string }>(
  'stores/deleteStoreLogo',
  async ({ storeId }) => {
    return await storeService.deleteStoreLogo(storeId);
  }
);

// --- Slice ---
const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
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
  },
  extraReducers: (builder) => {
    builder
      // Add Store
      .addCase(addStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.stores.push(action.payload);
      })
      // Edit Store
      .addCase(editStore.fulfilled, (state, action: PayloadAction<Store>) => {
        const index = state.stores.findIndex((store) => store.id === action.payload.id);
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      // Delete Store
      .addCase(deleteStore.fulfilled, (state, action: PayloadAction<string>) => {
        state.stores = state.stores.filter((store) => store.id !== action.payload);
      })
      // Fetch Stores
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action: PayloadAction<Store[]>) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores';
      })
      // Fetch Stores by Owner
      .addCase(fetchStoresByOwner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoresByOwner.fulfilled, (state, action: PayloadAction<Store[]>) => {
        state.isLoading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStoresByOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores by owner';
      })
      // Fetch Single Store
      .addCase(fetchStoreById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action: PayloadAction<Store>) => {
        state.isLoading = false;
        state.currentStore = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch store';
      })      
      // Upload Store Logo
      .addCase(uploadStoreLogo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadStoreLogo.fulfilled, (state, action: PayloadAction<string, string, { arg: { storeId: string } }>) => {
        state.isLoading = false;
        const logoUrl = action.payload;
        const storeId = action.meta.arg.storeId;
        const store = state.stores.find((s) => s._id === storeId);
        if (store) {
          store.logo.url = logoUrl;
        }
        if (state.currentStore?._id === storeId) {
          state.currentStore.logo.url= logoUrl;
        }
      })
      .addCase(uploadStoreLogo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to upload store logo';
      })
      // Delete Store Logo
      .addCase(deleteStoreLogo.fulfilled, (state, action: PayloadAction<string>) => {
        const storeId = action.payload;
        const store = state.stores.find((s) => s.id === storeId);
        if (store && store.logo) {
          store.logo.url = '';
        }
        if (state.currentStore?.id === storeId && state.currentStore.logo) {
          state.currentStore.logo.url = '';
        }
      })
      .addCase(deleteStoreLogo.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete store logo';
      });
  },
});

export const { setLoading, setError, updateStoreSetting } = storeSlice.actions;

export default storeSlice.reducer;
