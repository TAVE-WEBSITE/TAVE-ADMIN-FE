export default function SimpleModal({
    title,
    description,
    grayBtnText,
    blueBtnText,
    onClickGray,
    onClickBlue,
    onClose,
}) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] p-6 w-[348px]" onClick={(e) => e.stopPropagation()}>
                <div className="text-xl font-semibold text-black mb-0.5">{title}</div>
                <div className="text-lg font-medium mb-6 text-black/60">{description}</div>
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
