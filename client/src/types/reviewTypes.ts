
export interface Review {
  id: string;
  user: string;
  store?: string;
  product?: string;
  service?: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}
