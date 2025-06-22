import { useState, useEffect } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import Wave from "../assets/images/wave.svg";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/login";
import useUserStore from "../store/useUserStore";
import SimpleModal from "../components/simpleModal";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPw] = useState("");
  const [essentialUser, setEssentialUser] = useState(true);
  const [essentialPw, setEssentialPw] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userName, setUserName, department, setDepartment } = useUserStore();

  const navigate = useNavigate();

  // 입력값이 변경될 때 버튼 활성화 상태 업데이트
  useEffect(() => {
    setIsDisabled(user.trim() === "" || password.trim() === "");
  }, [user, password]);

  const userChange = (e) => {
    setUser(e.target.value);
    setEssentialUser(e.target.value.trim() !== "");
  };

  const pwChange = (e) => {
    setPw(e.target.value);
    setEssentialPw(e.target.value.trim() !== "");
  };

  const loginMutation = useMutation({
    mutationFn: ({ user, password }) => postLogin(user, password),
  
    onSuccess: (response) => {
      // 정상 처리
      const result = response?.data?.result;
      console.log(response);
      if (!result) {
        throw new Error("로그인 데이터가 없습니다.");
      }
      sessionStorage.setItem("access_token", result.accessToken);
      sessionStorage.setItem("email", result.email);
      setUserName(result.username);
      setDepartment(
        result.department === "PRINCIPAL" ? "회장" :
        result.department === "TECHNICAL" ? "기술처" : "경영처"
      );
      navigate("/session");
    },
  
    onError: (error) => {
      // 에러 응답에서 메시지 안전하게 추출
      const message = error?.response?.data?.message || "오류가 발생했습니다.";
      setErrorMessage(message);
      setIsModal(true);
    },
  });
  

  const loginHandler = () => {
    if (isDisabled) return;
    loginMutation.mutate({ user, password });
  };

  return (
    <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-[linear-gradient(180deg,#121212_66.46%,#142755_97.53%,#195BFF_134.64%)]  relative">
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>
      <div
        className="flex flex-col w-[41rem] h-[40rem] justify-center items-center gap-5 p-20 border border-[#FFFFFF1A] 
             bg-[rgba(110,112,117,0.12)] shadow-[1px_2px_48px_0px_rgba(0,0,0,0.04)] 
             backdrop-blur-[15px] rounded-2xl backdrop-blur-md relative z-10"
      >
        <div className="text-white text-3xl font-bold leading-[58px] tracking-[-1.44px] text-center">
          관리자 로그인
        </div>
        <Input
          placeholder="이메일을 입력해주세요"
          value={user}
          onChange={userChange}
          essential={essentialUser}
          essentialText="이메일을 입력해주세요"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          essentialText="비밀번호를 입력해주세요"
          value={password}
          essential={essentialPw}
          onChange={pwChange}
          isPassword={true}
        />
        <Button
          text="로그인"
          onClick={loginHandler}
          type="submit"
          disabled={isDisabled}
        />
        <div className="flex flex-row w-full justify-between opacity-40 text-white text-[16px] leading-[16px] tracking-[-0.56px] font-medium">
          <div className="cursor-pointer" onClick={() => navigate("/join")}>
            회원가입
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/forgotPassword")}
          >
            비밀번호 재설정
          </div>
        </div>
      </div>

      <img
        src={Wave}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        alt="Wave Background"
      />
      {isModal && (
        <SimpleModal 
          title="로그인 실패" 
          description={errorMessage} 
          blueBtnText="확인"
          onClickBlue={() => setIsModal(false)}
        />
      )}
    </div>
  );
}

