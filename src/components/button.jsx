/*
textSize = 텍스트 사이즈,
text = 버튼 텍스트 내용,
onClick = 버튼 클릭 함수,
user_width = 지정 너비,
user_height = 지정 높이,
  */

export default function Button({
  text = "",
  onClick = () => {},
  disabled = false,
  className = "text-[20px] font-semibold leading-[24px] tracking-[-0.4px] py-[19px] px-5",
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        disabled ? "bg-white bg-opacity-[0.1] text-[#81818A]" : "bg-btn-blue"
      } items-center rounded-md text-white text-center w-full disabled:cursor-not-allowed`}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
