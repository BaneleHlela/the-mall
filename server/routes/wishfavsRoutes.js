import express from "express";
import {addToWishFavs, getUserWishFavs, removeFromWishFavs} from "../controllers/wishfavsCtrl.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware,addToWishFavs);
router.get("/get", authMiddleware, getUserWishFavs);
router.delete("/:wishFavId", authMiddleware, removeFromWishFavs);


export default router;