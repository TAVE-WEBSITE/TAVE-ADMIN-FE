import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Main from "../pages/main";
import Session from "../pages/session";
import History from "../pages/history";
import Review from "../pages/review";
import Inquiry from "../pages/inquiry";
import Login from "../pages/login";
import MemberJoin from "../pages/memberJoin";
import ForgotPassword from "../pages/forgotPassword";
import Study from "../pages/study";
import Project from "../pages/project";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/regularsession" element={<Session />} />
        <Route path="/history" element={<History />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberjoin" element={<MemberJoin />} />
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
