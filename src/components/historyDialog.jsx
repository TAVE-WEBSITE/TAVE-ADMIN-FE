import { useMutation } from "@tanstack/react-query";
import { postHistory, updateHistory } from "../api/history";
import CloseIcon from "../assets/images/closeIcon.svg";
import Button from "./button";
import DialogInput from "./dialogInput";
import SimpleModal from "./simpleModal";
import TextArea from "./textArea";
import { useEffect, useState } from "react";

// type - register, modify 야호

const extractNumbers = (str) => {
  const match = str.match(/\d+/); // 숫자만 추출
  return match ? match[0] : ""; // 숫자 문자열 반환 (없으면 빈 문자열)
};

export default function HistoryDialog({
  type,
  onClose,
  onSubmit,
  initialData = {
    id: "",
    description: "",
    additionalDescription: "",
    generation: "",
  },
}) {
  const [formData, setFormData] = useState({
    generation: extractNumbers(initialData.generation),
    history: initialData.description,
    description: initialData.additionalDescription,
  });
  const [isValidateTrigger, setIsValidateTrigger] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [errors, setErrors] = useState({
    generation: false,
    history: false,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key !== "description") {
      setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
    }
  };

  const handleSubmit = () => {
    setIsValidateTrigger(true);
    const newErrors = {
      generation: !formData.generation.trim(),
      history: !formData.history.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.generation && !newErrors.history) {
      clickHandler();
      //onSubmit(formData);
      onClose();
    }
  };

  // POST용 mutation
const postMutation = useMutation({
  mutationFn: postHistory,
  onSuccess: () => {
    window.location.reload();
  },
  onError: (error) => {
    console.error('이력 추가 실패:', error);
  },
});

// UPDATE용 mutation
const updateMutation = useMutation({
  mutationFn: ({ id, data }) => updateHistory(id, data),
  onSuccess: () => {
    window.location.reload();
  },
  onError: (error) => {
    console.error('이력 수정 실패:', error);
  },
});


  //window.location.reload();
  const clickHandler = () => {
    const newHistory = {
      generation: formData.generation,
      description: formData.history,
      additionalDescription: formData.description,
      isPublic: true,
    };
  
    if (newHistory.additionalDescription === "") {
      delete newHistory.additionalDescription;
    }
  
    if (type === "register" && !isConfirmModal) {
      setIsConfirmModal(true);
    } else if (type === "register" && isConfirmModal) {
      postMutation.mutate(newHistory);
    } else {
      updateMutation.mutate({ id: initialData.id, data: newHistory });
    }
  };
  

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
          {type === "register" ? "이력 등록하기" : "이력 수정하기"}
          <img
            src={CloseIcon}
            onClick={onClose}
            alt="close"
            className="cursor-pointer"
          />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <DialogInput
            text="기수"
            placeholder="ex. 13"
            value={formData.generation}
            onChange={(e) => handleChange("generation", e.target.value)}
            essentialText="* 기수를 입력해주세요."
            essential={true}
            inValidateTrigger={isValidateTrigger && errors.generation}
          />
          <DialogInput
            text="이력"
            placeholder="ex. 서울과학기술대학교 캡스톤 경진대회 2등"
            value={formData.history}
            onChange={(e) => handleChange("history", e.target.value)}
            essentialText="* 이력을 입력해주세요."
            essential={true}
            inValidateTrigger={isValidateTrigger && errors.history}
          />
          <TextArea
            text="이력 설명"
            placeholder="이력에 대한 설명을 작성해주세요."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            isEssentialOption={false}
          />
        </div>
        <div className="flex gap-3 pr-6 pl-[270px] justify-end">
          <Button
            text="취소"
            className="text-[#394150] text-base font-semibold px-5 py-3 bg-gray-200 rounded-[10px]"
            onClick={onClose}
          />
          <Button
            text="등록"
            className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
            onClick={clickHandler}
          />
        </div>
      </div>
      {isConfirmModal && (
        <SimpleModal
          title="이력 등록 완료"
          description={`현재 시간 부로, 동아리 홈페이지에 공개됩니다. \n동의 하시겠습니까?`}
          grayBtnText="취소"
          blueBtnText="확인"
          onClickGray={() => setIsConfirmModal(false)}
          onClickBlue={handleSubmit}
        />
      )}
    </div>
  );
}
