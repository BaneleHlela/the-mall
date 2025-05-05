import expressAsyncHandler from 'express-async-handler';
import { Store } from '../models/storeModel.js';
import { Storage} from "@google-cloud/storage";
import { uploadToUploads, uploadsBucket } from '../config/gcsClient.js';


// Add a new store
export const addStore = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const created = new Store({owners: _id, ...req.body});
  await created.save();
  await created.populate("owners")
  res.status(201).json(created);
});

// get store
export const getSingleStore = expressAsyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve store', details: error.message });
  }
});

// Edit store information
export const editStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const store = await Store.findById(storeId);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  if (store.owners.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You are not authorized to edit this store");
  }

  // Update the store with the entire body of the request
  await Store.findByIdAndUpdate(storeId, req.body, { new: true });

  // Find the updated store and populate the layouts field
  const updatedStore = await Store.findById(storeId).populate('layouts');

  res.status(200).json(updatedStore);
});



// Delete a store
export const deleteStore = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  const deletedStore = await Store.findByIdAndDelete(storeId);

  if (deletedStore) {
    res.json({ message: 'Store deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Store not found.' });
  }
});

// Get all stores or filter by type
export const getStores = expressAsyncHandler(async (req, res) => {
  const { type } = req.query;
  //more query settings

  let stores;
  if (type) {
    stores = await Store.find({ type });
  } else {
    stores = await Store.find({});
  }

  res.status(200).json(stores);
});

// Get stores by owners

export const getStoresByOwner = expressAsyncHandler(async (req, res) => {
  // query settings
  const { _id } = req.user;
  const stores = await Store.find({owners: _id});

  res.status(200).json(stores);
});

// link layouts to store
export const linkLayoutToStore = expressAsyncHandler(async (req, res) => {
    const { storeId } = req.params;
    const { layoutId } = req.body;

    const updatedStore = await Store.findByIdAndUpdate(
        storeId,
        { layoutId },
        { new: true }
    );

    if (updatedStore) {
        res.status(200).json(updatedStore);
    } else {
        res.status(404).json({ message: "Store not found" });
    }
});

// Get store with layouts populated
export const getAllStoresWithLayout = expressAsyncHandler(async (req, res) => {
    const stores = await Store.find().populate('layoutId');
    res.status(200).json(stores);
});


// Function to delete an old file in Google Cloud Storage
async function deleteOldLogo(filePath) {
  try {
    await storage.bucket(bucketName).file(filePath).delete();
    console.log(`Old logo deleted: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete old logo: ${error.message}`);
  }
}

// Upload store logo
export const uploadStoreLogo = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;
    const file = req.file;
    const fileName = req.body.fileName || file.originalname;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Delete old logo if it exists
    if (store.logo && store.logo.url) {
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza69/`)[1]; // Adjust to match your new bucket!
      try {
        await uploadsBucket.file(oldFilePath).delete();
        console.log(`Old logo deleted: ${oldFilePath}`);
      } catch (error) {
        console.error(`Error deleting old logo:`, error.message);
      }
    }

    // Upload new logo
    const destination = `stores/${storeId}/logo/${Date.now()}_${fileName}`;
    await uploadToUploads(file.buffer, destination);

    const publicUrl = `https://storage.googleapis.com/the-mall-uploads-giza69/${destination}`;

    // Update store document
    store.logo = { url: publicUrl };
    await store.save();

    res.status(200).json({ message: "Logo uploaded successfully", url: publicUrl });
  } catch (error) {
    console.error("Upload logo error:", error);
    res.status(500).json({ message: "Failed to upload logo" });
  }
});




// Delete store logo
export const deleteStoreLogo = expressAsyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;

    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    if (store.logo && store.logo.url) {
      const oldFilePath = store.logo.url.split(`the-mall-uploads-giza69/`)[1]; // Important: split correctly
      try {
        await uploadsBucket.file(oldFilePath).delete();
        console.log(`Old logo deleted: ${oldFilePath}`);
      } catch (error) {
        console.error(`Error deleting logo:`, error.message);
      }
    }

    // Clear logo fields
    store.logo = { url: "" };
    await store.save();

    res.status(200).json({ message: "Logo deleted successfully", storeId: store._id });
  } catch (error) {
    console.error("Delete logo error:", error);
    res.status(500).json({ message: "Failed to delete logo" });
  }
});






