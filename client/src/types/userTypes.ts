export interface User {
  id: string; // Unique identifier for the user
  firstname: string; // User's first name
  lastname: string; // User's last name
  email: string; // User's email
  mobile: string; // User's mobile number
  password: string; // User's password (hashed)
  role: string; // User's role (e.g., user, admin)
  avatar: string;
  stores: string[];
  isBlocked: boolean;
  cart: string[];
  address: string[];
  wishlist: string[];
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
