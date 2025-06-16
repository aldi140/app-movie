import { Link } from "react-router-dom"

const AuthTemplate = ({ children, title }) => {
    return (
        <div className="w-full max-w-md p-8">
            <div className="mb-3">
                    <Link to="/" className="font-bold text-lg text-secondary block">MOVIESIK</Link>
                </div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-300 mb-6">Back to where the drama, action, and thrill begins.</p>
            {children}
        </div>
    )
}

export default AuthTemplate