import { useState, useEffect, useCallback, React, useInsertionEffect } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
import InfoInput from "../components/infoInput";
import SimpleModal from "../components/simpleModal";
import Wave from "../assets/images/LoginWave.svg";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [authCode, setAuthCode] = useState(false);
  const [newPw, setNewPw] = useState(false);
  const [btnText, setBtnText] = useState("다음으로");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [step1Valid, setStep1Valid] = useState([true,true,true]); // 유효성 상태
  const [step2Valid, setStep2Valid] = useState([false, false]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const authAfter = () => {
    if (step1AllValid) {
      setNewPw(true);
    }
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  // 비밀번호 유효성 검사 함수
  const handlePasswordValidation = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

    // 비밀번호 확인 검사
    useEffect(() => {
      handleValidChange(0, handlePasswordValidation(password), 2);
      handleValidChange(1, handlePasswordValidation(password) && password === confirmPassword, 2);
    }, [password, confirmPassword]);
  

  // 유효성 검사
  const handleValidChange = useCallback((index, isValid, step) => {
    if (step === 1) {
      setStep1Valid(prev => {
        const updated = [...prev];
        updated[index] = isValid;
        return updated;
      });
    } else if (step === 2) {
      setStep2Valid(prev => {
        const updated = [...prev];
        updated[index] = isValid;
        return updated;
      });
    }
  }, []);

  const step1AllValid = step1Valid.every(value => value);
  const step2AllValid = step2Valid.every(value => value);

  return (
    <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-gradient-to-r from-[#121212] to-[#1445BC] relative">
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>
      {newPw == false ? (
        <div className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10">
          <div className="text-4xl text-white font-medium">비밀번호 찾기</div>
          <div className="flex flex-col gap-5">
          <MemberInput
                text="이름"
                onChange={handleInputChange}
                user_width="16.5em"
                hint="이름을 입력해주세요"
                essentialText="이름을 입력해주세요."
                onValidChange={isValid =>
                  handleValidChange(1, isValid, 1)
                }></MemberInput>
            <div className="flex gap-5 items-center justify-center">
              <MemberInput
                text="이메일"
                onChange={handleInputChange}
                user_width="16.5em"
                hint="이메일을 입력해주세요"
                essentialText="이메일을 입력해주세요."
                onValidChange={isValid =>
                  handleValidChange(1, isValid, 1)
                }></MemberInput>
              <button
               onClick={() => {
                setModalOpen(true); // 모달 열기
              }}
                className="w-25 h-11 mt-7 text-base text-white items-center rounded-md py-1 px-5 font-light-350 bg-[#195BFF] whitespace-nowrap">
                인증요청
              </button>
              {isModalOpen && (
                <SimpleModal
                  buttonType="confirm"
                  isAuth={true}
                  showCancel={false}
                  onClose={() => setModalOpen(false)}
                />
              )}
            </div>
            <div className="flex gap-5 items-center mb-5">
              <MemberInput
                text="인증번호"
                onChange={handleInputChange}
                user_width="16.5em"
                hint="인증번호를 입력해주세요"
                essentialText="인증번호가 일치하지 않습니다."
                onValidChange={isValid =>
                  handleValidChange(1, isValid, 1)
                }></MemberInput>
              <button
               onClick={() => {


              }}
              className="w-25 h-11 mt-7 text-base text-white items-center rounded-md py-1 px-5 font-light-350 bg-[#195BFF] whitespace-nowrap">
                인증확인
              </button>
            </div>
          </div>

          <Button
            text={`${btnText}`}
            onClick={authAfter}
            disabled={!step1AllValid}
            user_width="28em"
            user_height="3em"
            ></Button>
        </div>
      ) : (
        <div className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10">
          <div className="text-4xl text-white font-medium">비밀번호 재설정</div>
          <div className="flex flex-col gap-5 mb-5">
          <InfoInput
              text="새 비밀번호"
              hint="비밀번호를 입력해주세요"
              hover_text="8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함"
              list_style="list-disc"
              essentialText="비밀번호를 입력해주세요."
              onChange={e => setPassword(e.target.value)}
            />
            <MemberInput
              text="비밀번호 확인"
              hint="비밀번호를 다시 입력해주세요"
              essentialText="비밀번호가 일치하지 않습니다."
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            text="비밀번호 재설정"
            onClick={() => setShowConfirmModal(true)}
            disabled={!step2AllValid}
            user_width="28em"
            user_height="3em"></Button>
             {showConfirmModal && (
        <SimpleModal
          buttonType="confirm"
          text="비밀번호 재설정 완료"
          isAuth={true}
          showCancel={false}
          onClose={() => {
            setShowConfirmModal(false);
            navigate("/Login");
          }}
        />
      )}
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
