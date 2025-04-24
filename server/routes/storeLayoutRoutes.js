import express from 'express';
import {
    getLayoutConfig,
    deleteLayoutConfig,
    createLayoutConfig,
    updateLayoutConfig,
} from '../controllers/storeLayoutCtrl.js';
import {isAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', /*isAdmin,*/ createLayoutConfig);
router.patch('/:layoutId', /*isAdmin,*/ updateLayoutConfig);
router.put('/:layoutId', /*isAdmin,*/ updateLayoutConfig);
router.get('/:layoutId', getLayoutConfig);
router.delete('/:layoutId', deleteLayoutConfig);


export default router;
