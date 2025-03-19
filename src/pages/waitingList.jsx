import React from "react";
import { useState } from "react";
import Tab from "../components/tab";
import Header from "../components/header";
import Pagination from "../components/pagination";
import Footer from "../components/footer";

export default function WaitingList() {
const [categories, setCategories] = useState(["회원 명단", "가입 대기 명단"]);
const [links, setLinks] = useState(["/memberList", "/waitingList"]);
  const [currentPage, setCurrentPage] = useState(1);

  
const memberData = [
    {
      name: "테이비",
      team: "회장",
      position: "-",
      id: "qwer123",
      generation: 13,
      agitId: "agitId"
    },
    {
      name: "테이비",
      team: "경영처",
      position: "처원",
      id: "qwer123",
      generation: 13,
      agitId: "agitId"
    },
    {
      name: "테이비",
      team: "경영처",
      position: "처원",
      id: "qwer123",
      generation: 13,
      agitId: "agitId"
    },
    {
        name: "테이비",
        team: "경영처",
        position: "처장",
        id: "qwer123",
        generation: 13,
        agitId: "agitId"
      },
      {
        name: "테이비",
        team: "기술처",
        position: "처원",
        id: "qwer123",
        generation: 13,
        agitId: "agitId"
      },
      {
        name: "테이비",
        team: "기술처",
        position: "처원",
        id: "qwer123",
        generation: 13,
        agitId: "agitId"
      },
      {
        name: "테이비",
        team: "기술처",
        position: "처원",
        id: "qwer123",
        generation: 13,
        agitId: "agitId"
      },
      {
        name: "테이비",
        team: "기술처",
        position: "처원",
        id: "qwer123",
        generation: 13,
        agitId: "agitId"
      },
  ];

  const itemsPerPage = 6;

  const totalPages = Math.ceil(memberData.length / itemsPerPage);
  const memberDataPaged = memberData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = pageNum => setCurrentPage(pageNum);

  return (
    <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />
       <div className="grid place-items-center mb-20">
            <Tab category={categories} link={links} currentIndex={1} />
        </div>
        <div className="w-4/5 max-w-screen-xl mx-auto mb-40">
            <table className="w-full border-collapse text-white text-2xl leading-9 table-fixed ">
            {/* 테이블 헤더 */}
                <thead>
                    <tr className="font-normal border-b border-white/30 text-left mb-4">
                        <th className="py-5 px-4 w-32">이름</th>
                        <th className="py-5 px-4">소속부서</th>
                        <th className="py-5 px-4">직책</th>
                        <th className="py-5 px-4">아이디</th>
                        <th className="py-5 px-4 w-32">기수</th>
                        <th className="py-5 px-4">아지트</th>
                        <th className="py-5 px-4"></th> {/* 탈퇴 버튼 열  */}
                    </tr>
                </thead>

            {/* 테이블 바디 */}
                <tbody>
                    {memberDataPaged.map((member, index) => (
                        <tr key={index} className="">
                            <td className="py-4 px-4">{member.name}</td>
                            <td className="py-4 px-4">{member.team}</td>
                            <td className="py-4 px-4">{member.position}</td>
                            <td className="py-4 px-4">{member.id}</td>
                            <td className="py-4 px-4">{member.generation}</td>
                            <td className="py-4 px-4">{member.agitId}</td>
                            <td className="py-4 px-4 text-center">
                                <div className="flex gap-2 items-center justify-center">
                                <button className="w-20 rounded-lg bg-[#FF0073CC] py-2 px-1 font-bold text-base hover:bg-white/30">
                                    거절
                                </button>
                                <button className="w-20 rounded-lg bg-[#195BFF] py-2 px-1 font-bold text-base hover:bg-white/30">
                                    승인
                                </button>
                                </div>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           <Pagination
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={handlePageChange}
                   />
        </div>

      <Footer/>
    </div>
  );
}
