import React from "react";
import { useState } from "react";
import ArrowUp from "../assets/images/arrowUp.svg";
import ArrowDown from "../assets/images/arrowDown.svg";

export default function DropDown({ valueList, setValue, isJoin = false }) {
  const [selectedValue, setSelectedValue] = useState(valueList[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleValueClick = value => {
    setSelectedValue(value);
    setValue(value);
    setIsOpen(false);
  };

  // 회원가입 드롭다운 스타일이 달라서 따로 지정함
  const joinStyle = isJoin
  ? "bg-[#1212124D] border border-gray-400 p-3 rounded-md w-full text-white shadow-none"
  : "bg-white bg-opacity-[0.1] p-2 cursor-pointer gap-2.5 w-full text-left";
  return (
    <div className="relative inline-block w-full font-extralight text-white">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center ${joinStyle} bg-white bg-opacity-[0.1] p-2 cursor-pointer gap-2.5 w-full ${
          isOpen
            ? "rounded-t-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)]"
            : "rounded-md"
        }`}>
        <input
          type="button"
          value={selectedValue}
          className="outline-none cursor-pointer w-full text-left"
          readOnly
        />
        <img src={isOpen ? ArrowUp : ArrowDown} alt="Arrow" className="w-6" />
      </div>
      {isOpen && (
        <ul className={`absolute ${joinStyle}  rounded-b-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)] w-full`}>
          {valueList.map((value, index) => (
            <li
              key={index}
              onClick={() => handleValueClick(value)}
              className="cursor-pointer hover:bg-white hover:bg-opacity-[0.1] p-2 rounded-md relative z-10">
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
