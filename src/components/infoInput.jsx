import React, { useState } from "react";
import Input from "../components/input";

export default function InfoInput({
  text = "",
  hover_text = "",
  hint = "",
  user_width = "24em",
  onChange,
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
  );
}
