import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/layouts/layoutSlice";
import userReducer from "../features/users/userSlice";
import storeReducer from "../features/stores/storeSlice";
import productReducer from "../features/products/productSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import cartReducer from "../features/cart/cartSlice";
import bookingReducer from "../features/bookings/bookingSlice.ts"
import layoutSettingsReducer from "../features/layouts/layoutSettingsSlice.ts";


export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        layoutSettings: layoutSettingsReducer,
        user: userReducer,
        stores: storeReducer,
        product: productReducer,
        review: reviewReducer,
        cart: cartReducer,
        booking: bookingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
