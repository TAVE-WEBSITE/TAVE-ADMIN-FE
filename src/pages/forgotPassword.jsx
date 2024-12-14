import { useState, useEffect, useCallback, React } from "react";
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
  const [btnText, setBtnText] = useState("다음");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [step1Valid, setStep1Valid] = useState([false, false, false]); // 유효성 상태
  const [step2Valid, setStep2Valid] = useState([false, false]);

  const navigate = useNavigate();

  const authBefore = () => {
    setAuthCode(true);
    setBtnText("인증 완료");
  };

  const authAfter = () => {
    if (step1AllValid) {
      setNewPw(true);
    }
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

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
            <InfoInput
              text="아이디"
              hint="아이디를 입력해주세요"
              hover_text={[
                "아이디를 잊어버리셨다면,",
                "현재 기수의 회장에게 문의 부탁드립니다 :)",
              ]}
              essentialText="아이디를 입력해주세요."
              onValidChange={isValid => handleValidChange(0, isValid, 1)}
            />
            <div className="flex gap-5 items-center">
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
                authBefore(); // 인증번호 입력 인풋 표시
              }}
                className="w-25 h-11 text-base text-white items-center rounded-md py-1 px-5 font-light-350 bg-transparent border border-white whitespace-nowrap">
                인증하기
              </button>
              {isModalOpen && (
                <SimpleModal
                  text={inputValue}
                  buttonType="confirm"
                  isAuth={true}
                  showCancel={false}
                  onClose={() => setModalOpen(false)}
                />
              )}
            </div>
            {authCode && (
              <MemberInput
                text="인증번호"
                hint="인증번호를 입력해주세요"
                essentialText="인증번호를 입력해주세요."
                onValidChange={(isValid) => handleValidChange(2, isValid, 1)}
              />
            )}
          </div>

          <Button
            text={`${btnText}`}
            onClick={authAfter}
            disabled={!step1AllValid}></Button>
        </div>
      ) : (
        <div className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10">
          <div className="text-4xl text-white font-medium">비밀번호 재설정</div>
          <div className="flex flex-col gap-5">
            <InfoInput
              text="새 비밀번호"
              hint="비밀번호를 입력해주세요"
              hover_text={[
                "8자 이상",
                "대소문자 모두 포함",
                "특수문자(!@#$%^&*) 포함",
              ]}
              list_style="list-disc"
              essentialText="비밀번호를 입력해주세요."
              onValidChange={isValid => handleValidChange(0, isValid, 2)}
            />
            <MemberInput
              text="비밀번호 확인"
              hint="비밀번호를 다시 입력해주세요"
              essentialText="비밀번호가 일치하지 않습니다."
              onValidChange={isValid =>
                handleValidChange(1, isValid, 2)
              }></MemberInput>
          </div>

          <Button
            text="비밀번호 재설정"
            onClick={() => navigate("/Login")}
            disabled={!step2AllValid}></Button>
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
