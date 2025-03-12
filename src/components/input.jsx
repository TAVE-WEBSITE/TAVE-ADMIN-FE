import { useState, React, useEffect } from "react";

/*
 textSize = 텍스트 크기,
  placeholder = 입력 전 힌트 값,
  type = 입력 할 텍스트 type,
  user_width = 지정 너비,
  user_height = 지정 높이,
  onChange = input 값 변경에 따른 onChange
  
  + 로그인 관련 로직
  essential= = 필수 값 입력 유무 ,
  essentialText = 필수 값 요구 텍스트
  ++ 추후 타이머 기능 등 추가 가능성 O (로그인 관련 로직 -> 고려 사항 X)
   */
export default function Input({
  textSize = "text-base",
  placeholder = "",
  type = "text",
  user_width = "16em",
  user_height = "3.3rem",
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

    // if (inputValue) {
    //   setEssential(true); // 입력값 존재 -> essential을 true로 설정
    // } else {
    //   setEssential(false); // 입력값 존재 X -> essential을 false로 설정
    // }
    onChange(e);
  };

  return (
    <div className={`${className}`}>
      <input
        type={type}
        className={`${textSize} flex w-full px-4 py-[14px] items-center gap-2 
              rounded-md border-[0.5px] bg-[#FFFFFF1A] text-white
              font-[Pretendard] text-[18px] font-medium leading-[30px] tracking-[-0.54px] 
              outline-none ${essential0 ? "border-none" : "border-red-800"}`}
        placeholder={placeholder}
        style={{ height: user_height }}
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
