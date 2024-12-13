import React from "react";
import { useState, useRef, useEffect } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import HistoryBlock from "../components/historyBlock";
import Button from "../components/button";
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
    {
      number: 8,
      description: [
        "2021 빅콘테스트 챔피언리그 수산 Biz 분야 우수상",
        "ICT 멘토링 프로보노 공모전 대상",
        "제33회 한글 및 한국어 정보처리 학술대회에 논문 게재: HCLT Publishing “An Empirical Study of Topic Classification for Korean Newspaper Headlines”, HCLT 2021, (2021)",
        "Advance to the 19th Embedded Software Competition: Embedded Sw.System Industry Association President Award",
        "NVIDIA GTC 21 Teaching Assistant: Building Transformer-Based Natural Language Processing Applications - DLIW1390",
        "글로벌창업사관학교 기술교육 (Building Transformer Based Natural Language Processing) 멘토",
        "DSTC10 (Dialog System Technology Challenge) Track 5",
        "2021 삼성 주니어 소프트웨어 창작대회 최종 결선",
        "Autonomous Driving Software Challenge(ADSC) 장려상",
        "IPG Automotive 시뮬레이션 툴을 사용한 자율주행 소프트웨어 챌린지",
      ],
    },
    {
      number: 7,
      description: [
        "연세대학교 의과대학 논문 참여",
        "숙명여자대학교 스노우 소프트웨어 랩 1기 / 채식 다이어리 어플리케이션 ‘베지메이트' 개발 중",
        "2021 NVIDIA DLI Certificated Instructor Program(CIP)",
        "스노우 소프트웨어 랩 창업 프로그램 선발",
        "제 19회 임베디드 소프트웨어 경진 대회 휴머노이드 부문 수상",
        "2021 금융보안원 대학생 금융안캠프 아이디어 경진대회 최우수상",
        "2021한국통신학회 - 사용자의 선호도를 고려한 콘텐츠 캐싱을 위해 콘텐츠 캐싱과 추천시스템을 결합한 연속적인 공간에서의 심층강화학습 모델",
      ],
    },
    {
      number: 6,
      description: [
        "서울과학기술대학교 캡스톤 경진대회 2등",
        "위성 정보 활용 SPACE HACKATHON 장려상",
        "청각장애인 편의증진 ICT 공모전 최우수상",
        "2020 KB 국민은행 소프트웨어 경진대회 수상",
        "한글 및 한국어정보처리 학술대회 논문 게재",
        "2020 ETRI 자율성장 인공지능 경진대회 가작상 수상",
      ],
    },
    {
      number: 5,
      description: [
        "연세대학교 의과대학 논문 참여",
        "DACON 공모전 프로젝트 다수 참여",
        "빅콘테스트 혁신 아이디어 분야 2차 진출",
        "국립국어원 국어 정보 처리 시스템 경진대회 참여",
      ],
    },
    {
      number: 4,
      description: [
        "서울시립대 통계 프로그래밍 대회 1등",
        "네이버 확장 앱 공모전 3등",
        "뉴스 빅데이터 활용 분석 경진대회 우수상",
        "IT 기업 (주)노매드커넥션과 후원 체결",
        "스펙업 선정 대한민국 대표 동아리 30에 선정",
      ],
    },
    {
      number: 3,
      description: [
        "유비콤테크놀로지 후원사 연계 프로젝트",
        "강원도 스마트시티 해커톤 입선",
        "면세점 데이터 분석",
      ],
    },
    {
      number: "1-2",
      description: [
        "TAVE 창립",
        "TAVE 1기 회원 모집",
        "EXEM, (주)유비콤테크놀로지 후원사 선정",
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
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
      <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
        <div className="grid place-items-center">
          <Tab category={categories} link={links} currentIndex={1} />
        </div>
        <div className="flex justify-between mt-16">
          <SearchBar onSearch={input => setSearchInput(input)} />
          <button className="text-white w-25 bg-btn-blue items-center rounded-md py-2 px-5 p-2">이력 추가</button>
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
      <Footer />
    </div>
  );
}
