import React from "react";

export default function HistoryElements({ number, history }) {
  // 동아리 이력을 기수별로 구분
  const filteredHistory = Array.isArray(history)
    ? history.filter(item => item.number === number)
    : [];

  return (
    <div>
      {/* 기수 별로 이력이 뜨도록 표시 */}
      {filteredHistory.map((item, index) => (
        <div key={index}>
          {/* 같은 기수 내에서 이력이 개별적으로 뜨도록 */}
          {item.description.map((desc, descIndex) => (
            <div
              key={descIndex}
              className="w-full h-24 bg-gray-100 rounded-[30px] p-8 flex items-center justify-between mb-4"
            >
              <div className="text-3xl font-normal text-gray-800">{desc}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
