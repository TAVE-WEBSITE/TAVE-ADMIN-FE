import React, { useState } from 'react';
import Input from '../components/input';
import InfoIcon from '../assets/images/infoIcon.svg';

export default function InfoInput({
    text = '',
    hover_text = [],
    hint = '',
    user_width = '24em',
    onChange,
    list_style,
    essentialText = '',
    onValidChange = () => {},
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex gap-2 w-full items-center relative">
            <div
                className="flex flex-1 gap-0.5 text-right font-normal text-white justify-end relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text} <img src={InfoIcon} alt="Info" className="cursor-pointer" />
            </div>
            <Input
                placeholder={hint}
                className="flex-2"
                onChange={onChange}
                user_width={user_width}
                essentialText={essentialText}
                onValidChange={onValidChange}
            ></Input>
        </div>
    );
}
