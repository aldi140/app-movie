const Button = ({ children, classname = "bg-black" }) => {
    return (
        <button className={`text-white py-2 px-4 ${classname} transition-all ease-in-out duration-300`}>{children}</button>
    )
}

export default Button