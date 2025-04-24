import {addReview, deleteReview, editReview, getStoreReviews, getUserReviews, getProductReviews} from "../controllers/reviewCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/product/:productId", authMiddleware, getProductReviews);
router.post('/add', authMiddleware, addReview);
router.get('/:storeId', authMiddleware, isAdmin, getStoreReviews);
router.put('/:reviewId', authMiddleware, editReview);
router.delete('/:reviewId', authMiddleware, deleteReview);
router.get('/user/:userId', authMiddleware, getUserReviews);


export default router;