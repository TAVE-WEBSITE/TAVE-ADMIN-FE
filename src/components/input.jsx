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
  user_height = "2.125em",
  onChange,
  essential = false,
  essentialText,
}) {
  const [essential0, setEssential] = useState(essential);

  useEffect(() => {
    setEssential(essential);
  }, [essential]);

  /*
  const handleFocus = (e) => {
    setEssential(true);
    handleChange(e); //입력 필드 포커스
  };

  const handleChange = (e) => {
    onChange(e);
    if (e.target.value) {
      setEssential(true); // 입력값 존재 -> essential을 true로 설정
    } else {
      setEssential(false); // 입력값 존재 X -> essential을 false로 설정
    }
  };
  */
  return (
    <div>
      <input
        type={type}
        className={`${textSize} rounded-md py-3 px-5 border border-gray-400 p-2 font-light-350`}
        placeholder={placeholder}
        style={{ width: user_width, height: user_height }}
        onChange={onChange}
      ></input>
      {essential0 == false ? (
        <div className="text-red-500">{essentialText}</div>
      ) : (
        <></>
      )}
    </div>
  );
}
