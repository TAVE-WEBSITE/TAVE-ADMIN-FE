import React, { useState } from "react";
import HistoryElements from "./historyElement";

export default function HistoryBlock({ number, updatedTime, history=[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlockClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleBlockClick}
      className={`w-full bg-white bg-opacity-[0.07] rounded-[30px] p-8 shadow-[1px_1px_30px_0px_rgba(0,0,0,0.35)] cursor-pointer
        flex flex-col justify-between items-start
        transition-all duration-300 
        ${isOpen ? "h-auto" : "h-24"} overflow-hidden`}
    >
      {/* 기수 & 이전 업데이트 시각 */}
      <div className="flex items-center justify-between text-white w-full">
        <div className="text-3xl ">{number}기</div>
        <div className="text-3xl font-light">
          Last Updated {updatedTime}
        </div>
      </div>

      {/* 기수별 이력 정보 */}
      {isOpen && (
        <div className="mt-4 w-full border border-t-slate-300 border-x-0 border-b-0 pt-8">
          <HistoryElements number={number} history={history}/>
        </div>
      )}
    </div>
  );
}
