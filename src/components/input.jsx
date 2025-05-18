import { useState, useEffect } from 'react';

// 특정 type - dialog

export default function Input({
    placeholder = '',
    initialValue = '',
    type,
    onChange = () => {},
    essentialText,
    approveText,
    disapproveText,
    onValidChange = () => {},
    isValidateTrigger = false, // form 제출했을 때 validation 확인
    isConfirmed = undefined, // 인증 승인 여부
    value = "", //초기값
}) {
    const [inputValue, setInputValue] = useState(value);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (initialValue) {
            setInputValue(initialValue);
        }
    }, [initialValue]);

    useEffect(() => {
        if (isValidateTrigger) {
            const valid = inputValue.trim() !== '';
            setMessage(valid ? '' : essentialText);
            onValidChange(valid);
        }
    }, [isValidateTrigger, inputValue]);

    useEffect(() => {
        setMessage(isConfirmed ? approveText : disapproveText);
    }, [isConfirmed]);

    const handleFocus = (e) => {
        onChange(e);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onChange(e);
        onValidChange(value.trim() !== '');
    
        // 메시지는 isConfirmed가 undefined일 때만 갱신
        if (isConfirmed === undefined) {
            if (value.trim() === '') {
                setMessage(essentialText);
            } else {
                setMessage('');
            }
        }
    };
    
    useEffect(() => {
        if (isConfirmed === true) {
            setMessage(approveText);
        } else if (isConfirmed === false) {
            setMessage(disapproveText);
        } else {
            setMessage('');
        }
    }, [isConfirmed]);    

    const borderColor = message
    ? message === approveText
        ? 'border-[#00aa58]' // 초록색
        : 'border-[#ff0072]/80' // 빨간색
    : type === 'dialog'
    ? 'border-[#e5e7eb]'
    : 'border-none';

    return (
        <div className="w-full">
            <input
                className={`w-full font-medium rounded-[10px] ${
                    type === 'dialog'
                        ? 'pl-[14px] py-[18px] bg-white text-[#394150] placeholder-[#39415066] text-base'
                        : 'pl-4 py-[14px] bg-[#313338] text-white placeholder-[#81818a] text-lg'
                } ${borderColor} outline-none border-[1.4px]`}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
            />
            <div className="h-[20px]">
                {message && (
                    <p
                        className={`text-sm font-medium ${
                            message === approveText ? 'text-[#00AA58]' : 'text-[#ff0072]/80'
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
