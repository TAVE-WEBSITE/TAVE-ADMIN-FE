import Input from "../components/input";
/*
textSize = 텍스트 사이즈,
text = 버튼 텍스트 내용,
onClick = 버튼 클릭 함수,
user_width = 지정 너비,
user_height = 지정 높이,
  */

export default function MemberInput({
  text = "",
  hint = "",
  onClick,
  user_width = "24em",
  user_height = "",
  type,
}) {
  return (
    <div className="flex gap-2 w-full items-center">
      <div className="flex-1 text-right font-normal text-white whitespace-nowrap">
        {text} <span className="text-red-500">*</span>
      </div>
      <Input
        placeholder={hint}
        className="flex-2"
        user_width={user_width}
      ></Input>
    </div>
  );
}
