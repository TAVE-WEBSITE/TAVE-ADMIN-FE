import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Inquiry() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={3} />
        </div>
        <div className="flex justify-between mt-16">
          <p>이력추가</p>
        </div>
        <div className="mt-12 flex flex-col gap-8"></div>
      </div>
      <Footer />
    </div>
  );
}
