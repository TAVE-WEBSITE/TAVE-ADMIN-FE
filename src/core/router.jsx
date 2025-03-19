import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "../pages/main";
import Session from "../pages/session";
import History from "../pages/history";
import Review from "../pages/review";
import Login from "../pages/login";
import MemberJoin from "../pages/memberJoin";
import ForgotPassword from "../pages/forgotPassword";
import Study from "../pages/study";
import Project from "../pages/project";
import MemberList from "../pages/memberList";
import WaitingList from "../pages/waitingList";
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/regularsession" element={<Session />} />
        <Route path="/history" element={<History />} />
        <Route path="/review" element={<Review />} />
        <Route path="/login" element={<Login />} />
        <Route path="/memberjoin" element={<MemberJoin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/study" element={<Study />} />
        <Route path="/project" element={<Project />} />
        <Route path="/memberList" element={<MemberList />} />
        <Route path="/waitingList" element={<WaitingList />} />
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