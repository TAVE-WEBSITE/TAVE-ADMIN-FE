import React from "react";
import { useState, useRef, useEffect } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import HistoryBlock from "../components/historyBlock";
import Footer from "../components/footer";

export default function History() {
  const categories = ["정규세션", "동아리 이력", "후기", "문의"];
  const links = ["/regularsession", "/history", "/review", "/inquiry"];

  // 동아리 이력 데이터
  const historyData = [
    {
      number: 13,
      description: ["AI 기반 차세대 갤러리 어플 `Pickle` 출시", "코드잇 제휴"],
    },
    {
      number: 12,
      description: [
        "2023 여름 SWU programming guru 장려상 : 컴퓨터비전 기반 안드로이드앱",
        "알고리즘 플랫폼 'Baekjoon'의 도우미 웹 사이트 '빨래벌존' 출시",
        "코드잇 제휴",
      ],
    },

    {
      number: 11,
      description: [
        "2023 SE:AME Hackathon 은상",
        "하나 디지털파워온 1기 우수상 수상",
        "구글플레이스토어 반려동물 AI 질환 진단 및 건강관리 어플리케이션 `멍냥백서` 출시",
      ],
    },
    {
      number: 10,
      description: [
        "제 4회 성균관대학교 북커톤 최우수상",
        "한국정보처리학회 ACK 2022 논문경진대회 장려상",
        "제 1회 신.빅.해 신한금융투자 데이터분석 부문 장려상",
      ],
    },

    {
      number: 9,
      description: [
        "알파코 MOU 체결",
        "KDD 2022 (ACM SIGKDD Conference on Knowledge Discovery and Data Mining) 논문 게재: Learning Fair Representation via Distributional Contrastive Disentanglement",
        "2022 Azure Virtual Hackathon 대상",
        "The 3rd AI SPARK Challenge 최우수상",
        "The IEEE / CVF Computer Vision and Pattern Recognition Conference (CVPR, 2022)",
        "ECCV 2022 - Poster Session",
      ],
    },
  ];

  const [searchInput, setSearchInput] = useState("");

  const searchedData = searchInput
    ? historyData.filter(item =>
        item.description.some(desc =>
          desc.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : historyData;

  return (
    <div className="pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={1} />
        </div>
        <div className="flex justify-between mt-16">
          <SearchBar onSearch={input => setSearchInput(input)} />
          <p>이력추가</p>
        </div>
        <div className="mt-12 flex flex-col gap-8">
          {searchedData.length === 0 ? (
            <div className="text-center text-gray-500 text-2xl">
              검색 결과가 없습니다
            </div>
          ) : (
            searchedData.map(item => (
              <HistoryBlock
                key={item.number}
                number={item.number}
                updatedTime={"24.11.13"}
                history={historyData}
              />
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
