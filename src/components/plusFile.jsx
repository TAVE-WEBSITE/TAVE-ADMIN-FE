import React from "react";
import PlusIcon from "../assets/images/PlusIcon.svg";
import FileBack from "../assets/images/FileBack.png";

export default function PlusFile() {
  const backgroundColor =
    "linear-gradient(180deg, rgba(76, 76, 76, 1), rgba(27, 27, 27, 1))";
  const boxShadow = "0px 4.61px 9.22px 0px rgba(0, 0, 0, 0.1)";
  return (
    <div className="relative w-72 h-60 bg-no-repeat cursor-pointer">
      <div
        className="absolute w-[194px] h-[140px] md:w-[270px] md:h-[185px] mt-7 md:mt-[44px] z-5 "
        style={{
          background: backgroundColor,
          borderRadius: "20px",
          boxShadow: boxShadow,
        }}
      ></div>
      <img
        className="w-[194px] h-[164px] md:w-[269px] md:h-[230px]"
        src={FileBack}
      ></img>
      <img
        src={PlusIcon}
        alt="Plus Icon"
        className="absolute top-28 left-1/2 transform -translate-x-1/2 z-10"
      />
    </div>
  );
}
