import React from "react";
import { useState, useRef } from "react";
import Header from "../components/header";
import SessionBlock from "../components/sessionBlock";
import DropDown from "../components/dropdown";
import Footer from "../components/footer";

export default function Study() {
  const dropDownRef = useRef();

  const [batch, setBatch] = useState("ALL");
  const batchList = ["ALL", "14기", "13기", "12기"];
  const [field, setField] = useState("Web/App");
  const fieldList = ["Web/App", "Back", "DeepLearning", "DataAnalysis"];

  return (
    <div className="pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />

      <div className="m-auto w-4/5 max-w-screen-xl">
        <h1 className="mr-auto text-white text-4xl">STUDY 관리</h1>
        <h3 className="mr-auto text-white font-medium text-xl mt-8">
          역대 기수들의 스터디 조회 및 수정을 하는 페이지입니다.
        </h3>
        <div className="flex mt-16 gap-6">
  <div className="w-20">
    <DropDown valueList={batchList} setValue={setBatch} />
  </div>
  <div className="w-40">
    <DropDown valueList={fieldList} setValue={setField} />
  </div>
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
      <Footer />
    </div>
  );
}
