import { useState, useEffect, React } from "react";
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

  const navigate = useNavigate();

  const authBefore = () => {
    setAuthCode(true);
    setBtnText("인증 완료");
  };

  const authAfter = () => {
    setNewPw(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
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
            />
            <div className="flex gap-5 items-center">
              <MemberInput
                text="이메일"
                onChange={handleInputChange}
                user_width="16.5em"
                hint="이메일을 입력해주세요"></MemberInput>
              <button
                onClick={() => setModalOpen(true)}
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
            {authCode == true ? (
              <MemberInput text="인증번호" hint="인증번호를 입력해주세요"></MemberInput>
            ) : (
              <></>
            )}
          </div>

          <Button
            text={`${btnText}`}
            onClick={authCode == false ? authBefore : authAfter}></Button>
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
            />
            <MemberInput text="비밀번호 확인" hint="비밀번호를 다시 입력해주세요"></MemberInput>
          </div>

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
