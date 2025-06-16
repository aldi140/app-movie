import { useSelector } from "react-redux";import CardMedium from "../../components/commons/atoms/CardMedium";
import { baseURLImg } from "../../api/movieApi";

const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.data);
    const totalWishlist = useSelector((state) => state.wishlist.data?.length);

    return (
        <div>
            <div className="w-full py-28 max-w-6xl mx-auto">
                <div className="w-full">
                    <div className="flex items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">My Wishlist ({totalWishlist})</h1>
                    </div>
                    <div className="flex gap-x-3 flex-wrap">
                        {wishlist?.length > 0 ? (
                            wishlist.map((movie, index) => (
                                <CardMedium key={index} movies={movie} baseUrlImg={baseURLImg} />
                            ))
                        ) : (
                            <p className="text-white">Tidak ada wishlist ditemukan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
