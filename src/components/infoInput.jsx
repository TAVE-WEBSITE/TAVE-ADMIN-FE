import React, { useState } from "react";
import Input from "../components/input";

export default function InfoInput({
  text = "",
  hover_text = "",
  hint = "",
  onChange,
<<<<<<< HEAD
  essentialText="",
  onValidChange = () => {},
}) {

  return (
    <div className="flex gap-2 w-full items-center flex-col ">
      <div className="flex gap-2 w-full items-center justify-center"> 
        <span
            className="text-left text-[#D2D2DF] text-base font-medium "
          >
            {text}
          </span>
          <span className="text-[#81818A] text-sm font-medium leading-none tracking-[-0.03em]">
            {hover_text}
          </span>
          </div>
         
    
          <div className="flex gap-2 items-center w-full justify-center">
            <Input
              placeholder={hint}
              className="w-full"
              onChange={onChange}
              user_width={user_width}
              essentialText={essentialText}
              onValidChange={onValidChange}
            ></Input>
          </div>
        </div>
=======
  list_style,
  essentialText = "",
  onValidChange = () => {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex gap-2 w-full items-center relative">
      <div
        className="flex flex-1 gap-0.5 text-right font-normal text-white justify-end relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text} <img src={InfoIcon} alt="Info" className="cursor-pointer" />
        {isHovered && <HoverModal text={hover_text} list_style={list_style} />}
      </div>
      <Input
        placeholder={hint}
        className="flex-2"
        onChange={onChange}
        essentialText={essentialText}
        onValidChange={onValidChange}
      ></Input>
    </div>
>>>>>>> bbbdb1fcb28ed6da20ee7c7ff0850001c9ffaeec
  );
}
