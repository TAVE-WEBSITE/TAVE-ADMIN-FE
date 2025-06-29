import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Session from "../pages/session";
import History from "../pages/history";
import Review from "../pages/review";
import Login from "../pages/login";
import Join from "../pages/join";
import ForgotPassword from "../pages/forgotPassword";
import Study from "../pages/study";
import Project from "../pages/project";
import MemberList from "../pages/memberList";
import WaitingList from "../pages/waitingList";
import Apply from "../pages/apply";
import { postRefreshToken } from "../api/login";

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  const excludedPaths = ["/join", "/forgotPassword"];

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
      const email = sessionStorage.getItem("email");
      if (excludedPaths.includes(currentPath)) {
      } else if (email) {
        const refreshAccessToken = async () => {
          try {
            const response = await postRefreshToken(email);
            if (response.status === 200) {
              const newAccessToken = response.data.result.accessToken;
              sessionStorage.setItem("access_token", newAccessToken);
            } else {
              navigate("/");
            }
          } catch (error) {
            if (!excludedPaths.includes(currentPath)) {
              navigate("/");
            }
          }
        };
        refreshAccessToken();
      } else {
        navigate("/");
      }
    }
  }, [currentPath]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/session" element={<Session />} />
        <Route path="/history" element={<History />} />
        <Route path="/review" element={<Review />} />
        <Route path="/join" element={<Join />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/study" element={<Study />} />
        <Route path="/project" element={<Project />} />
        <Route path="/memberList" element={<MemberList />} />
        <Route path="/waitingList" element={<WaitingList />} />
        <Route path="/apply" element={<Apply />} />
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
