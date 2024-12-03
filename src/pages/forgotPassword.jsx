import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
import Wave from "../assets/images/LoginWave.svg";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [authCode, setAuthCode] = useState(false);
  const [newPw, setNewPw] = useState(false);
  const [btnText, setBtnText] = useState("비밀번호 찾기");

  const navigate = useNavigate();

  const authBefore = () => {
    setAuthCode(true);
    setBtnText("인증 완료");
  };

  const authAfter = () => {
    setNewPw(true);
  };

  //
  return (
    <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-gradient-to-r from-[#121212] to-[#1445BC] relative">
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>
      {newPw == false ? (
        <div className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10">
          <div className="text-4xl text-white font-medium">비밀번호 찾기</div>
          <MemberInput text="이름"></MemberInput>
          <MemberInput text="아이디"></MemberInput>
          <MemberInput text="이메일"></MemberInput>
          {authCode == true ? (
            <MemberInput text="인증번호"></MemberInput>
          ) : (
            <></>
          )}
          <Button
            text={`${btnText}`}
            onClick={authCode == false ? authBefore : authAfter}></Button>
        </div>
      ) : (
        <div className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10">
          {" "}
          <div className="text-4xl text-white font-medium">비밀번호 재설정</div>
          <MemberInput text="새 비밀번호"></MemberInput>
          <MemberInput text="비밀번호 확인"></MemberInput>
          <Button
            text="비밀번호 재설정"
            onClick={() => navigate("/Login")}></Button>
        </div>
      )}
      <img
        src={Wave}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        alt="Wave Background"
      />
    </div>
  );
}
