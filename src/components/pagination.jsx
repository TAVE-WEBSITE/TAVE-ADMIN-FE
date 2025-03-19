import React from "react";
import RightArrow from "../assets/images/PageRightArrow.svg";
import LeftArrow from "../assets/images/PageLeftArrow.svg";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleClick = pageNum => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        className="px-3 py-1 mx-1 text-white bg-transparent rounded"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}>
        <img src={LeftArrow} alt="LeftArrow"></img>
      </button>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          className={`px-2 py-1 mx-1 rounded ${
            currentPage === idx + 1
              ? "bg-transparent underline text-white"
              : "bg-transparent text-white/50"
          }`}
          onClick={() => handleClick(idx + 1)}>
          {idx + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 mx-1 text-white bg-transparent rounded"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <img src={RightArrow} alt="RightArrow"></img>
      </button>
    </div>
  );
}