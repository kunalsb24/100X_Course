export const Button = ({
    disabled,
    children,
    onClick
}) => {
    return <span onClick={onClick} className={`rounded-4xl  px-4 py-2 text-white cursor-pointer ${disabled ? "bg-blue-200" : "bg-green-400"}`}>
        {children}
    </span>
}