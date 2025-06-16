import FormLogin from "../../components/commons/organisms/FormLogin";
import AuthTemplate from "../../components/commons/templates/AuthTemplate";
import { AiFillInfoCircle } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";


const PageLogin = () => {
    const { handleLogin } = useAuth();
    const [error, setError] = useState(null); // Tambah ini

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const result = await handleLogin({ email, password })
        if(!result.success) {
            setError(result.message);
        } else {
            null
        }
    };

    const successMessage = location.state?.success;



    return (
        <div className="flex h-screen">
            {/* Kolom kiri: Gambar */}
            <div
                className="hidden xl:block xl:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/img/bg-theater.jpg')" }}
            ></div>

            {/* Kolom kanan: Form Login */}
            <div className="w-full xl:w-1/2 flex flex-col items-center justify-center ">
                <AuthTemplate title="Login">
                    {error &&
                        <div className="flex items-center gap-x-2 bg-red-200 border border-red-500 text-red-500 py-2 px-4 rounded-md mb-4">
                            <AiFillInfoCircle /> {error}
                        </div>
                    }
                    {successMessage &&
                        <div className="flex items-center gap-x-2 bg-green-200 border border-green-500 text-green-500 py-2 px-4 rounded-md mb-4">
                            <AiFillInfoCircle /> {successMessage}
                        </div>
                    }
                    <FormLogin handleAuth={onSubmit} />
                </AuthTemplate>
            </div>
        </div>

    );
};


export default PageLogin