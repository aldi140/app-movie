import { useDispatch } from "react-redux";
import {
  loginUser,
  registerUser,
  logout,
} from "../features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(response)) {
        toast.success("Login successful");
        navigate("/");
      } else {
        // toast.error(response.payload?.message || "Login failed");
        return { success: false, message: response.payload?.message || "Login failed" };
        // console.log('ini response gagal ', response.payload?.message);
      }
    } catch (err) {
      toast.error("Unexpected error during login");
      console.log(err);
    }
  };

  const handleRegister = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData));
      if (registerUser.fulfilled.match(result)) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(result.payload?.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Unexpected error during registration");
       console.log(err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/login");
  };

  return { handleLogin, handleRegister, handleLogout };
};
