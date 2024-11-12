import React from "react";
import { useState, useRef } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SessionBlock from "../components/sessionBlock";
import DropDown from "../components/dropdown";
import useDropClose from "../hooks/dropClose";
import ArrowDown from "../assets/images/arrowDown.png";
import ArrowUp from "../assets/images/arrowUp.png";

export default function Session() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  const dropDownRef = useRef();

  const [batch, setBatch] = useState("ALL");
  const batchList = ["ALL", "14기", "13기", "12기"];

  const [isOpen, setIsOpen] = useDropClose(dropDownRef, false);
  return (
    <div className="mt-40">
      <Header />
      <div className="m-auto w-4/5">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={0} />
        </div>
        <div className="flex justify-between mt-16">
          <div ref={dropDownRef} className="relative inline-block">
            <DropDown
              valueList={batchList}
              setValue={setBatch}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>

          <p>세션추가</p>
        </div>
        <div className="grid place-items-center grid-cols-3 gap-8 mt-12">
          <SessionBlock />
        </div>
      </div>
    </div>
  );
}
