import Booking from '../models/bookingModel.js';
import expressAsyncHandler from 'express-async-handler';

// Create a new booking
export const createBooking = expressAsyncHandler(async (req, res) => {
  const { storeId, service, date, time, notes } = req.body;
  const userId = req.user._id;

  const newBooking = new Booking({
    user: userId,
    store: storeId,
    service,
    date,
    time,
    notes,
  });

  const savedBooking = await newBooking.save();
  res.status(201).json(savedBooking);
});

// Update booking status (confirm/cancel)
export const updateBookingStatus = expressAsyncHandler(async (req, res) => {
  const { bookingId, status } = req.body;

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true }
  );

  if (!updatedBooking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.json(updatedBooking);
});

// Get all bookings for a user
export const getUserBookings = expressAsyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('store');
  res.json(bookings);
});

// Get all bookings for a store
export const getStoreBookings = expressAsyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const bookings = await Booking.find({ store: storeId }).populate('user');
  res.json(bookings);
});

// Delete a booking by ID
export const deleteBooking = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findOneAndDelete({
    _id: id,
    $or: [{ user: req.user._id }, { 'user.isAdmin': true }],
  });

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found or user not authorized');
  }

  res.json({ message: 'Booking deleted successfully' });
});
