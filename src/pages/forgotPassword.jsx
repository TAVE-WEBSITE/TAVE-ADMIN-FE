import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
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
    <div className="flex flex-row px-24 py-24 items-center">
      <img className="flex-1 p-16" src={TaveLogo} />
      {newPw == false ? (
        <div className="flex flex-col flex-1 items-center gap-7">
          <div className="font-light-350 text-2xl">비밀번호 찾기</div>
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
            onClick={authCode == false ? authBefore : authAfter}
          ></Button>
        </div>
      ) : (
        <div className="flex flex-col flex-1 items-center gap-10">
          <div className="font-light-350 text-2xl">비밀번호 찾기</div>
          <MemberInput text="새 비밀번호"></MemberInput>
          <MemberInput text="비밀번호 확인"></MemberInput>
          <Button
            text="비밀번호 재설정"
            onClick={() => navigate("/Login")}
          ></Button>
        </div>
      )}
    </div>
  );
}
