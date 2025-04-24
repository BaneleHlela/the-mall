import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Layout, LayoutState } from "../../types/layoutTypes";
import { deleteLayout, fetchLayout, saveLayout, updateLayout } from "../../services/layoutAPI";
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
    },
});

export const { setLayout, clearLayout } = layoutSlice.actions;

export const selectActiveLayout = (state: RootState) => state.layout.activeLayout;
export const selectLayoutStatus = (state: RootState) => state.layout.status;

export default layoutSlice.reducer;
