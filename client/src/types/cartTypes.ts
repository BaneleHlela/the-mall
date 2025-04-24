// interfaces/cartTypes.ts

export interface CartItem {
  product: string;
  quantity: number;
  store: string;
  price: number;
}

export interface CartState {
  _id: string | null;
  cartItems: CartItem[];
  totalPrice: number;
  checkoutStatus: 'idle' | 'pending' | 'success' | 'failed';
  error: string | null;
}
