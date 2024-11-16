import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";

export default function Review() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  return (
    <div className="mt-40">
      <Header />
      <Tab category={categories} link={links} currentIndex={2} />
    </div>
  );
}
