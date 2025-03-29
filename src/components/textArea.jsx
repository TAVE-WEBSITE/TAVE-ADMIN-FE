import { useState, useEffect } from "react";

export default function TextArea({
  text,
  placeholder,
  onChange,
  essentialText = "",
  onValidChange = () => {},
  isValidateTrigger = false,
  isEssentialOption = true,
  value = "",
}) {
  const [inputValue, setInputValue] = useState(value);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //console.log(isValidateTrigger);
    if (isValidateTrigger && isEssentialOption) {
      const valid = inputValue.trim() !== "";
      setMessage(valid ? "" : essentialText);
      onValidChange(valid);
    }
  }, [isValidateTrigger, inputValue, isEssentialOption]);

  const handleFocus = (e) => {
    onChange(e);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (isEssentialOption) {
      const valid = value.trim() !== "";
      setMessage(valid ? "" : essentialText);
      onValidChange(valid);
    }
    onChange(e);
  };

  const borderColor =
    isEssentialOption && message === essentialText
      ? "border-[#ff0072]/80"
      : "border-[#e5e7eb]";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-base font-medium flex gap-0.5">
        <span className="text-[#394150]">{text}</span>
        {isEssentialOption && <span className="text-[#ff0072]/80">*</span>}
      </div>
      <div className="w-full">
        <textarea
          className={`w-full font-medium rounded-[10px] ${"pl-[14px] py-[18px] bg-white text-[#394150] placeholder-[#39415066] text-base"} ${borderColor} outline-none border-[1.4px]`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <div className="h-[20px]">
          {message && (
            <p
              className="text-sm font-medium text-[#ff0072]/80
                            "
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
