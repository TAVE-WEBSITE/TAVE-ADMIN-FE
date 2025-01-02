import { useState, React, useEffect } from "react";
import ArrowUp from "../assets/images/arrowUp.svg";
import ArrowDown from "../assets/images/arrowDown.svg";

export default function ReviewModal({
  isOpen = false,
  text = "후기 등록하기",
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

  const btn = () => {
    onClose();
    alert(
      "후기 등록이 완료되었습니다. \n공개 여부는 이후에도 변경하실 수 있습니다."
    );
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-200">
            <div className="text-lg font-bold mb-4 text-black ">
              {text}
              {additionalText}
            </div>
            <div class="h-[1px] w-[90%] bg-black bg-opacity-10 my-4 align-self-stretch"></div>
            <div className="flex justify-between gap-2 pb-9">
              <Input
                title="닉네임"
                placeholder="닉네임을 입력해주세요"
                user_width="13rem"
              />
              <Input title="기수" placeholder="ex.2" user_width="5rem" />
              <Drop />
            </div>
            <Input
              title="후기"
              placeholder="후기 내용을 입력해주세요"
              user_width="100%"
              user_height="20vh"
            />

            <div className="flex justify-end gap-4 pt-9">
              <div class="flex items-center mr-auto">
                <input
                  type="checkbox"
                  id="simple-checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="ml-2 font-semibold">후기 공개하기</div>
                <span className="text-red-600 ml-1"> *</span>
              </div>

              {showCancel && (
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
                  onClick={onClose}
                >
                  취소
                </button>
              )}
              <button
                className={`px-4 py-2 rounded text-white bg-btn-blue hover:bg-blue-600`}
                onClick={btn}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function Input({
  textSize = "text-base",
  placeholder = "",
  type = "text",
  user_width = "16em",
  user_height = "3.5rem",
  onChange = () => {},
  essential = true,
  essentialText = "",
  className,
  onValidChange = () => {},
  title = "",
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
      <div className="pb-3">
        {title}
        <span className="text-red-600"> *</span>
      </div>
      <input
        type={type}
        className={`${textSize} rounded-md py-3 px-5 rounded-lg border-[0.5px] bg-[#A7A7A7] bg-opacity-[0.07] outline-none ${
          essential0 ? "border-gray-400" : "border-red-800"
        } p-2 font-light-350`}
        placeholder={placeholder}
        style={{ width: user_width, height: user_height }}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
      ></input>

      <div
        className={`text-red-500 mt-1 h-0.5 leading-4 text-xs ${
          essential0 ? "invisible" : "visible"
        }`}
      >
        {!essential0 && essentialText}
      </div>
    </div>
  );
}

function Drop({
  textSize = "text-base",
  placeholder = "",
  type = "text",
  user_width = "16em",
  user_height = "3.5rem",
  onChange = () => {},
  essential = true,
  essentialText = "",
  className,
  onValidChange = () => {},
  title = "",
}) {
  const [field, setField] = useState("선택");
  const handleFieldChange = (value) => {
    if (field === "선택") setField("선택");
    else if (field === "프론트엔드") setField("프론트엔드");
    else if (field === "백엔드") setField("백엔드");
  };
  return (
    <div>
      <div className="pb-3">
        분야
        <span className="text-red-600"> *</span>
      </div>
      <DropDown
        valueList={["프론트엔드", "백엔드", "데이터분석", "딥러닝"]}
        setValue={handleFieldChange}
        reset={"선택"}
      />
    </div>
  );
}

function DropDown({
  valueList,
  setValue,
  isJoin = true,
  user_width = "10rem",
  user_height = "2rem",
  onValidChange = () => {},
  reset = valueList[0],
}) {
  const [selectedValue, setSelectedValue] = useState(reset);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedValue !== valueList[0]) {
      onValidChange(true); // 유효
    } else {
      onValidChange(false); // 무효
    }
  }, [selectedValue]);

  const handleValueClick = (value) => {
    setSelectedValue(value);
    setValue(value);
    setIsOpen(false);
  };

  // 회원가입 드롭다운 스타일이 달라서 따로 지정함
  const joinStyle = isJoin
    ? "bg-[#A7A7A7] bg-opacity-[0.07] border border-gray-400 p-3 rounded-md w-full  shadow-none"
    : "bg-white bg-opacity-[0.1] p-2 cursor-pointer gap-2.5 w-full text-left";
  return (
    <div
      className="relative inline-block w-full font-extralight "
      style={{ width: user_width }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center ${joinStyle} bg-white bg-opacity-[0.1] p-2 cursor-pointer gap-2.5 w-full border-[0.5px] border-gray-400 ${
          isOpen
            ? "rounded-t-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)]"
            : "rounded-md"
        }`}
      >
        <input
          type="button"
          value={selectedValue}
          className="outline-none cursor-pointer w-full text-left "
          readOnly
          style={{
            color: selectedValue === "선택" ? "#A9A9A9" : "black",
            height: user_height,
          }}
        />
        <img src={isOpen ? ArrowUp : ArrowDown} alt="Arrow" className="w-6" />
      </div>
      {isOpen && (
        <ul
          className={`absolute ${joinStyle}  rounded-b-md shadow-[5px_5px_9px_0px_rgba(0,0,0,0.35)] w-full`}
        >
          {valueList.map((value, index) => (
            <li
              key={index}
              onClick={() => handleValueClick(value)}
              className="cursor-pointer hover:bg-white hover:bg-opacity-[0.1] p-2 rounded-md relative z-10"
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
