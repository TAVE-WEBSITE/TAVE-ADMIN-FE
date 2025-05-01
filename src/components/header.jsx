import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLogout } from "../api/login";
import useStore from "../hooks/userInformation";

import TaveLogo from "../assets/images/taveLogo.svg";
import HeaderArrow from "../assets/images/headerArrow.svg";
import useUserStore from "../store/useUserStore";

export default function Header() {
  const navigate = useNavigate();
   const { logout } = useStore();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => {
    if (["/history", "/review", "/session"].includes(path)) {
      return ["/history", "/review", "/session"].includes(location.pathname);
    }
    return location.pathname === path;
  };
  const togglePopOver = () => setIsOpen((prev) => !prev);
  const {userName , department} = useUserStore();

  const navItems = [
    { path: "/session", label: "ACTIVITY" },
    { path: "/study", label: "STUDY" },
    { path: "/project", label: "PROJECT" },
    { path: "/apply", label: "APPLY" },
  ];

  const popOverItems = department === "회장"
  ? [
      { label: "관리자 명단", onClick: () => navigate("/memberList") },
      { label: "가입 대기 명단", onClick: () => navigate("/waitingList") },
      { label: "로그아웃", onClick: () => handlePopOverClick("로그아웃") },
    ]
  : [
      { label: "로그아웃", onClick: () => handlePopOverClick("로그아웃") },
    ];


  const handlePopOverClick = (item) => {
    if (item === "로그아웃") {
      handleLogout();
    }
  };

  const handleLogout = async () => {

    try {
      await getLogout();
  
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("email");
      sessionStorage.clear();
  
      logout(); // Zustand 상태 초기화
  
      // 로그인 페이지로 이동 및 새로고침으로 쿠키 초기화
      window.location.href = "/login";
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };
  

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-6 px-[72px]
                bg-gradient-to-b from-black from-25% to-transparent"
    >
      <img src={TaveLogo} alt="Logo" className="w-25 cursor-pointer" onClick={() => window.location.href = "/session"}/>
      <ul className="flex items-center gap-x-4 text-white text-xl">
        {navItems.map(({ path, label }) => (
          <li key={label} className="py-2 px-4 font-bold">
            <a
              href={path}
              className={`cursor-pointer ${
                isActive(path) ? "text-[#195bff]" : ""
              }`}
            >
              {label}
            </a>
          </li>
        ))}
        <li
          className="text-[#bacdff] font-medium flex cursor-pointer gap-1"
          onClick={togglePopOver}
        >
          {department} {userName}님
          <img
            src={HeaderArrow}
            alt="HeaderArrow"
            className={`${isOpen ? "" : "scale-[-1]"}`}
          />
        </li>
        {isOpen && (
          <div
            className={`absolute right-0 mr-[78px] w-[143px] ${
              department === "회장" ? "top-[75px]" : "top-[70px]"
            }`}
          >
            <div className="flex flex-col gap-4 bg-[#2D2D2D] text-white rounded-[10px] px-4 py-3.5">
            {popOverItems.map((item, index) => (
              <div key={index} className="cursor-pointer font-medium text-lg" onClick={item.onClick} >
                {item.label}

                </div>
            ))}
            </div>
          </div>
        )}
      </ul>
    </header>
  );
}
