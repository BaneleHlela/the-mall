// types/productTypes.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
  stockQuantity: {
    total: number;
    sold: number;
  };
  images: string[];
  color?: string;
  ratings: {
    star?: number;
    postedBy?: string;
  };
  brand: string;
  thumbnail: string;
  store: string;
  owners: string[];
  isDeleted: boolean;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
