import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

const cartService = {
  // Fetch the cart for a user
  fetchUserCart: async (userId: string) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  },

  // Add an item to the cart
  addItemToCart: async (userId: string, item: { product: string; quantity: number; store: string; price: number }) => {
    const response = await axios.post(`${API_URL}/${userId}/add`, item);
    return response.data;
  },

  // Update item quantity in the cart
  updateCartItem: async (userId: string, itemId: string, quantity: number) => {
    const response = await axios.put(`${API_URL}/${userId}/item/${itemId}`, { quantity });
    return response.data;
  },

  // Remove an item from the cart
  removeItemFromCart: async (userId: string, itemId: string) => {
    const response = await axios.delete(`${API_URL}/${userId}/item/${itemId}`);
    return response.data;
  },

  // Checkout cart
  checkout: async (cartId: string) => {
    const response = await axios.post(`${API_URL}/${cartId}/checkout`);
    return response.data;
  },

  // Clear the cart for a user
  clearUserCart: async (userId: string) => {
    const response = await axios.delete(`${API_URL}/${userId}/clear`);
    return response.data;
  }
};

export default cartService;
