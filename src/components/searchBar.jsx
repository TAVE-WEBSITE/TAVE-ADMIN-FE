import React from "react";
import { useState } from "react";
import search from "../assets/images/search.svg";

export default function SearchBar({onSearch}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };
  const handleEnterKey = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-72 h-12 border border-gray-300 rounded-full font-extralight pl-6 bg-white">
      <input
        placeholder="검색어를 입력해주세요."
        onChange={handleInputChange}
        onKeyDown={handleEnterKey}
        className="outline-none"></input>
      <img
        src={search}
        alt="searchIcon"
        onClick={handleSearch}
        className="cursor-pointer"></img>
    </div>
  );
}
