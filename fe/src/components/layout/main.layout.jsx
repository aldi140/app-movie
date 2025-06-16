import { Outlet } from "react-router-dom";
import Navigation from "./navigation.layout";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWishlist } from "../../features/wishlist/wishlishSlice";

const MainLayout = () => {
   const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);
  return (
    <div className="relative">
      <Navigation />
      <Toaster richColors position="top-right" />
      <Outlet /> {/* ini yang akan merender child route */}
    </div>
  );
};

export default MainLayout;
