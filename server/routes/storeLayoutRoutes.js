import express from 'express';
import {
    getLayoutConfig,
    deleteLayoutConfig,
    createLayoutConfig,
    updateLayoutConfig,
    uploadLayoutImage
} from '../controllers/storeLayoutCtrl.js';
import { uploadSingleFile } from '../middlewares/uploadMiddleware.js';
import {isAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', /*isAdmin,*/ createLayoutConfig);
router.patch('/:layoutId', /*isAdmin,*/ updateLayoutConfig);
router.put('/:layoutId', /*isAdmin,*/ updateLayoutConfig);
router.get('/:layoutId', getLayoutConfig);
router.delete('/:layoutId', deleteLayoutConfig);
router.post('/upload/:layoutId', uploadSingleFile('file'), uploadLayoutImage);


export default router;
