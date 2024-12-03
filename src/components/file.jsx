import React from "react";
import FileBack from "../assets/images/FileBack.png";

const File = ({ type, title, teamNum, teamName, category }) => {
  const backgroundColor =
    "linear-gradient(180deg, rgba(76, 76, 76, 1), rgba(27, 27, 27, 1))";
    const boxShadow = "0px 4.61px 9.22px 0px rgba(0, 0, 0, 0.1)"
  return (
    <div>
    <div className="relative w-72 h-60 bg-no-repeat cursor-pointer">
      <div
        className="absolute w-72 h-52 z-5 mt-10"
        style={{
          background: backgroundColor,
            borderRadius: "20px",
            boxShadow: boxShadow,
        }}></div>
      <img className="w-72" src={FileBack}></img>
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h2 className="text-lg font-bold font-Pretendard relative z-11">
          {title}
        </h2>
        <p className="font-light font-Pretendard relative z-11">
          {teamNum}기 {teamName}팀
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default File;
