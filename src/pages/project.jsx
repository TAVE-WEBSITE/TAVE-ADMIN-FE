import React from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../components/header";
import DropDown from "../components/dropdown";
import File from "../components/file";
import Footer from "../components/footer";

export default function Project() {
  const [batch, setBatch] = useState("ALL");
  const batchList = ["ALL", "14기", "13기", "12기"];
  const [field, setField] = useState("연합 프로젝트");
  const fieldList = ["연합 프로젝트", "심화 프로젝트"];
  const fileSet = [
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 연합 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '연합',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    {
        type: 'prooject',
        title: '프로젝트 이름 심화 아기하마',
        teamNum: 14,
        teamName: '아기하마',
        category: '심화',
    },
    ];
    
    
const [selectedCategory, setSelectedCategory] = useState('ALL');
    // 카테고리에 따라 필터링
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredFileSet = fileSet.filter((file) => {
        if (selectedCategory === 'ALL') return true;
        if (selectedCategory === '연합 프로젝트')
            return file.category === '연합';
        if (selectedCategory === '심화 프로젝트')
            return file.category === '심화';
        return false;
    });
  return (
    <div className="pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
      <Header />

      <div className="m-auto w-4/5 max-w-screen-xl">
        <h1 className="mr-auto text-white text-4xl">PROJECT 관리</h1>
        <h3 className="mr-auto text-white font-medium text-xl mt-8">
        역대 기수들의 프로젝트 조회 및 수정을 하는 페이지입니다
        </h3>
        <div className="flex mt-16 gap-6">
  <div className="w-20">
    <DropDown valueList={batchList} setValue={setBatch} />
  </div>
  <div className="w-36">
    <DropDown valueList={fieldList} setValue={setField} />
  </div>
</div>

<div className="grid grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 pt-[48px] mt-12 justify-items-center">
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
