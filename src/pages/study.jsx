import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import DropDown from '../components/dropDown';
import File from '../components/file';
import PlusFile from '../components/plusFile';
import Pagination from '../components/pagination';

export default function Study() {
    const [batch, setBatch] = useState('ALL');
    const batchList = ['ALL', '14기', '13기', '12기'];
    const [field, setField] = useState('ALL');
    const fieldList = ['ALL', 'Web/App', 'Back', 'DeepLearning', 'DataAnalysis'];
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const baseURL = 'http://3.35.207.95:8080';

    async function getStudy() {
        try {
            const response = await axios.get(baseURL + '/v1/normal/study');
            console.log(response.data.result);
        } catch (e) {
            console.error(e);
        }
    }
    getStudy();

    const fileSet = [
        {
            type: 'study',
            title: '스터디 이름 웹/앱 아기하마',
            teamNum: 14,
            teamName: '아기하마',
            field: 'Web/App',
        },
        {
            type: 'study',
            title: '스터디 이름 웹/앱 아기하마',
            teamNum: 14,
            teamName: '아기하마',
            field: 'Web/App',
        },
        {
            type: 'study',
            title: '스터디 이름 웹/앱 아기고양이',
            teamNum: 13,
            teamName: '아기고양이',
            field: 'Web/App',
        },
        {
            type: 'study',
            title: '스터디 이름 웹/앱 아기고양이',
            teamNum: 12,
            teamName: '아기고양이',
            field: 'Web/App',
        },
        {
            type: 'study',
            title: '스터디 이름 백 아기갱얼쥐',
            teamNum: 14,
            teamName: '아기갱얼쥐',
            field: 'Back',
        },
        {
            type: 'study',
            title: '스터디 이름 백 아기갱얼쥐',
            teamNum: 13,
            teamName: '아기갱얼쥐',
            field: 'Back',
        },
        {
            type: 'study',
            title: '스터디 이름 백 아기햄서터',
            teamNum: 12,
            teamName: '아기햄서터',
            field: 'Back',
        },
        {
            type: 'study',
            title: '스터디 이름 딥러닝 아기햄서터',
            teamNum: 14,
            teamName: '아기햄서터',
            field: 'DeepLearning',
        },

        {
            type: 'study',
            title: '스터디 이름 딥러닝 아기하마',
            teamNum: 14,
            teamName: '아기하마',
            field: 'DeepLearning',
        },
        {
            type: 'study',
            title: '스터디 이름 딥러닝 아기하마',
            teamNum: 13,
            teamName: '아기하마',
            field: 'DeepLearning',
        },
        {
            type: 'study',
            title: '스터디 이름 딥러닝 아기하마',
            teamNum: 12,
            teamName: '아기하마',
            field: 'DeepLearning',
        },
        {
            type: 'study',
            title: '스터디 이름 데분 아기하마',
            teamNum: 14,
            teamName: '아기하마',
            field: 'DataAnalysis',
        },
        {
            type: 'study',
            title: '스터디 이름 데분 아기하마',
            teamNum: 13,
            teamName: '아기하마',
            field: 'DataAnalysis',
        },
        {
            type: 'study',
            title: '스터디 이름 데분 아기하마',
            teamNum: 12,
            teamName: '아기하마',
            field: 'DataAnalysis',
        },
    ];

    const filteredFileSet = fileSet.filter((file) => {
        const isFieldMatch = field === 'ALL' || file.field === field;
        const isBatchMatch = batch === 'ALL' || file.teamNum === parseInt(batch.replace('기', ''), 10);
        const isSearchMatch = !searchTerm || file.title.includes(searchTerm) || file.teamName.includes(searchTerm);

        return isFieldMatch && isBatchMatch && isSearchMatch;
    });

    const itemsPerPage = 7;

    const totalPages = Math.ceil(filteredFileSet.length / itemsPerPage);
    const paginatedData = filteredFileSet.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = (term) => setSearchTerm(term);
    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    return (
        <div className="flex flex-col pt-32 min-h-screen bg-[#121212]">
            <Header />

            <div className="m-auto w-5/6 max-w-screen-xl flex-grow pb-40">
                <h1 className="mr-auto text-white text-4xl">STUDY 관리</h1>
                <h3 className="mr-auto text-white font-medium text-xl mt-5">
                    역대 기수들의 스터디 조회 및 수정을 하는 페이지입니다.
                </h3>
                <div className="flex mt-16 justify-between">
                    <div className="flex gap-6">
                        <div className="w-20">
                            <DropDown valueList={batchList} setValue={setBatch} user_width="5rem" />
                        </div>
                        <div className="w-36">
                            <DropDown valueList={fieldList} setValue={setField} />
                        </div>
                    </div>

                    <SearchBar onSearch={handleSearch} />
                </div>

                <div className="grid grid-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-6 mt-12 justify-items-center">
                    <PlusFile />
                    {paginatedData.map((data, index) => (
                        <File
                            key={index}
                            type={data.type}
                            title={data.title}
                            teamNum={data.teamNum}
                            teamName={data.teamName}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
