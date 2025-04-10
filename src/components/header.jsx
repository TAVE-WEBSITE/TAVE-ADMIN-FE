import { useState } from "react";
import { useLocation } from "react-router-dom";
import TaveLogo from "../assets/images/taveLogo.svg";
import HeaderArrow from "../assets/images/headerArrow.svg";

export default function Header({ position = "staff" }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => {
    if (["/history", "/review", "/session"].includes(path)) {
      return ["/history", "/review", "/session"].includes(location.pathname);
    }
    return location.pathname === path;
  };
  const togglePopOver = () => setIsOpen((prev) => !prev);

  const navItems = [
    { path: "/session", label: "ACTIVITY" },
    { path: "/study", label: "STUDY" },
    { path: "/project", label: "PROJECT" },
    { path: "/apply", label: "APPLY" },
  ];

  const popOverItems = {
    president: ["관리자 명단", "가입 대기 명단", "로그아웃"],
    staff: ["로그아웃"],
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-6 px-[72px]
                bg-gradient-to-b from-black from-25% to-transparent"
    >
      <img src={TaveLogo} alt="Logo" className="w-25" />
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
          경영처 000님
          <img
            src={HeaderArrow}
            alt="HeaderArrow"
            className={`${isOpen ? "" : "scale-[-1]"}`}
          />
        </li>
        {isOpen && (
          <div
            className={`absolute right-0 mr-[78px] w-[143px] ${
              position === "president" ? "top-[75px]" : "top-[70px]"
            }`}
          >
            <div className="flex flex-col gap-4 bg-[#2D2D2D] text-white rounded-[10px] px-4 py-3.5">
              {popOverItems[position]?.map((item, index) => (
                <div className="cursor-pointer font-medium text-lg" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </ul>
    </header>
  );
}
