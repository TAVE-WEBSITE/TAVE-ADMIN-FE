export default function Button({
    className = 'w-full text-[20px] text-white py-[19px] px-5 rounded-md font-semibold bg-[#195bff] disabled:bg-[#52555e]',
    text = '',
    onClick = () => {},
    disabled = false,
}) {
    return (
        <button
            onClick={onClick}
            className={`${className} whitespace-nowrap flex items-center justify-center text-center disabled:cursor-not-allowed`}
            type="button"
            disabled={disabled}
        >
            {text}
        </button>
    );
}
