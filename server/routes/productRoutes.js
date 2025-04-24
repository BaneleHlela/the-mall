import express from 'express';
import {
    createProduct, deleteProductById,
    getAllProducts,
    getAllProductsPerOwner,
    getAllProductsPerStore,
    getProductById, undeleteProductById, updateProductById,
} from '../controllers/productCtrl.js';
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:storeId/add', authMiddleware, createProduct);
router.get("/myProducts", authMiddleware, getAllProductsPerOwner);
router.get("/:storeId", authMiddleware, /*storeAuthMiddleware,*/ getAllProductsPerStore);
router.get("/productById/:id", authMiddleware, getProductById)
router.get("/", authMiddleware, isAdmin, getAllProducts);
router.patch("/:id", authMiddleware, updateProductById);
router.delete("/:id", authMiddleware, deleteProductById);
router.patch("/undelete/:id", authMiddleware, undeleteProductById);

export default router;
