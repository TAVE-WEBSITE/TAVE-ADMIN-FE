import {  useEffect, useState } from "react";
import MemberInput from "../memberInput";
import { useNavigate } from "react-router-dom";
import useSignupStore from "../../store/useSignupStore";

export default function JoinStep2() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { updateUserData, validateStep } = useSignupStore();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  // 비밀번호 입력이 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    validateStep();
  }, [password]);

  useEffect(() => {
    
    if (password === passwordCheck && passwordValide(password) && passwordValide(passwordCheck) ) {
      updateUserData("password", password);
    } else {
      updateUserData("password", "");
    }
  }, [password, passwordCheck]);


  //8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함
  const passwordValide = (pw) => {
    //str.includes('Hello')
    if(!(pw.includes('!') || pw.includes('@') || pw.includes('#') || pw.includes('$') || pw.includes('%') || pw.includes('^')|| pw.includes('&') || pw.includes('*') )){
      return false;
    }else if(!(pw !== pw.toLowerCase() && pw != pw.toUpperCase())){
      return false;
    }else if(pw.length <8 ){
    return false;
    }else {
      return true;
    }
  }

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex gap-2 items-center w-full">
        <MemberInput
          text="비밀번호"
          onChange={handlePassword}
          placeholder="비밀번호를 입력해주세요"
          essentialText="비밀번호를 입력해주세요."
          type="password"
          isPassword={true}
        />
      </div>
      <div className="flex gap-2 items-center w-full justify-center">
        <MemberInput
          text="비밀번호 확인"
          onChange={handlePasswordCheck}
          placeholder="비밀번호를 다시 입력해주세요"
          essentialText="비밀번호를 다시 입력해주세요."
          isPassword={true}
        />
      </div>
    </div>
  );
}
