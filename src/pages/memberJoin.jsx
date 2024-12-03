import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
import DropDown from "../components/dropdown";
import Wave from "../assets/images/LoginWave.svg";
import { useNavigate } from "react-router-dom";

export default function MemberJoin({
  textSize = "text-base",
  text = "",
  onClick,
  user_width = "16em",
  user_height = "",
  type,
}) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const [department, setDepartment] = useState("부서");
  const [position, setPosition] = useState("직책");
  const departmentList = ["부서", "경영처", "기술처"];
  const positionList = ["직책", "회장", "처장", "처원"];
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
    <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-gradient-to-r from-[#121212] to-[#1445BC] relative">
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>

      <div className="w-[38rem] h-[40rem] flex flex-col items-center justify-center gap-6 px-16 bg-[#1212124D] p-10 border border-[#FFFFFF1A] rounded-2xl relative backdrop-blur-md z-10 text-white">
        <div className="text-4xl text-white  font-medium mb-10">회원가입</div>

        {/* 1 단계 : 본인기수, 아지트 아이디  */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <MemberInput text="본인기수" />
            <MemberInput text="아지트 아이디" />
            <div className="flex gap-2">
              <div className="flex w-24 font-normal text-white justify-end items-center">
                현재 직책
                <div className="text-red-500 "> *</div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-36">
                  <DropDown
                    valueList={departmentList}
                    setValue={setDepartment}
                    isJoin={true}
                  />
                </div>

                <div className="w-36">
                  <DropDown
                    valueList={positionList}
                    setValue={setPosition}
                    isJoin={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2단계 : 아이디, 비밀번호, 비밀번호 확인, 이메일 */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-4 w-full items-center">
              <div className="flex-1 w-1/4 font-normal text-right">아이디</div>
              <div className="flex flex-row w-3/4 gap-3 items-center">
                <Input user_width="11.5rem" className="flex-3" />
                <button className="w-25 h-11 text-base items-center rounded-md py-1 px-5 font-light-350 bg-transparent border border-white text-white">
              중복 확인
            </button>
              </div>
            </div>
            <div className="flex gap-2 w-full items-center text-right">
              <div className="flex-1 w-1/4 font-normal">비밀번호</div>
              <Input className="flex-2 w-3/4" user_width="19em"></Input>
            </div>
            <MemberInput text="비밀번호 확인"></MemberInput>
            <MemberInput
              text="이메일"
              hint="이메일을 입력해주세요"></MemberInput>
          </div>
        )}


          <Button
            text={step === 1 ? "다음" : "가입하기"}
            user_width="25rem"
            user_height="4rem"
            onClick={step === 1 ? handleNextStep : () => navigate("/Login")}
          />
     
      </div>

      <img
        src={Wave}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        alt="Wave Background"
      />
    </div>
  );
}
