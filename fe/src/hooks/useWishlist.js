import { useDispatch, useSelector } from "react-redux";
import { addWishlist } from "../features/wishlist/wishlishSlice";
import { toast } from "sonner";

export const useWishlist = () => {
    const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleAddToWislist = async (movie) => {
    const movieData = {
      title: movie.original_title,
      tmdbId: movie.id,
      poster_path: movie.poster_path,
      realase_date: movie.release_date,
      overview: movie.overview,
      vote_average: movie.vote_average,
    };

    try {
      const result = await dispatch(addWishlist(movieData));
      if (addWishlist.fulfilled.match(result)) {
        toast.success("Successfully added to wishlist");
        console.log("add wishlist success");
      } else {
        toast.error(result.payload?.message || "Gagal menambahkan ke wishlist");
      }
    } catch (err) {
      console.log("Dispatch error:", err); // fallback log kalau ada error lain
    }
  };


  return { wishlist, handleAddToWislist };
};
