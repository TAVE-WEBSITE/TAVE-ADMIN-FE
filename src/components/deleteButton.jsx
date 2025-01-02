/*
textSize = 텍스트 사이즈,
text = 버튼 텍스트 내용,
onClick = 버튼 클릭 함수,
user_width = 지정 너비,
user_height = 지정 높이,
  */

export default function DeleteButton({
  textSize = "text-base",
  text = "",
  onClick = () => {},
  user_width = "30rem",
  user_height = "",
  type,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`${textSize} bg-white bg-opacity-[0.4] items-center rounded-md py-2 px-5 p-2 font-light-350 `}
      style={{ width: user_width, height: user_height }}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
