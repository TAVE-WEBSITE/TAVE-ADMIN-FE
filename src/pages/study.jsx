import React, { useEffect, useState } from 'react';
import { getStudy } from '../api/study'; // 기존 연결 코드 사용
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import DropDown from '../components/dropDown';
import File from '../components/file';
import Pagination from '../components/pagination';

export default function Study() {
    const [batch, setBatch] = useState('ALL');
    const batchList = ['ALL', '14기', '13기', '12기'];
    const [field, setField] = useState('ALL');
    const fieldList = ['ALL', 'Web/App', 'Back', 'DeepLearning', 'DataAnalysis'];
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [studyData, setStudyData] = useState([]); // API로 받은 데이터 저장

    useEffect(() => {
        const fetchData = async () => {
            const result = await getStudy();
            if (result?.result?.content) {
                setStudyData(result.result.content);
            } else {
                setStudyData([]);
            }
        };
    
        fetchData();
    }, [batch, field, searchTerm, currentPage]);
    

    // ✅ 필터링
    const filteredStudyData = studyData.filter((item) => {
        const isSearchMatch = !searchTerm || item.title.includes(searchTerm) || item.teamName.includes(searchTerm);
        return isSearchMatch;
    });

    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredStudyData.length / itemsPerPage);
    const paginatedData = filteredStudyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                    {paginatedData.map((data, index) => (
                        <File
                            key={index}
                            type="study"
                            title={data.title}
                            teamNum={data.teamNum}
                            teamName={data.teamName}
                            field={data.field}
                        />
                    ))}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
