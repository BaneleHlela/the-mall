import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Layout, LayoutState } from "../../types/layoutTypes";
import { deleteLayout, fetchLayout, saveLayout, updateLayout, uploadLayoutImage } from "../../services/layoutAPI";
import {RootState} from "../../app/store.ts";

const initialState: LayoutState = {
    activeLayout: null,
    layouts: [],
    status: "idle",
    error: null,
};

// Async thunks for layout actions
export const getLayout = createAsyncThunk('layouts/getLayout', async (layoutId: string) => {
    return await fetchLayout(layoutId);
});

export const createLayout = createAsyncThunk('layouts/createLayout', async (layoutConfig: Layout) => {
    return await saveLayout(layoutConfig);
});

export const editLayout = createAsyncThunk('layouts/editLayout', async ({ layoutId, layoutConfig }: { layoutId: string; layoutConfig: Layout }) => {
    return await updateLayout(layoutId, layoutConfig);
});

export const removeLayout = createAsyncThunk('layouts/removeLayout', async (layoutId: string) => {
    await deleteLayout(layoutId);
    return layoutId; // Return the ID for deletion
});

// New thunk for uploading image
export const uploadLayoutImageThunk = createAsyncThunk(
    'layouts/uploadLayoutImage',
    async ({ layoutId, file, fileName }: { layoutId: string; file: File; fileName?: string }) => {
      return await uploadLayoutImage(layoutId, file, fileName);
    }
);  

// Update layout with image, using the response from the backend
export const updateLayoutWithImage = createAsyncThunk(
  "layouts/updateLayoutWithImage",
  async ({
    layoutId,
    objectPath,
    file,
    fileName,
  }: {
    layoutId: string;
    objectPath: string;
    file: File;
    fileName?: string;
  }) => {
    const response = await uploadLayoutImage(layoutId, file, fileName); // correct now ✅
    return {
      objectPath,                // where to store in Redux
      fileUrl: response.url,     // new image URL
    };
  }
);

  

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
    setLayout(state, action: PayloadAction<Layout>) {
      state.activeLayout = action.payload;
    },
    clearLayout(state) {
      state.activeLayout = null;
    },
  },
    extraReducers: (builder) => {
        builder
            // Get layout
            .addCase(getLayout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.status = "succeeded";
                state.activeLayout = action.payload;
            })
            .addCase(getLayout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to load layout";
            })
            // Create layout
            .addCase(createLayout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.status = "succeeded";
                state.layouts.push(action.payload); // Add the new layout to the array
                state.activeLayout = action.payload; // Optionally set as active layout
            })
            .addCase(createLayout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to create layout";
            })
            // Edit layout
            .addCase(editLayout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.status = "succeeded";
                const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
                if (index >= 0) {
                    state.layouts[index] = action.payload; // Update the existing layout in the array
                }
                state.activeLayout = action.payload; // Optionally set the updated layout as active
            })
            .addCase(editLayout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to update layout";
            })
            // Remove layout
            .addCase(removeLayout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeLayout.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.layouts = state.layouts.filter(layout => layout._id !== action.payload); // Remove layout from array
            })
            .addCase(removeLayout.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to delete layout";
            })
            // Upload Layout Image
            .addCase(uploadLayoutImageThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(uploadLayoutImageThunk.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.status = "succeeded";
                const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
                if (index >= 0) {
                state.layouts[index] = action.payload; // update the layout with the new image
                }
                if (state.activeLayout?._id === action.payload._id) {
                state.activeLayout = action.payload; // also update activeLayout if it's the same
                }
            })
            .addCase(uploadLayoutImageThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to upload image";
            })
            .addCase(updateLayoutWithImage.fulfilled, (state, action) => {
                const { objectPath, fileUrl } = action.payload;
                
                // Assuming the objectPath is like "pages.welcome.mobile.divs.0.images.0"
                const pathArray = objectPath.split('.'); // ["pages", "welcome", "mobile", "divs", "0", "images", "0"]
                let target = state; // Start at the root state object
              
                // Traverse the state object according to the pathArray
                for (let i = 0; i < pathArray.length - 1; i++) {
                  target = target[pathArray[i]]; // Traverse each level
                }
              
                const lastKey = pathArray[pathArray.length - 1]; // The final key is '0' for the image
                target[lastKey] = fileUrl; // Update the final target (image URL)
              
                // Optionally: If needed, update the activeLayout with the new layout (if it's affected)
                if (state.activeLayout) {
                  state.activeLayout = { ...state.activeLayout }; // Force re-render by copying the activeLayout
                }
              });               
    },
});

export const { setLayout, clearLayout } = layoutSlice.actions;

export const selectActiveLayout = (state: RootState) => state.layout.activeLayout;
export const selectLayoutStatus = (state: RootState) => state.layout.status;

export default layoutSlice.reducer;
