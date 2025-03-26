import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Main from "../pages/main";
import Session from "../pages/session";
import History from "../pages/history";
import Review from "../pages/review";
import Login from "../pages/login";
import MemberJoin from "../pages/memberJoin";
import ForgotPassword from "../pages/forgotPassword";
import Study from "../pages/study";
import Project from "../pages/project";
import { useEffect } from "react";
import { postRefreshToken } from "../api/login/postRefresh";
function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const excludedPaths = ["/memberJoin", "/forgotPassword"];

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
      const email = localStorage.getItem("email");
      if (excludedPaths.includes(currentPath)) {
        //여긴 리프레시 호출 안 하도록
      } else if (email) {
        // 리프레시 토큰 요청 함수 호출
        const refreshAccessToken = async () => {
          try {
            const response = await postRefreshToken(email);
            if (response.status === 200) {
              const newAccessToken = response.data.result.accessToken;
              sessionStorage.setItem("access_token", newAccessToken);
            } else {
              navigate("/login");
            }
          } catch (error) {
            if (!excludedPaths.includes(currentPath)) {
              //console.error("토큰 갱신 오류:", error);
              navigate("/login");
            }
          }
        };
        refreshAccessToken();
      } else {
        navigate("/login");
      }
    }
  }, [currentPath]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/regularsession" element={<Session />} />
        <Route path="/history" element={<History />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberJoin" element={<MemberJoin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/study" element={<Study />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </>
  );
}

export default function Router() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
