import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Main from "../pages/main";
import Session from "../pages/session";
import History from "../pages/history";
import Review from "../pages/review";
import Inquiry from "../pages/inquiry";

function AppRouter() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/regularsession" element={<Session />} />
        <Route path="/history" element={<History />} />
        <Route path="/review" element={<Review />} />
        <Route path="/inquiry" element={<Inquiry />} />
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
