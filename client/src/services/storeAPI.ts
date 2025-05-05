import axios from 'axios';
import { Store } from '../types/storeTypes';

const API_URL = 'http://localhost:5000/api/stores'; // Adjust this to your actual API endpoint

const storeService = {
  // Add a new store
  addStore: async (storeData: Omit<Store, 'id'>): Promise<Store> => {
    const response = await axios.post(`${API_URL}/add`, storeData);
    return response.data;
  },

  // Edit an existing store
  editStore: async (storeId: string, updatedStore: Omit<Store, 'id'>): Promise<Store> => {
    const response = await axios.put(`${API_URL}/edit/${storeId}`, updatedStore);
    return response.data;
  },

  // Delete a store
  deleteStore: async (storeId: string): Promise<string> => {
    const response = await axios.delete(`${API_URL}/delete/${storeId}`);
    return response.data;
  },

  // Get all stores
  getStores: async (): Promise<Store[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get store by id
  getStoreById: async (storeId: string): Promise<Store> => {
    const response = await axios.get( `${API_URL}/${storeId}`);
    return response.data;
  },

  // Get stores by owner ID
  getStoresByOwner: async (ownerId: string): Promise<Store[]> => {
    const response = await axios.get(`${API_URL}/myStores`, { params: { ownerId } });
    return response.data;
  },

  uploadStoreLogo: async (storeId: string, logoFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('logo', logoFile);

    try {
      const response = await axios.put(`${API_URL}/${storeId}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200 || !response.data.url) {
        throw new Error('Invalid response from server');
      }

      return response.data.url;
    } catch (error) {
      console.error('Error uploading store logo:', error);
      throw new Error('Failed to upload store logo');
    }
  },


  deleteStoreLogo: async (storeId: string): Promise<string> => {
    try {
        const response = await axios.delete(`${API_URL}/${storeId}/logo`);
        return response.data.storeId; // you could also return just `storeId` manually if you prefer
      } catch (error) {
        console.error('Error deleting store logo:', error);
        throw new Error('Failed to delete store logo');
      }
    }
  };

export default storeService;
