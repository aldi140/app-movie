import api from ".";

export const addToWishlist = async (title, tmdbId, poster_path, realase_date, overview, vote_average) => {
  try {
    const response = await api.post(
      "/wishlist",
      { title, tmdbId, poster_path, realase_date, overview, vote_average },
    );
    return response.data;
  } catch (err) {
    console.error("❌ API Error:", err.response?.data || err.message); // 👈 log error di sini
    throw err; // biar bisa di-handle sama `createAsyncThunk`
  }
};

export const getWishlist = async () => {
    const response = await api.get("/wishlist");
    return response.data
    // console.log(response);
};

export const removeFromWishlist = async (id) => {
    const response = await api.delete("/wishlist/" + id);
    return response.data;
};