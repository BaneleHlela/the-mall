import expressAsyncHandler from 'express-async-handler';
import { Store } from '../models/storeModel.js';
import bucket from '../config/gcsClient.js';
import { Storage} from "@google-cloud/storage";


const storage = new Storage();
const bucketName = 'banele_first_bucket';

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
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Find the store by ID
  const store = await Store.findById(req.params.storeId);
  if (!store) {
    return res.status(404).json({ message: 'Store not found' });
  }

  // Delete the old logo if it exists
  if (store.logoUrl) {
    const oldFilePath = store.logoUrl.split(`${bucket.name}/`)[1]; // Extract the path after the bucket name
    try {
      await bucket.file(oldFilePath).delete();
      console.log(`Old logo deleted: ${oldFilePath}`);
    } catch (error) {
      console.error(`Error deleting old logo: ${error.message}`);
    }
  }

  // Upload the new logo
  const blob = bucket.file(`logos/${Date.now()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: req.file.mimetype,
  });

  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    store.logo.url = publicUrl;

    // Save the logo URL to the available layouts if any
    /*if (store.layouts && Array.isArray(store.layouts)) {
        store.layouts.forEach(layout => {
            if (layout.menubar && layout.menubar.logo) {
                layout.menubar.logo.url = publicUrl;
            }
        });
        console.log("logo recieved")
    }*/

    await store.save();

    res.status(200).json({ message: 'Logo uploaded successfully', url: publicUrl });
  });


  blobStream.end(req.file.buffer);
});


// Delete store logo
export const deleteStoreLogo = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;

  // Find the store by ID
  const store = await Store.findById(storeId);
  if (!store) {
    return res.status(404).json({ message: 'Store not found' });
  }

  if (store.logo && store.logo.url) {
    // Handle deleting file-based logo (URL)
    const oldFilePath = store.logo.url.split(`${bucket.name}/`)[1]; // Extract the path after the bucket name
    try {
      await bucket.file(oldFilePath).delete();
      console.log(`Old logo deleted: ${oldFilePath}`);
    } catch (error) {
      console.error(`Error deleting old logo: ${error.message}`);
    }
  }

  // Reset the logo (both URL and text cases)
  store.logo = { url: '', text: '' };
  await store.save();

  res.status(200).json({ storeId: store._id });
});






