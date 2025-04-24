import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import productService from '../../services/productAPI.ts';
import { Product, ProductState } from '../../types/productTypes';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  return await productService.getAllProducts();
});

export const fetchProductsByStore = createAsyncThunk('products/fetchProductsByStore', async (storeId: string) => {
  return await productService.getAllProductsPerStore(storeId);
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: string) => {
  return await productService.getProductById(id);
});

export const addProduct = createAsyncThunk('products/addProduct', async ({ storeId, productData }: { storeId: string; productData: never }) => {
  return await productService.addProduct(storeId, productData);
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }: { id: string; productData: never }) => {
  return await productService.updateProductById(id, productData);
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  return await productService.deleteProductById(id);
});

export const undeleteProduct = createAsyncThunk('products/undeleteProduct', async (id: string) => {
  return await productService.undeleteProductById(id);
});

// Create the slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductsByStore.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(undeleteProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      });
  },
});

// Export actions and reducer
export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
