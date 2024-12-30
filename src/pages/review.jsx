import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import Footer from "../components/footer";
import DropDown from "../components/dropdown";
import ReviewBlock from "../components/reviewBlock";
import Button from "../components/button";
import ReviewModal from "../components/reviewModal";

export default function Review() {
  const [isOpen, setIsopen] = useState(false);
  const [generation, setGeneration] = useState("14기");
  const generationList = ["14기", "13기", "12기"];
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  const reviewInput = [
    {
      nickname: "테이부",
      generation: "13기",
      field: "프론트엔드",
      content: "내용은 아래와 같아 구체적으로 추후에 작성",
      isPublic: true,
    },
    {
      nickname: "테이부",
      generation: "13기",
      field: "프론트엔드",
      content: "내용은 아래와 같아 구체적으로 추후에 작성",
      isPublic: true,
    },
    {
      nickname: "테이부",
      generation: "13기",
      field: "프론트엔드",
      content: "내용은 아래와 같아 구체적으로 추후에 작성",
      isPublic: true,
    },
  ];
  const addBtn = () => {
    setIsopen(true);
  };

  const closeBtn = () => {
    setIsopen(false);
  };

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
        <div className="grid place-items-center mb-20">
          <Tab category={categories} link={links} currentIndex={2} />
        </div>
        <div className="flex justify-between ml-auto">
          <DropDown valueList={generationList} setValue={setGeneration} />
          <Button text="후기 추가" user_width="7rem" onClick={addBtn} />
        </div>
        <div className="grid sm:grid-colos-1 md:grid-cols-2 px-18 py-20 gap-4">
          {reviewInput.map((reviewProps, index) => (
            <ReviewBlock key={index} reviewProps={reviewProps} />
          ))}
        </div>
        <div className="flex justify-between mt-16"></div>
        <div className="mt-12 flex flex-col gap-8"></div>
      </div>
      <ReviewModal isOpen={isOpen} onClose={closeBtn} />
      <Footer />
    </div>
  );
}
