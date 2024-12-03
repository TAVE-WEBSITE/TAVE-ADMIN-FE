import React from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../components/header";
import SearchBar from "../components/searchBar";
import DropDown from "../components/dropdown";
import File from "../components/file";
import PlusFile from "../components/plusFile";
import Footer from "../components/footer";

export default function Project() {
  const [batch, setBatch] = useState("ALL");
  const batchList = [
    "ALL",
    "14기",
    "13기",
    "12기",
    "11기",
    "10기",
    "9기",
    "8기",
    "7기",
  ];
  const [field, setField] = useState("ALL");
  const fieldList = ["ALL", "연합 프로젝트", "심화 프로젝트"];
  const [searchTerm, setSearchTerm] = useState("");

  const baseURL = "http://3.35.207.95:8080";

  async function getProject() {
    try {
      const response = await axios.get(baseURL + "/v1/normal/project");
      console.log(response.data.result);
    } catch (e) {
      console.error(e);
    }
  }
  getProject();

  const fileSet = [
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 14,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 14,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기고양이",
      teamNum: 13,
      teamName: "아기고양이",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기고양이",
      teamNum: 13,
      teamName: "아기고양이",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기갱얼쥐",
      teamNum: 12,
      teamName: "아기갱얼쥐",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기갱얼쥐",
      teamNum: 12,
      teamName: "아기갱얼쥐",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 11,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 11,
      teamName: "아기하마",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 10,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 10,
      teamName: "아기하마",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 9,
      teamName: "아기하마",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 9,
      teamName: "아기하마",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 8,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 8,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 연합 아기하마",
      teamNum: 7,
      teamName: "아기하마",
      field: "연합",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 7,
      teamName: "아기하마",
      field: "심화",
    },
    {
      type: "prooject",
      title: "프로젝트 이름 심화 아기하마",
      teamNum: 7,
      teamName: "아기하마",
      field: "심화",
    },
  ];

  const filteredFileSet = fileSet.filter(file => {
    const isFieldMatch = field === "ALL" || file.field === field;
    const isBatchMatch =
      batch === "ALL" || file.teamNum === parseInt(batch.replace("기", ""), 10);
    const isSearchMatch =
      !searchTerm ||
      file.title.includes(searchTerm) ||
      file.teamName.includes(searchTerm);

    return isFieldMatch && isBatchMatch && isSearchMatch;
  });

  const handleFieldChange = value => {
    if (value === "ALL") setField("ALL");
    else if (value === "연합 프로젝트") setField("연합");
    else if (value === "심화 프로젝트") setField("심화");
  };

  const handleSearch = term => {
    setSearchTerm(term);
  };
  const backgroundColor =
    "linear-gradient(180deg, rgba(76, 76, 76, 1), rgba(27, 27, 27, 1))";
  const boxShadow = "0px 4.61px 9.22px 0px rgba(0, 0, 0, 0.1)";

  return (
    <div className="pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />

      <div className="m-auto w-4/5 max-w-screen-xl">
        <h1 className="mr-auto text-white text-4xl">PROJECT 관리</h1>
        <h3 className="mr-auto text-white font-medium text-xl mt-8">
          역대 기수들의 프로젝트 조회 및 수정을 하는 페이지입니다
        </h3>
        <div className="flex mt-16 justify-between">
          <div className="flex gap-6">
            <div className="w-20">
              <DropDown valueList={batchList} setValue={setBatch} />
            </div>
            <div className="w-36">
              <DropDown valueList={fieldList} setValue={handleFieldChange} />
            </div>
          </div>

          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 pt-[48px] mt-12 justify-items-center">
          <PlusFile/>
          {filteredFileSet.map((data, index) => {
            return (
              <File
                key={index}
                type={data.type}
                title={data.title}
                teamNum={data.teamNum}
                teamName={data.teamName}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
