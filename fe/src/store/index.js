import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/authSlice";
import { wishlistSlice } from "../features/wishlist/wishlishSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        wishlist: wishlistSlice.reducer 
    }
});

