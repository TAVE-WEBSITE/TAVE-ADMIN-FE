import React from "react";
import CoverImg from "../assets/images/coverImg.svg";

export default function SessionBlock({title, description}) {
  return (
    <div>
      <div className="w-96 h-64 bg-white rounded-[30px] p-8 flex flex-col items-center shadow-[1px_1px_30px_0px_rgba(0,0,0,0.35)]">
        <div>
          <img src={CoverImg}  className="h-40"></img>
        </div>
        <div className="text-3xl mt-4">{title}</div>
      </div>
    </div>
  );
}
