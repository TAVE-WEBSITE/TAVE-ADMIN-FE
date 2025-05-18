import { useState, useEffect, useCallback, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Button from "../components/button";
import SimpleModal from "../components/simpleModal";
import Wave from "../assets/images/wave.svg";
import { useNavigate } from "react-router-dom";
import JoinStep1 from "../components/join/joinStep1";
import JoinStep2 from "../components/join/joinStep2";
import JoinStep3 from "../components/join/joinStep3";
import useSignupStore from "../store/useSignupStore";
import { postSignUp } from "../api/member";
import { useMutation } from "@tanstack/react-query";

export default function Join() {
  const { step, setStep, isBtnDisabled, validateStep, userData, resetUserData } =
    useSignupStore();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false); 
  const [modalTitle , setModalTitle] = useState("");

  useEffect( () => {
    resetUserData();
    validateStep();
  },[]);


  useEffect(() => {
    validateStep();
    //console.log("유저 데이터" , userData);
  }, [userData.password , userData.email,userData]);


  const signupMutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: (response) => {
      if (response?.status === 200) {
        setModalTitle('회원가입 완료');
        setIsModal(true);
      }
    },
    onError: (error) => {
      setModalTitle('회원가입 실패');
      setIsModal(true);
    },
  });

  const postSignupData = () => {
    signupMutation.mutate();
  };
  

  return (
    <div
      className="flex flex-row h-screen w-screen px-24 py-[5vh] justify-center items-center gap-36 
                 bg-[linear-gradient(180deg,#121212_66.46%,#142755_97.53%,#195BFF_134.64%)] 
                 relative"
    >
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>

      <div
        className="flex flex-col items-center justify-center flex-shrink-0 h-full
                 w-[41rem] max-h-[calc(100vh-4rem)] px-[5rem] py-[4vh] 
                 rounded-[24px] border border-[#FFFFFF1A] 
                 bg-[rgba(110,112,117,0.12)] shadow-[1px_2px_48px_0px_rgba(0,0,0,0.04)] 
                 backdrop-blur-[15px] text-white relative z-10 gap-4"
      >
        <div className="text-white text-3xl font-bold leading-[58px] tracking-[-1.44px] text-center">
          {step === 3 ? "정보 입력" : "회원 가입"}

        </div>

        {step === 1 && <JoinStep1 />}
        {step === 2 && <JoinStep2 />}
        {step === 3 && <JoinStep3 />}
        {isModal && <SimpleModal title="회원가입 완료" description="로그인 화면으로 이동합니다."
        blueBtnText="확인" onClickBlue={() => {
          setIsModal(false);
          navigate("/");
        }} />}

        <Button
          text={step === 3 ? "가입하기" : "다음으로"}
          onClick={step === 3 ? postSignupData :() => setStep(step + 1)}
          disabled={isBtnDisabled}
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
