import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Review, ReviewState } from '../../types/reviewTypes';
import reviewService from '../../services/reviewsAPI.ts';

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

// Thunks for CRUD operations
export const fetchProductReviews = createAsyncThunk(
  'reviews/fetchProductReviews',
  async (productId: string) => {
    return await reviewService.getProductReviews(productId);
  }
);

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review: Omit<Review, 'id'>) => {
    return await reviewService.addReview(review);
  }
);

export const editReview = createAsyncThunk(
  'reviews/editReview',
  async ({ reviewId, updatedReview }: { reviewId: string; updatedReview: Omit<Review, 'id'> }) => {
    return await reviewService.editReview(reviewId, updatedReview);
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId: string) => {
    return await reviewService.deleteReview(reviewId);
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews(state) {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      })
      .addCase(editReview.fulfilled, (state, action: PayloadAction<Review>) => {
        const index = state.reviews.findIndex((review) => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
