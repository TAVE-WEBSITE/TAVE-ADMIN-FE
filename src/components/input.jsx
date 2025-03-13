import { useState, React, useEffect } from "react";

export default function Input({
  placeholder = "",
  type, //type 을 MODAL | MEMBER 로 구분지어서 스타일 적용하기
  onChange = () => {},
  essential = true,
  essentialText = "",
  className,
  onValidChange = () => {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [essential0, setEssential] = useState(essential);

  useEffect(() => {
    setEssential(essential);
  }, [essential]);

  const handleFocus = (e) => {
    setEssential(true);
    onChange(e); //입력 필드 포커스
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const valid = value.trim() !== "";
    setEssential(valid); // 유효성 상태 업데으트
    onValidChange(valid); // 부모 컴포넌트로 유효성 전달 (다음 버튼 활성화)

    onChange(e);
  };

  return (
    <div className={`${className}`}>
      <input
        className={`${
          type === "MODAL"
            ? "bg-white text-[#272D3A] text-[16px]  leading-[135%] tracking-[-0.56px]"
            : "bg-[#FFFFFF1A] text-white text-[18px] leading-[30px] tracking-[-0.54px]"
        } flex w-full px-4 py-[14px] items-center gap-2 
              rounded-md border-[1.4px] 
              font-medium 
              outline-none ${essential0 ? "border-none" : "border-red-800"}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      <div
        className={`text-red-500 mt-1 h-0.5 leading-4 text-xs ${
          essential0 ? "invisible" : "visible"
        }`}
      >
        {!essential0 && `* ${essentialText}`}
      </div>
    </div>
  );
}
