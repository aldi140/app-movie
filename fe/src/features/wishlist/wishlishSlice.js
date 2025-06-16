import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlistData",
  async () => {
    const data = await getWishlist();
    return data.wishlist;
  }
);

export const addWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addToWishlist(
        data.title,
        data.tmdbId,
        data.poster_path,
        data.realase_date,
        data.overview,
        data.vote_average
      );
      return response.wishlist;
      // console.log(response);
    } catch (err) {
      // Kirim error message ke rejected action.payload
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (id) => {
    const response = await removeFromWishlist(id);
    return response;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      // console.log("DATA WISHLIST DARI API:", action.payload); // pastikan ini array
      state.data = action.payload;
    });

    builder.addCase(addWishlist.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(removeWishlist.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);
    });
  },
});

export default wishlistSlice.reducer;
