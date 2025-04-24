// features/cart/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../types/cartTypes';
import cartService from '../../services/cartAPI.ts';

const initialState: CartState = {
  _id: null,
  cartItems: [],
  totalPrice: 0,
  checkoutStatus: 'idle',
  error: null,
};

export const processCheckout = createAsyncThunk('cart/processCheckout', async (cartId: string) => {
  return await cartService.checkout(cartId);
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.cartItems.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.cartItems.findIndex((item) => item.product === action.payload);
      if (index !== -1) {
        const item = state.cartItems[index];
        state.totalPrice -= item.price * item.quantity;
        state.cartItems.splice(index, 1);
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processCheckout.pending, (state) => {
        state.checkoutStatus = 'pending';
        state.error = null;
      })
      .addCase(processCheckout.fulfilled, (state) => {
        state.checkoutStatus = 'success';
        state.cartItems = [];
        state.totalPrice = 0;
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.checkoutStatus = 'failed';
        state.error = action.error.message || 'Failed to process checkout';
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
