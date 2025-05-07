import React, { useEffect, useState } from "react";
import Button from "./button";
import { updateHistory, deleteHistory } from "../api/history";
import SimpleModal from "./simpleModal";
import HistoryDialog from "./historyDialog";
import { useMutation } from "@tanstack/react-query";

export default function HistoryElements({
  generation,
  history,
  clickDeleteHandler,
  isDeleteModal,
  setIsDeleteModal,
  setIsModifyModal,
  isModifyModal,
  clickModifyHandler,
}) {
  // 동아리 이력을 기수별로 구분
  const filteredHistory = Array.isArray(history)
    ? history.filter((item) => item.generation === generation)
    : [];
  const [selectHistory, setSelectHistory] = useState(null);
  //const [isModifyMoal, setIsModifyModal] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteHistory,
    onSuccess: () => {
      setIsDeleteModal(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error('이력 삭제 실패:', error);
    },
  });

  const handleDeleteConfirm = () => {
    if (selectHistory) {
      deleteMutation.mutate(selectHistory.id);
    }
  };
  
  return (
    <div>
      {/* 기수 별로 이력이 뜨도록 표시 */}
      {filteredHistory.map((item, index) => (
        <div key={index}>
          {/* 같은 기수 내에서 이력이 개별적으로 뜨도록 */}
          {item.details.map((detail, descIndex) => (
            <div
              key={descIndex}
              className="w-full rounded-[10px] px-6 py-5 flex items-center justify-between mb-4 bg-[rgba(255,255,255,0.1)]"
            >
              <div className="body-text-1 text-white">{detail.description}</div>
              <div className="flex justify-between gap-[8px] ">
                <Button
                  text="수정"
                  className="text-[16px] text-[#B5BAC2] py-2 px-4 rounded-md font-bold bg-[#5E5F63] disabled:bg-[#52555e]"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectHistory(detail);

                    clickModifyHandler();
                  }}
                />
                <Button
                  text="삭제"
                  className="text-[16px] text-white py-2 px-4 rounded-md font-bold bg-[#195bff] disabled:bg-[#52555e]"
                  onClick={(event) => {
                    setSelectHistory(detail);
                    event.stopPropagation(); // 부모 클릭 이벤트 방지
                    clickDeleteHandler(); // 삭제 모달 열기
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      {isDeleteModal && (
        <SimpleModal
          title="이력 삭제"
          description="현재 시간 부로 해당 이력은 삭제되고, 홈페이지에서도 사라집니다. 동의하시겠습니까?"
          grayBtnText="취소"
          blueBtnText="확인"
          onClickGray={() => setIsDeleteModal(false)}
          onClickBlue={handleDeleteConfirm}
        />
      )}
      {isModifyModal && (
        <HistoryDialog
          type="modify"
          initialData={{
            id: selectHistory?.id,
            description: selectHistory?.description,
            additionalDescription: selectHistory?.additionalDescription,
            generation: generation,
          }}
          onClose={() => setIsModifyModal(false)}
        />
      )}
    </div>
  );
}
