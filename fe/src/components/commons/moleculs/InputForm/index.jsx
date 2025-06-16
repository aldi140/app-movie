import Input from "../../atoms/Input"
import Label from "../../atoms/Label"

const InputForm = ({label, type, name, placeholder}) => {
    return (
        <div className="mb-4">
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} placeholder={placeholder}/>
        </div>
    )
}

export default InputForm