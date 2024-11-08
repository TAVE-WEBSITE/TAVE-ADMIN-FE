import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SessionBlock from "../components/sessionBlock";

export default function Session() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  return (
    <div className="mt-40">
      <Header />
      <div className="m-auto w-4/5">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={0} />
        </div>
        <div className="flex justify-between mt-16">
          <p>드롭다운</p>
          <p>세션추가</p>
        </div>
              <div className="grid place-items-center grid-cols-3 gap-8 mt-12">
                <SessionBlock/>
        </div>
      </div>
    </div>
  );
}
