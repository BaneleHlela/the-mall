import express from "express";
import {
  createBooking,
  deleteBooking,
  getStoreBookings,
  getUserBookings,
  updateBookingStatus
} from "../controllers/bookingCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/add', authMiddleware, createBooking);
router.put('/status', authMiddleware, updateBookingStatus);
router.get('/user', authMiddleware, getUserBookings);
router.get('/store/:storeId', authMiddleware, getStoreBookings);
router.delete('/:id', authMiddleware, deleteBooking);

export default router;