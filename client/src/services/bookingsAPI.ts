import axios from 'axios';
import { Booking } from '../types/bookingTypes';

const API_URL = 'http://localhost:5000/api/bookings';

const bookingService = {
  // Fetch all bookings for a specific store
  getBookings: async (storeId: string): Promise<Booking[]> => {
    const response = await axios.get(`${API_URL}/store/${storeId}`);
    return response.data;
  },

  // Add a new booking
  addBooking: async (bookingData: Omit<Booking, 'id'>): Promise<Booking> => {
    const response = await axios.post(`${API_URL}/add`, bookingData);
    return response.data;
  },

  // Update an existing booking status
  updateBooking: async (bookingData: Booking): Promise<Booking> => {
    const response = await axios.put(`${API_URL}/status`, bookingData); // can find id from bookingData.id
    return response.data;
  },

  // Delete a booking by ID
  deleteBooking: async (bookingId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${bookingId}`);
  },

  // Fetch all bookings for the authenticated user
  fetchUserBookings: async (): Promise<Booking[]> => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  },
};

export default bookingService;
