import React from "react";
import { useState, useEffect } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import HistoryBlock from "../components/historyBlock";
import SimpleModal from "../components/simpleModal";
import HistoryDialog from "../components/historyDialog";
import { getManagerHistory, postHistory } from "../api/history";

export default function History() {
  const categories = ["정규세션", "동아리 이력", "후기"];
  const links = ["/session", "/history", "/review"];
  const [isAddModal, setIsAddModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [histories, setHistories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchedData = searchInput
    ? histories.filter((item) =>
        item.details.some((detail) =>
          detail.description.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : histories;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getManagerHistory();
        if (response && Array.isArray(response)) {
          setHistories(response.slice().reverse());
          console.log(response);
        } else {
          setHistories([]);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistories([]);
      }
    };
    fetchData();
  }, []);

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
          {searchedData.length === 0 ? (
            <div className="text-center text-gray-500 text-2xl">
              검색 결과가 없습니다
            </div>
          ) : (
            searchedData.map((item) => (
              <HistoryBlock
                key={item.number}
                generation={item.generation}
                updatedTime={"24.11.13"}
                history={histories}
              />
            ))
          )}
        </div>
        {isAddModal && (
          <HistoryDialog type="register" onClose={() => setIsAddModal(false)} />
        )}
        {isConfirmModal && (
          <SimpleModal
            title="이력 등록 완료"
            description={`현재 시간 부로, 동아리 홈페이지에 공개됩니다. \n동의 하시겠습니까?`}
            grayBtnText="취소"
            blueBtnText="확인"
            onClickGray={() => setIsConfirmModal(false)}
          />
        )}
      </div>
    </div>
  );
}
