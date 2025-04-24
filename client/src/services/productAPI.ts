// services/productAPI.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // Adjust to your actual API URL

const productService = {
  // Add a new product
  addProduct: async (storeId: string, productData: never) => {
    const response = await axios.post(`${API_URL}/${storeId}/add`, productData);
    return response.data;
  },

  // Get all products for a specific owner
  getAllProductsPerOwner: async () => {
    const response = await axios.get(`${API_URL}/myProducts`);
    return response.data;
  },

  // Get all products for a specific store
  getAllProductsPerStore: async (storeId: string) => {
    const response = await axios.get(`${API_URL}/${storeId}`);
    return response.data;
  },

  // Get a product by ID
  getProductById: async (id: string) => {
    const response = await axios.get(`${API_URL}/productById/${id}`);
    return response.data;
  },

  // Get all products (admin only)
  getAllProducts: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Update a product by ID
  updateProductById: async (id: string, productData: never) => {
    const response = await axios.patch(`${API_URL}/${id}`, productData);
    return response.data;
  },

  // Delete a product by ID
  deleteProductById: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // Undelete a product by ID
  undeleteProductById: async (id: string) => {
    const response = await axios.patch(`${API_URL}/undelete/${id}`);
    return response.data;
  },
};

export default productService;
