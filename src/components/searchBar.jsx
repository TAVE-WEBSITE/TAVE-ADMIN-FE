import React from "react";
import { useState } from "react";
import search from "../assets/images/search.svg";

export default function SearchBar({onSearch}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue.trim())
  };
  const handleEnterKey = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-72 h-12 rounded-full font-extralight pl-6 bg-transparent border border-[#FFFFFF] border-[0.5px]">
      <input
        placeholder="검색어를 입력해주세요."
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
        className="outline-none bg-transparent text-white"></input>
      <img
        src={search}
        alt="searchIcon"
        onClick={handleSearch}
        className="cursor-pointer w-6"></img>
    </div>
  );
}
