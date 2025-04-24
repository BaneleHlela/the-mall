import express from "express";
import { addItemToCart, removeCartItem, updateCartItem, getCartItems } from "../controllers/cartCtrl.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:storeId/addItem", authMiddleware, addItemToCart);
router.delete("/removeItem/:productId", authMiddleware, removeCartItem);
router.put("/updateItem", authMiddleware, updateCartItem);
router.get('/', authMiddleware, getCartItems);
export default router;