import React, { useState } from "react";
import HistoryElements from "./historyElement";
import SimpleModal from "./simpleModal";

export default function HistoryBlock({
  generation,
  updatedTime,
  history = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);


  if (!history || !Array.isArray(history) || history.length === 0) {
    return null;
  }

  const currentHistory = history.find(item => item.generation === generation);
  
  // 해당 generation의 details가 비어있으면(이력이 없는 경우)
  if (!currentHistory || !currentHistory.details || currentHistory.details.length === 0) {
    return null;
  }

  const handleBlockClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const clickDeleteHandler = () => {
    setIsDeleteModal(true);
  };

  return (
    <div
      onClick={handleBlockClick}
      className={`w-full bg-white bg-opacity-[0.07] rounded-[10px] px-10 py-6 shadow-[1px_1px_30px_0px_rgba(0,0,0,0.35)] cursor-pointer
        flex flex-col justify-between items-start
        transition-all duration-300 
        ${isOpen ? "h-auto" : ""} overflow-hidden`}
    >
      {/* 기수 & 이전 업데이트 시각 */}
      <div className="flex items-center justify-between text-white body-text-1  w-full">
        <div className="">{generation}</div>
        <div className="">Last Updated {updatedTime}</div>
      </div>

      {/* 기수별 이력 정보 */}
      {isOpen && (
        <div className="mt-4 w-full pt-1">
          <HistoryElements
            generation={generation}
            history={history}
            clickDeleteHandler={clickDeleteHandler}
            setIsDeleteModal={setIsDeleteModal}
            isDeleteModal={isDeleteModal}
            setIsModifyModal={setIsModifyModal}
            isModifyModal={isModifyModal}
            clickModifyHandler={() => setIsModifyModal(true)}
          />
        </div>
      )}
    </div>
  );
}
