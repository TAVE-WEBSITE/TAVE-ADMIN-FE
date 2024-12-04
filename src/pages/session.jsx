import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SessionBlock from "../components/sessionBlock";
import DropDown from "../components/dropdown";
import Footer from "../components/footer";

export default function Session() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  const [batch, setBatch] = useState("ALL");
  const batchList = ["ALL", "14기", "13기", "12기"];


  return (
    <div
    className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]"
  >
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={0} />
        </div>
        <div className="flex justify-between mt-16">
          <div className="relative inline-block">
            <DropDown
              valueList={batchList}
              setValue={setBatch}
            />
          </div>

          <p>세션추가</p>
        </div>
        <div className="grid place-items-center sm:grid-cols-2 md:grid-cols-3 gap-12 mt-12">
          <SessionBlock title={"OT"} />
          <SessionBlock title={"MT"} />
          <SessionBlock title={"만남의 장"} />
          <SessionBlock title={"테버랜드"} />
          <SessionBlock title={"전반기 시상식"} />
          <SessionBlock title={"테런데이"} />
          <SessionBlock title={"테런데이"} />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
