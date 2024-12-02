import React from "react";
import { useState } from "react";
import ArrowUp from "../assets/images/arrowUp.svg";
import ArrowDown from "../assets/images/arrowDown.svg";

export default function DropDown({ valueList, setValue, isOpen, setIsOpen }) {
  const [selectedValue, setSelectedValue] = useState(valueList[0]);

  const handleValueClick = value => {
    // 사용자가 클릭하면 해당 value로 바뀌게
    setSelectedValue(value);
    // input의 value 값
    setValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full font-extralight text-white">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center bg-white bg-opacity-[0.1] bg-opacity-[0.1] p-2 cursor-pointer gap-2.5 w-full ${
          isOpen
            ? "rounded-t-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)]"
            : "rounded-md"
        }`}>
        <input
          type="button"
          value={selectedValue}
          className=" outline-none cursor-pointer w-full "
          readOnly
        />
        <img src={isOpen ? ArrowUp : ArrowDown} alt="Arrow" className="w-6"/>
      </div>
      {isOpen && (
        <ul className="absolute bg-white bg-opacity-[0.1] rounded-b-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)] w-full">
          {valueList.map((value, index) => (
            <li
              key={index}
              onClick={() => handleValueClick(value)}
              className="cursor-pointer hover:bg-white hover:bg-opacity-[0.1] p-2 rounded-md">
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
