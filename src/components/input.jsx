import { useState, React, useEffect } from "react";

export default function Input({
  placeholder = "",
  type, //type 을 MODAL | MEMBER 로 구분지어서 스타일 적용하기
  onChange = () => {},
  essential = true,
  essentialText = "",
  confirmText = "",
  className,
  onValidChange = () => {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [essential0, setEssential] = useState(essential);
  const [errorText, setErrorText] = useState(""); // 에러 또는 확인 메시지 상태


  useEffect(() => {
    setEssential(essential);
  }, [essential]);

  const handleFocus = (e) => {
    setEssential(true);
    setErrorText("");
    onChange(e); //입력 필드 포커스
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const valid = value.trim() !== "";

    // 유효성 체크 및 상태 업데이트
    if (!valid) {
      setErrorText(essentialText); // 입력값이 없으면 에러 메시지
    } else {
      setErrorText(confirmText); // 입력값이 유효하면 확인 메시지
    }

    setEssential(valid); // 유효성 상태 업데으트
    onValidChange(valid); // 부모 컴포넌트로 유효성 전달 (다음 버튼 활성화)

    onChange(e);
  };

  // 테두리 색상 설정
  const borderColorClass = errorText
    ? errorText === essentialText
      ? "border-[#FF0073CC]" // 에러 (빨간색)
      : "border-[#00AA58]" // 성공 (초록색)
    : "border-[#FFFFFF1A]"; // 기본 색상

  return (
    <div className={`${className}`}>
      <input
        className={`${
          type === "MODAL"
            ? "bg-white text-[#272D3A] text-[16px]  leading-[135%] tracking-[-0.56px]"
            : "bg-[#313338] text-white text-[18px] leading-[30px] tracking-[-0.54px]"
        } flex w-full px-4 py-[14px] items-center gap-2 
              rounded-md border-[1.4px] 
              font-medium 
              outline-none ${borderColorClass}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
      />

     {/* 오류 또는 확인 메시지 출력 */}
     <div
        className={`text-xs font-medium mt-1 h-0.5 leading-4 ${
          errorText
            ? errorText === essentialText
              ? "text-[#FF0073CC]" // 에러 메시지 (빨간색)
              : "text-[#00AA58]" // 확인 메시지 (초록색)
            : "invisible"
        }`}
      >
        {errorText}
      </div>
    </div>
  );
}