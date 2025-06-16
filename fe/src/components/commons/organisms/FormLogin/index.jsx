import { Link } from "react-router-dom"
import Button from "../../atoms/Button"
import InputForm from "../../moleculs/InputForm"

const FormLogin = ({handleAuth}) => {
    return (
        <form onSubmit={handleAuth} className="space-y-4">
            <InputForm label="Email" type="email" placeholder="example@gmail.com" name="email" />
            <InputForm label="Password" type="password" placeholder="*******" name="password" />

            <Button classname="w-full bg-amber-400 hover:bg-amber-500 rounded">Sign In</Button>
            <p className="text-gray-300 text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-amber-400 hover:text-amber-500 transition-all ease-in-out duration-300">
                    Register
                </Link>
            </p>
        </form>
    )
}

export default FormLogin