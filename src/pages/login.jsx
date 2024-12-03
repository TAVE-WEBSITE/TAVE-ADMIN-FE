import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
import Wave from "../assets/images/LoginWave.svg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPw] = useState("");
  const [essentialUser, setEssentialUser] = useState(true);
  const [essentialPw, setEssentialPw] = useState(true);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user == "" && password == "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else if (user == "") {
      setEssentialUser(false);
    } else if (password == "") {
      setEssentialPw(false);
    } else if (user != "" && password != "") {
      navigate("/");
    }
  };

  const userChange = e => {
    setUser(e.target.value);
    if (password.length >= 0) {
      setEssentialUser(true);
    } else {
      setEssentialUser(false);
    }
  };

  const pwChange = e => {
    setPw(e.target.value);
    if (user.length >= 0) {
      setEssentialPw(true);
    } else {
      setEssentialPw(false);
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-gradient-to-r from-[#121212] to-[#1445BC] relative">
      <div className="flex flex-col items-center z-10">
        <div className="text-white text-3xl">The new technology wave,</div>
        <img className="w-96" src={TaveLogo} alt="Logo" />
      </div>

      <div
        className="flex flex-col w-[38rem] h-[40rem] justify-center items-center gap-5 bg-[#1212123D] p-10 border border-[#FFFFFF1A] rounded-2xl backdrop-blur-md relative z-10"
        >
        <div className="text-4xl text-white mb-10">관리자 로그인</div>
        <Input
          placeholder="아이디를 입력해주세요"
          value={user}
          onChange={userChange}
          essential={essentialUser}
          essentialText="아이디를 입력해주세요"
          user_width="25rem"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          essentialText="비밀번호를 입력해주세요"
          value={password}
          essential={essentialPw}
          onChange={pwChange}
          user_width="25rem"
        />
        <Button
          text="로그인"
          user_width="25rem"
          onClick={handleLogin}
          type="submit"
        />
        <div className="flex flex-row w-[25rem] justify-between gap-16 text-gray-500 border-gray-500 text-white font-light">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/memberJoin")}>
            회원가입
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/forgotPassword")}>
            비밀번호 찾기
          </div>
        </div>
      </div>

      <img
        src={Wave}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        alt="Wave Background"
      />
    </div>
  );
}
