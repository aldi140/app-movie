import { useState } from "react";
import FormRegister from "../../components/commons/organisms/FormRegister";
import AuthTemplate from "../../components/commons/templates/AuthTemplate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";


const PageRegister = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleRegister = async (e) => {
        e.preventDefault()
        const response = await dispatch(registerUser({name: e.target.name.value, email: e.target.email.value, password: e.target.password.value}))
        if(registerUser.fulfilled.match(response)){
            navigate("/login", {state: {success: response.payload.message}});
            
        }else {
            setError(response.payload)
        }
    }
    console.log(error);
    return (
        <div className="flex h-screen">
            {/* Kolom kiri: Gambar */}
            <div
                className="hidden xl:block xl:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/img/bg-theater.jpg')" }}
            ></div>

            {/* Kolom kanan: Form Login */}
            <div className="w-full xl:w-1/2 flex items-center justify-center ">
                <AuthTemplate title="Register">
                    <FormRegister handleAuth={handleRegister} />
                </AuthTemplate>
            </div>
        </div>

    );
};


export default PageRegister