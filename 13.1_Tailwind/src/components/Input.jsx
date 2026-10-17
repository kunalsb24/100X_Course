export const Input = ({
    onClick,
    type,
    placeholder
}) => {
    return <span onClick={onClick} className={`p-8 rounded-2xl text-4xl px-32 py-8 text-white cursor-pointer bg-blue-500`}>
        <input type={type} placeholder={placeholder} 
        className="bg-blue-500 outline-none"></input>
    </span>
}