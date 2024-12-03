import Input from "../components/input";
/*
textSize = 텍스트 사이즈,
text = 버튼 텍스트 내용,
onClick = 버튼 클릭 함수,
user_width = 지정 너비,
user_height = 지정 높이,
  */

export default function MemberJoin({
  text = "",
  hint = "",
  onClick,
  user_width = "16em",
  user_height = "",
  type,
}) {
  return (
    <div className="flex gap-2 w-full items-center">
      <div className="flex-1 text-right w-1/4 font-normal text-white">
        {text} <span className="text-red-500">*</span>
      </div>
      <Input
        placeholder={hint}
        className="flex-2 w-3/4"
        user_width="19rem"
      ></Input>
    </div>
  );
}
