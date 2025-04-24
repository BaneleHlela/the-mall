// services/userAPI.ts

import axios from 'axios';
import { User } from '../types/userTypes';

const API_URL = '/api/users'; // Adjust according to your server setup

const userService = {
  createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },
  loginUser: async (credentials: { email: string; password: string }) => {
    const response = await axios.get(`${API_URL}/login`, { params: credentials });
    return response.data;
  },
  handleRefreshToken: async () => {
    const response = await axios.get(`${API_URL}/refresh`);
    return response.data;
  },
  fetchAllUsers: async () => {
    const response = await axios.get(`${API_URL}/all-users`);
    return response.data;
  },
  getAUser: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  deleteAUser: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
  updateUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.put(`${API_URL}/edit-user`, userData);
    return response.data;
  },
  blockUser: async (id: string) => {
    const response = await axios.put(`${API_URL}/block-user/${id}`);
    return response.data;
  },
  unblockUser: async (id: string) => {
    const response = await axios.put(`${API_URL}/unblock-user/${id}`);
    return response.data;
  },
  logoutUser: async () => {
    const response = await axios.put(`${API_URL}/logout`);
    return response.data;
  },
  verifyEmail: async (email: string) => {
    const response = await axios.post(`${API_URL}/verify-email`, { email });
    return response.data;
  },
};

export default userService;
