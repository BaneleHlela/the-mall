import express from 'express';
import {
  addStore,
  editStore,
  deleteStore,
  getStores,
  getStoresByOwner,
  uploadStoreLogo, 
  getSingleStore,
  deleteStoreLogo
} from '../controllers/storeCtrl.js';
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js';
import { uploadSingleFile } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addStore);
router.put('/edit/:storeId', authMiddleware, editStore);
router.patch('/edit/:storeId', authMiddleware, editStore);
router.delete('/delete/:storeId', authMiddleware, deleteStore);
router.get('/', authMiddleware, isAdmin, getStores);
router.get("/myStores", authMiddleware, getStoresByOwner);
router.get("/:storeId", getSingleStore);
router.put("/:storeId/logo",uploadSingleFile("logo"), uploadStoreLogo);
router.delete('/:storeId/logo', deleteStoreLogo);


export default router;
