import CloseIcon from '../assets/images/closeIcon.svg';

export default function SimpleModal({
    title,
    description,
    grayBtnText,
    blueBtnText,
    onClickGray,
    onClickBlue,
    onClose,
    showCloseButton = false,
}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] p-6 w-[348px]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-0.5">
                    <div className="text-xl font-semibold text-black">{title}</div>
                    {showCloseButton && (
                        <img 
                            src={CloseIcon} 
                            onClick={onClose} 
                            alt="close" 
                            className="cursor-pointer w-6 h-6" 
                        />
                    )}
                </div>
                <div className="text-lg font-medium mb-6 text-black/60 whitespace-pre-line">{description}</div>
                <div className="flex justify-end gap-3">
                    {grayBtnText && (
                        <button
                            className="py-4 px-5 bg-gray-200 text-[#394150] rounded-[10px] font-semibold text-base"
                            onClick={onClickGray}
                        >
                            {grayBtnText}
                        </button>
                    )}
                    <button
                        className="py-4 px-5 bg-[#195bff] text-white rounded-[10px] font-semibold text-base"
                        onClick={onClickBlue}
                    >
                        {blueBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
}
