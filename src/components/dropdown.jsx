import React from "react";
import { useState } from "react";
import ArrowUp from "../assets/images/arrowUp.png"
import ArrowDown from "../assets/images/arrowDown.png"

export default function DropDown({ valueList, setValue, isOpen, setIsOpen }) {
    const [selectedValue, setSelectedValue] = useState(valueList[0]);

    const handleValueClick = (value) => {
        // 사용자가 클릭하면 해당 value로 바뀌게
        setSelectedValue(value);
        // input의 value 값
        setValue(value);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center bg-white p-2 border border-gray-300 cursor-pointer gap-2.5 ${
                    isOpen ? "rounded-t-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)]" : "rounded-md"
                }`}
            >
                <input
                    type="button"
                    value={selectedValue}
                    className="bg-white outline-none cursor-pointer"
                    readOnly
                />
                <img src={isOpen ? ArrowUp : ArrowDown} alt="Arrow" />
            </div>
            {isOpen && (
                <ul className="bg-white border border-gray-300 rounded-b-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)]">
                    {valueList.map((value, index) => (
                        <li
                            key={index}
                            onClick={() => handleValueClick(value)}
                            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
