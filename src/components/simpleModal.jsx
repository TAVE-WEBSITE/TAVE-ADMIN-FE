import React from "react";

export default function SimpleModal({
  text,
  additionalText,
  buttonType,
  onClose,
  isAvailable, // 아이디 중복 확인용
  isAuth, // 이메일 인증용
  showCancel = true,
  onConfirm,
}) {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="text-lg font-semibold text-black">
          {text}
        </div>
        <div className="text-lg font-medium mb-4 text-gray-500">
          {additionalText}
        </div>
        <div className="flex justify-end gap-4">
          {showCancel && (
            <button
              className="w-20 h-12 bg-[#E5E7EB] text-gray-700 rounded-lg font-semibold text-base hover:bg-gray-300"
              onClick={onClose}>
              취소
            </button>
          )}
          <button
            className={`w-20 h-12 bg-btn-blue rounded-lg font-semibold text-base text-white ${
              buttonType === "confirm"
                ? "bg-btn-blue hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => {
              if (onConfirm) onConfirm(); // onConfirm 실행
              onClose(); // 모달 닫기
            }}>
            {buttonType === "confirm" ? "확인" : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
