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
    file,
    fileName,
    objectPath, // Add it here too
}: {
    layoutId: string;
    file: File;
    fileName?: string;
    objectPath: string; // Make sure this is passed
}) => {
    const response = await uploadLayoutImage(layoutId, file, fileName);
    return {
    fileUrl: response.url,
    objectPath, // ✅ Return objectPath too
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
            // Update layout with image (pending, fulfilled, rejected)
            .addCase(updateLayoutWithImage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateLayoutWithImage.fulfilled, (state, action) => {
                const { objectPath, fileUrl } = action.payload;
                const keys = objectPath.split('.');
                let current: any = state;

                keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    current[key] = fileUrl; // Set the image URL at the final key
                } else {
                    if (!current[key]) {
                    const nextKey = keys[index + 1];
                    current[key] = isNaN(Number(nextKey)) ? {} : [];
                    }
                    current = current[key];
                }
                });

                // Optional: refresh state
                if (state.activeLayout) {
                state.activeLayout = { ...state.activeLayout };
                }

                state.status = "succeeded";
            })
            .addCase(updateLayoutWithImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to update layout with image";
            });
                        
    },
});

export const { setLayout, clearLayout } = layoutSlice.actions;

export const selectActiveLayout = (state: RootState) => state.layout.activeLayout;
export const selectLayoutStatus = (state: RootState) => state.layout.status;

export default layoutSlice.reducer;
