import { useState, useEffect, React } from "react";
import TaveLogo from "../assets/images/taveLogo.svg";
import Input from "../components/input";
import Button from "../components/button";
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

  const userChange = (e) => {
    setUser(e.target.value);
    if (password.length >= 0) {
      setEssentialUser(true);
    } else {
      setEssentialUser(false);
    }
  };

  const pwChange = (e) => {
    setPw(e.target.value);
    if (user.length >= 0) {
      setEssentialPw(true);
    } else {
      setEssentialPw(false);
    }
  };

  //
  return (
    <div className="flex flex-row px-24 py-24 items-center">
      <img className="flex-1 p-16" src={TaveLogo} />
      <div className="flex flex-col flex-1 items-center gap-5">
        <div className="font-light-350 text-2xl">관리자 페이지</div>
        <Input
          placeholder="아이디를 입력해주세요"
          value={user}
          onChange={userChange}
          essential={essentialUser}
          essentialText="아이디를 입력해주세요"
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          essentialText="비밀번호를 입력해주세요"
          value={password}
          essential={essentialPw}
          onChange={pwChange}
        />
        <Button
          text="로그인"
          user_width="16em"
          onClick={handleLogin}
          type="submit"
        />
        <div className="flex flex-row font-light-350 underline gap-16 text-gray-500 border-gray-500">
          <div
            className="cursor-pointer"
            onClick={() => navigate("/memberJoin")}
          >
            회원가입
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/forgotPassword")}
          >
            비밀번호 찾기
          </div>
        </div>
      </div>
    </div>
  );
}
