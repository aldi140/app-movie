const Input = ({type, placeholder, name}) => {
    return (
        <input
            type={type}
            className="w-full p-2 rounded bg-white/10 text-white border border-gray-700 "
            placeholder={placeholder}
            name={name}
        />
    )
}

export default Input