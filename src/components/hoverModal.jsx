import React from "react";
import InfoIcon from "../assets/images/infoIcon.svg";

export default function HoverModal({ text, list_style }) {
  return (
    <div className="bg-white rounded-lg p-4 min-w-80 absolute top-8 left-56 transform -translate-x-1/2 text-sm shadow-lg">
      <div className={`flex items-start ${list_style ? "gap-5" : "gap-4"}`}>
        <img src={InfoIcon} alt="Info" className="cursor-pointer" />
        <div className="text-lg font-medium text-left text-black font-normal whitespace-nowrap"
        style={{ paddingRight: "1rem" }}>
        <ul className={`${list_style ? `pl-4 ${list_style}` : "list-none"}`}>
            {text.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
