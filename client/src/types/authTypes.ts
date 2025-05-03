export interface User {
  id: string; // Unique identifier for the user
  firstname: string; // User's first name
  lastname: string; // User's last name
  email: string; // User's email
  mobile?: string; // User's mobile number
  password: string; // User's password (hashed)
  role: string; // User's role (e.g., user, admin)
  avatar: string;
  stores: string[];
  isBlocked: boolean;
  cart: string[];
  address: string[];
  wishlist: string[];
  favoriteStore?: string[];
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
  isVerified?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  error: string | null;
  message: string | null;
}
