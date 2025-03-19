import Input from "../components/input";
/*
textSize = 텍스트 사이즈,
text = 버튼 텍스트 내용,
onClick = 버튼 클릭 함수,
user_width = 지정 너비,
user_height = 지정 높이,
  */

export default function MemberInput({
  btnText = "",
  text = "",
  hint = "",
  onClick,
  type = "",
  onChange,
  essentialText = "",
  confirmText="",
  onValidChange = () => {},
}) {
  return (
    <div className="flex gap-2 w-full items-center flex-col ">
      <div
        className="text-left text-[#D2D2DF] text-md font-medium 
                leading-[30px] tracking-[-0.48px] w-full"
      >
        {text}

        <span className="text-[#81818A] text-sm pl-2">
          {type === "PASSWORD" &&
            "8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함"}
        </span>
      </div>

      <div className="flex gap-2 items-center w-full justify-center">
        <Input
          placeholder={hint}
          className="w-full"
          onChange={onChange}
          essentialText={essentialText}
          confirmText={confirmText}
          onValidChange={onValidChange}
        ></Input>
        {btnText !== "" && (
          <button
            onClick={onClick}
            className={`h-11 text-base flex items-center justify-center gap-2 
             rounded-[10px] bg-[#195BFF] p-[14px] w-[120px] `}
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
}