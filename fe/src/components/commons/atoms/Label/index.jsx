const Label = ({ children, htmlFor }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-gray-300 mb-2 font-bold">
            {children}
        </label>
    )
}

export default Label