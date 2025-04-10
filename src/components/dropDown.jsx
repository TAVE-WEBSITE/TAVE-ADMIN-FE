import { useState, useEffect } from 'react';
import DialogArrow from '../assets/images/dialogArrow.svg';
import Arrow from '../assets/images/dropArrow.svg';

// type - default, join, dialog

export default function DropDown({
    valueList,
    initialValue,
    setValue,
    type,
    essential = true,
    essentialText,
    onValidChange = () => {},
    isValidateTrigger = false, // form 제출했을 때 validation 확인
}) {
    const [selectedValue, setSelectedValue] = useState(valueList[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        if (initialValue) {
            setSelectedValue(initialValue);
        }
    }, [initialValue]);

    useEffect(() => {
        if (selectedValue !== valueList[0]) {
            onValidChange(true);
        } else {
            onValidChange(false);
        }
    }, [selectedValue]);

    useEffect(() => {
        if (isValidateTrigger && essential && selectedValue === valueList[0]) {
            setIsInvalid(true);
            onValidChange(false);
        }
    }, [isValidateTrigger, selectedValue]);

    const handleValueClick = (value) => {
        setSelectedValue(value);
        setValue(value);
        setIsOpen(false);
        if (value === valueList[0]) {
            setIsInvalid(true);
        } else {
            setIsInvalid(false);
        }
    };

    return (
        <div className="w-full relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full py-3.5 px-4 rounded-[10px] font-medium ${
                    type === 'join'
                        ? `bg-[#313338] ${selectedValue !== valueList[0] ? 'text-white' : 'text-[#81818a]'} text-lg`
                        : type === 'default'
                        ? 'bg-[#989ba1]/10 text-white text-lg'
                        : 'bg-white text-[#394150] border border-[#e5e7eb] text-base'
                } ${isOpen && type === 'join' ? 'border border-[#195bff]/80' : ''}
                 ${isInvalid && essential ? 'border border-[#ff0072]/80' : ''}`}
            >
                <input
                    type="button"
                    value={selectedValue}
                    className="cursor-pointer w-full text-left outline-none"
                    readOnly
                />
                <img
                    src={type === 'dialog' ? DialogArrow : Arrow}
                    alt="Arrow"
                    className={`${isOpen ? 'scale-[-1]' : ''} w-6 cursor-pointer`}
                />
            </div>
            {isOpen && (
                <ul
                    className={`absolute mt-2 
                         ${
                             type === 'dialog'
                                 ? 'text-[#394150] text-base bg-white'
                                 : 'text-white text-lg bg-[#313338] '
                         } p-2 font-medium w-full rounded-[10px]
                         ${type === 'dialog' ? 'border border-[#e5e7eb]' : ''}`}
                >
                    {valueList.map((value, index) => (
                        <div
                            key={index}
                            onClick={() => handleValueClick(value)}
                            className={`cursor-pointer ${type === 'dialog' ? '' : 'hover:bg-[#26282e]'} p-2 rounded-md`}
                        >
                            {value}
                        </div>
                    ))}
                </ul>
            )}
            {isInvalid && essentialText && (
                <p className="text-[#ff0072]/80 text-sm font-medium mt-[6px]">{essentialText}</p>
            )}
        </div>
    );
}
