import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
import { useNavigate } from "react-router-dom";

export default function MemberJoin({
  textSize = "text-base",
  text = "",
  onClick,
  user_width = "16em",
  user_height = "",
  type,
}) {
  const navigate = useNavigate();

  /*
    <div className="flex flex-col flex-1 items-center gap-5">
        <div className="font-light-350 text-2xl">회원가입</div>
        <Input></Input>
      </div>

    */

  /*
      
      <div class="flex-1 flex flex-col items-center gap-4 px-5">
        <div className="font-light-350 text-2xl text-center">회원가입</div>

        <div className="flex flex-row gap-2">
          <div>아이디</div>
          <Input user_width="12em"></Input>
          <Button user_width="5em"></Button>
        </div>
        <div className="flex flex-row gap-2">
          <div className=" w-full ">비밀번호</div>
          <Input className=" w-full "></Input>
        </div>
        <MemberInput text="비밀번호 확인"></MemberInput>
        <MemberInput text="이메일" hint="이메일을 입력해주세요"></MemberInput>
        <MemberInput text="본인기수"></MemberInput>
        <MemberInput text="아지트 아이디"></MemberInput>
        <Button text="가입 신청" />
      </div>
      
      */
  return (
    <div className="flex flex-row px-24 py-24 items-center">
      <img className="w-1/2 p-16" src={TaveLogo} />
      <div class="w-1/2 flex flex-col items-center gap-6 px-20">
        <div className="font-light-350 text-2xl text-center">회원가입</div>
        <div className="flex flex-row gap-2 w-full">
          <div className="flex-1 w-1/4 font-normal">아이디</div>
          <div className="flex flex-row w-3/4 gap-3">
            <Input user_width="11.5rem" className="flex-3"></Input>
            <button className="w-25 h-9 text-base items-center rounded-md py-1 px-5 font-light-350 bg-[#747474] text-white">
              중복 확인
            </button>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <div className="flex-1 w-1/4 font-normal">비밀번호</div>
          <Input className="flex-2 w-3/4" user_width="19em"></Input>
        </div>
        <MemberInput text="비밀번호 확인"></MemberInput>
        <MemberInput text="이메일" hint="이메일을 입력해주세요"></MemberInput>
        <MemberInput text="본인기수"></MemberInput>
        <MemberInput text="아지트 아이디"></MemberInput>
        <div className="flex gap-2 w-full">
          <div className=" w-1/4"></div>
          <Button
            text="가입 신청"
            user_width="18rem"
            className="w-3/4"
            onClick={() => navigate("/Login")}
          />
        </div>
      </div>
    </div>
  );
}
