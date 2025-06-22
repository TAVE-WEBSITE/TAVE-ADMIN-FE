import { useEffect, useState } from "react";
import MemberInput from "../memberInput";
import useSignupStore from "../../store/useSignupStore";

export default function JoinStep2() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { updateUserData, validateStep } = useSignupStore();

  const [pwApproveText, setPwApproveText] = useState(undefined);
  const [pwCheckApproveText, setPwCheckApproveText] = useState(undefined);

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    passwordApproveText(val);
    validatePasswordMatch(val, passwordCheck);
  };

  const handlePasswordCheck = (e) => {
    const val = e.target.value;
    setPasswordCheck(val);
    validatePasswordMatch(password, val);
  };

  useEffect(() => {
    validateStep();
  }, [password]);

  useEffect(() => {
    if (
      password === passwordCheck &&
      passwordValide(password) &&
      passwordValide(passwordCheck)
    ) {
      updateUserData("password", password);
      validatePasswordMatch(password, passwordCheck);
    } else {
      updateUserData("password", "");
    }
  }, [password, passwordCheck]);

  // 유효성 검사
  const passwordValide = (pw) => {
    const hasSpecial = /[!@#$%^&*]/.test(pw);
    const hasUpperLower = pw !== pw.toLowerCase() && pw !== pw.toUpperCase();
    const isLongEnough = pw.length >= 8;
    return hasSpecial && hasUpperLower && isLongEnough;
  };

  const passwordApproveText = (pw) => {
    if (pw.trim() === "") return;
    setPwApproveText(passwordValide(pw) ? undefined : false);
  };

  // 비밀번호 확인 일치 검사
  const validatePasswordMatch = (pw, check) => {
    if (check.trim() === "") {
      setPwCheckApproveText(undefined);
      return;
    }

    if (pw === check) {
      setPwCheckApproveText(undefined);
    } else {
      setPwCheckApproveText(false);
    }
  };

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
          isConfirmed={pwApproveText}
          disapproveText={
            pwApproveText === false
              ? "비밀번호 조건이 충족되지 않았습니다."
              : ""
          }
        />
      </div>
      <div className="flex gap-2 items-center w-full justify-center">
        <MemberInput
          text="비밀번호 확인"
          onChange={handlePasswordCheck}
          placeholder="비밀번호를 다시 입력해주세요"
          essentialText="비밀번호를 다시 입력해주세요."
          isPassword={true}
          isConfirmed={pwCheckApproveText}
          disapproveText={
            pwCheckApproveText === false
              ? "새 비밀번호와 일치하지 않습니다."
              : ""
          }
        />
      </div>
    </div>
  );
}
