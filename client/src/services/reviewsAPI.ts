import axios from 'axios';
import { Review } from '../types/reviewTypes';

const API_URL = 'http://localhost:5000/api/reviews'; // Adjust this to your actual API endpoint

const reviewService = {
  // Get reviews for a specific product
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  },

  // Add a new review
  addReview: async (reviewData: Omit<Review, 'id'>): Promise<Review> => {
    const response = await axios.post(`${API_URL}/add`, reviewData);
    return response.data;
  },

  // Edit an existing review
  editReview: async (reviewId: string, updatedReview: Omit<Review, 'id'>): Promise<Review> => {
    const response = await axios.put(`${API_URL}/${reviewId}`, updatedReview);
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId: string): Promise<string> => {
    const response = await axios.delete(`${API_URL}/${reviewId}`);
    return response.data;
  },

  // Get all reviews for a store
  getStoreReviews: async (storeId: string): Promise<Review[]> => {
    const response = await axios.get(`${API_URL}/${storeId}`);
    return response.data;
  },

  // Get all reviews for a user
  getUserReviews: async (userId: string): Promise<Review[]> => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },
};

export default reviewService;
