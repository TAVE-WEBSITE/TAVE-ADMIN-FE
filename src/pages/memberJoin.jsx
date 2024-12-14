import { useState, useEffect, useCallback, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Button from "../components/button";
import MemberInput from "../components/memberInput";
import DropDown from "../components/dropdown";
import SimpleModal from "../components/simpleModal";
import InfoInput from "../components/infoInput";
import Wave from "../assets/images/LoginWave.svg";
import { useNavigate } from "react-router-dom";

export default function MemberJoin() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [department, setDepartment] = useState("부서");
  const [position, setPosition] = useState("직책");
  const departmentList = ["부서", "경영처", "기술처"];
  const positionList = ["직책", "회장", "처장", "처원"];
  // step별로 유효성 관리
  const [step1Valid, setStep1Valid] = useState([false, false, false, false]);
  const [step2Valid, setStep2Valid] = useState([false, false, false, false]);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  // 전달하는 함수가 무한으로 재생성하는걸 방지하기 위해 useCallbsck으로 감쌈
  const handleValidChange = useCallback(
    (index, isValid) => {
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
    },
    [step]
  );

  //step별로 유유효성 검사사
  const step1AllValid = step1Valid.every(value => value); 
  const step2AllValid = step2Valid.every(value => value); 

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
            <MemberInput
              text="본인기수"
              hint="ex. 12"
              essentialText="기수를 입력해주세요."
              onValidChange={isValid => handleValidChange(0, isValid)}
            />
            <MemberInput
              text="아지트 아이디"
              hint="ex. tave1234"
              essentialText="아지트 아이디를 입력해주세요."
              onValidChange={isValid => handleValidChange(1, isValid)}
            />
            <div className="flex gap-2">
              <div className="flex w-24 font-normal text-white justify-end items-center">
                현재 직책
                <div className="text-red-500 "> *</div>
              </div>

              <div className="flex gap-4 items-center">
                <DropDown
                  valueList={departmentList}
                  setValue={setDepartment}
                  isJoin={true}
                  user_width="11.5rem"
                  onValidChange={isValid => handleValidChange(2, isValid)}
                />
                <DropDown
                  valueList={positionList}
                  setValue={setPosition}
                  isJoin={true}
                  user_width="11.5rem"
                  onValidChange={isValid => handleValidChange(3, isValid)}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2단계 : 아이디, 비밀번호, 비밀번호 확인, 이메일 */}
        {step === 2 && (
          <div className="flex flex-col gap-6 items-end pr-5">
            <div className="flex gap-5 items-center">
              <MemberInput
                text="아이디"
                onChange={handleInputChange}
                user_width="16em"
                hint="아이디를 입력해주세요"
                essentialText="아이디를 입력해주세요."
                onValidChange={(isValid) => handleValidChange(0, isValid)}></MemberInput>
              <button
                onClick={() => setModalOpen(true)}
                className="w-25 h-11 text-base items-center rounded-md py-1 px-5 font-light-350 bg-transparent border border-white whitespace-nowrap">
                중복 확인
              </button>
              {isModalOpen && (
                <SimpleModal
                  text={inputValue}
                  buttonType="confirm"
                  isAvailable={true}
                  showCancel={false}
                  onClose={() => setModalOpen(false)}
                />
              )}
            </div>
            <InfoInput
              text="비밀번호"
              hint="비밀번호를 입력해주세요"
              hover_text={[
                "8자 이상",
                "대소문자 모두 포함",
                "특수문자(!@#$%^&*) 포함",
              ]}
              list_style="list-disc"
              essentialText="비밀번호를 입력해주세요."
              onValidChange={(isValid) => handleValidChange(1, isValid)}
            />
            <MemberInput
              text="비밀번호 확인"
              hint="비밀번호를 다시 입력해주세요"
              essentialText="비밀번호가 일치하지 않습니다."
              onValidChange={(isValid) => handleValidChange(2, isValid)}></MemberInput>
            <MemberInput
              text="이메일"
              hint="이메일을 입력해주세요"
              essentialText="이메일을 입력해주세요."
              onValidChange={(isValid) => handleValidChange(3, isValid)}></MemberInput>
          </div>
        )}

        <Button
          text={step === 1 ? "다음" : "가입하기"}
          user_width="30rem"
          user_height="4rem"
          onClick={step === 1 ? handleNextStep : () => navigate("/Login")}
          disabled={step === 1 ? !step1AllValid : !step2AllValid}
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
