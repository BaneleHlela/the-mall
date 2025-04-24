export interface Store {
  _id: string; // Unique identifier for the store
  name: string; // Name of the store
  logo: {
    url: string;
    text: string;
  };
  type: string; // Type of the store (e.g., furniture, doctor surgery)
  layout?: string; // Optional reference to the store layout
  description: string; // Description of the store
  owners: string[]; // List of owner IDs
  businessType: 'sole' | 'partnership' | 'company' | 'corporation' | 'LLC' | 'non-profit' | 'franchise'; // Type of business
  isVerified: boolean; // Verification status
  thumbnail: string; // URL for the store thumbnail
  createdAt: string; // Timestamp of creation
  updatedAt: string; // Timestamp of last update
}

export interface StoreState {
  stores: Store[]; // List of stores
  currentStore: Store | null;
  loading: boolean; // Loading state
  error: string | null; // Error message
}


/*
import {Types} from "mongoose";

export interface Store {
  _id: Types.ObjectId;
  name: string;
  owners: Types.ObjectId[];
  description: string;
  category: string;
  settings: StoreSettings;
}

export interface StoreSettings {
  theme: string;
  colorScheme: string;
  layout?: string;
  isVerified: boolean,
  thumbnail: string,
}

export interface StoreState {
  storeList: Store[];
  selectedStore: Store | null;
  loading: boolean;
  error: string | null;
}

// types/storeTypes.ts
*/
