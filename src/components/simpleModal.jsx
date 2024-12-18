import React from "react";

export default function SimpleModal({
  text,
  buttonType,
  onClose,
  isAvailable, // 아이디 중복 확인용
  isAuth, // 이메일 인증용
  showCancel = true,
}) {
  let additionalText = "";

  if (isAvailable !== undefined) {
    additionalText = isAvailable
      ? " 사용 가능합니다."
      : "는 이미 존재하는 아이디입니다.";
  } else if (isAuth !== undefined) {
    additionalText = isAuth
      ? " 인증번호를 발송했습니다"
      : " 존재하지 않는 이메일입니다.";
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="text-lg font-medium mb-4 text-center text-black">
          {text}
          {additionalText}
        </div>
        <div className="flex justify-end gap-4">
          {showCancel && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}>
              취소
            </button>
          )}
          <button
            className={`px-4 py-2 rounded text-white ${
              buttonType === "confirm"
                ? "bg-btn-blue hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={onClose}>
            {buttonType === "confirm" ? "확인" : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
