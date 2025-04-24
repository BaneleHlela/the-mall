import express from "express";
import { createAddress, updateAddressById, deleteAddressById, getAddressByUserId } from "../controllers/addressCtrl.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router=express.Router();



router.post("/add", authMiddleware, createAddress);
router.get("/user/:id", authMiddleware, getAddressByUserId);
router.patch('/:id', authMiddleware, updateAddressById);
router.delete('/:id', authMiddleware, deleteAddressById);

export default router;