import React from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import HistoryBlock from "../components/historyBlock";
import HistoryDialog from "../components/historyDialog";
import { useHistories } from "../hooks/useHistory";
import useHistoryStore from "../store/historyStore";

export default function History() {
  const categories = ["정규세션", "동아리 이력", "후기"];
  const links = ["/session", "/history", "/review"];

  const { data: histories = [], isLoading } = useHistories();
  const { isAddModal, searchInput, setIsAddModal, setSearchInput } = useHistoryStore();

  const searchedData = searchInput
    ? histories.filter((item) =>
        item.details.some((detail) =>
          detail.description.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : histories;

  const date = (history) => {
    let result = 0;
    history.details.forEach((item) => {
      const words = item.lastUpdated.split("T");
      const word = Number(words[0].replaceAll("-", ""));
      if (word > result) result = word;
    });
    const numberDate = result.toString().slice(-6);
    return `${numberDate.slice(0, 2)}.${numberDate.slice(2, 4)}.${numberDate.slice(4, 6)}`;
  };

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={1} />
        </div>
        <div className="flex justify-between mt-16">
          <SearchBar onSearch={(input) => setSearchInput(input)} />
          <button
            className="text-white w-25 bg-[#1A5BFF] items-center rounded-md py-2 px-5 p-2"
            onClick={() => setIsAddModal(true)}
          >
            이력 추가
          </button>
        </div>
        <div className="mt-12 flex flex-col gap-6">
          {isLoading ? (
            <div className="text-center text-gray-500 text-2xl">로딩 중...</div>
          ) : searchedData.length === 0 ? (
            <div className="text-center text-gray-500 text-2xl">
              검색 결과가 없습니다
            </div>
          ) : (
            searchedData.map((item) => (
              <HistoryBlock
                key={item.number}
                generation={item.generation}
                updatedTime={date(item)}
                history={histories}
              />
            ))
          )}
        </div>
        {isAddModal && (
          <HistoryDialog type="register" onClose={() => setIsAddModal(false)} />
        )}
      </div>
    </div>
  );
}
