import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Booking, BookingState } from '../../types/bookingTypes';
import bookingService from '../../services/bookingsAPI.ts';

const initialState: BookingState = {
  bookingList: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

// Fetch all bookings for a specific store
export const fetchStoreBookings = createAsyncThunk(
  'bookings/fetchStoreBookings',
  async (storeId: string) => {
    return await bookingService.getBookings(storeId);
  }
);

// Fetch all bookings for a specific store
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (userId: string) => {
    return await bookingService.getBookings(userId);
  }
);

// Add a new booking
export const addBooking = createAsyncThunk(
  'bookings/addBooking',
  async (bookingData: Omit<Booking, 'id'>) => {
    return await bookingService.addBooking(bookingData);
  }
);

// Update an existing booking
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (bookingData: Booking) => {
    return await bookingService.updateBooking(bookingData);
  }
);

// Delete a booking
export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (bookingId: string) => {
    await bookingService.deleteBooking(bookingId);
    return bookingId;
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    selectBooking(state, action: PayloadAction<Booking>) {
      state.selectedBooking = action.payload;
    },
    clearSelectedBooking(state) {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.bookingList = action.payload;
        state.loading = false;
      })
      .addCase(fetchStoreBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
	  .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.bookingList = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      .addCase(addBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.bookingList.push(action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        const index = state.bookingList.findIndex((booking) => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookingList[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<string>) => {
        state.bookingList = state.bookingList.filter((booking) => booking.id !== action.payload);
      });
  },
});

export const { selectBooking, clearSelectedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
