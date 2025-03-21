export default function Button({
    className = 'text-base p-5 text-white',
    text = '',
    onClick = () => {},
    disabled = false,
}) {
    return (
        <button
            onClick={onClick}
            className={`${className} ${
                disabled ? 'bg-white bg-opacity-[0.1]' : 'bg-btn-blue'
            } items-center rounded-md font-semibold text-center w-full`}
            type="button"
            disabled={disabled}
        >
            {text}
        </button>
    );
}
