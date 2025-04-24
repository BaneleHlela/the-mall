import Layout from '../models/storeLayout/storeLayout.js';
import expressAsyncHandler from 'express-async-handler';

// create a new layouts configuration
export const createLayoutConfig = async (req, res) => {
  try {
    const layout = await Layout.create(req.body);
    res.status(201).json(layout);
  } catch (error) {
    console.error("Error creating layout:", error);
    res.status(500).json({ message: "Failed to create layout" });
  }
};


// Fetch Layout Configuration
export const getLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;  // Assume you're passing layoutId instead of storeId

    const layout = await Layout.findById(layoutId);  // Use findById to get the layouts

    if (!layout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json(layout);
});

// Function to update an existing layouts configuration
export const updateLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;
    const  layoutConfig  = req.body;

    // Update the layouts in the Layouts collection
    const updatedLayout = await Layout.findByIdAndUpdate(
        layoutId,
        { $set: layoutConfig },
        { new: true } // Return the updated document
    );

    if (!updatedLayout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json({
        message: "Layout updated successfully.",
        layout: updatedLayout,
    });
});


// Delete Layout Configuration
export const deleteLayoutConfig = expressAsyncHandler(async (req, res) => {
    const { layoutId } = req.params;  // Assume you're passing layoutId instead of storeId

    const deletedLayout = await Layout.findByIdAndDelete(layoutId);  // Use findByIdAndDelete to remove the layouts

    if (!deletedLayout) {
        res.status(404);
        throw new Error("Layout configuration not found.");
    }

    res.json({ message: "Layout configuration deleted successfully." });
});

