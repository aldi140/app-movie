import { useSelector } from "react-redux"; import CardMedium from "../../components/commons/atoms/CardMedium";
import { baseURLImg } from "../../api/movieApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../features/auth/authSlice";

const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.data);
    const totalWishlist = useSelector((state) => state.wishlist.data?.length);
    const isLogin = useSelector(isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) {
            navigate("/login")
        }
    }, [isLogin, navigate])
    if (!isLogin) return null;
    return (
        <div>
            <div className="w-full py-28 px-4"> {/* px-4 agar ada padding di kiri-kanan di HP */}
                <div className="w-full max-w-6xl mx-auto">
                    <div className="flex items-center mb-3">
                        <h1 className="text-base md:text-xl font-bold text-white">
                            My Wishlist ({totalWishlist})
                        </h1>
                    </div>
                    <div className="flex gap-x-2 flex-wrap">
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
