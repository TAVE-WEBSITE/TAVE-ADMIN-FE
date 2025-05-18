import { useState, useEffect } from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import DropDown from '../components/dropDown';
import File from '../components/file';
import Pagination from '../components/pagination';
import WriteDialog from '../components/writeDialog';
import { getProject, postProject, modifyProject, deleteProject } from '../api/project';
import DetailDialog from '../components/detailDialog';

export default function Project() {
    const [batch, setBatch] = useState('ALL');
    const [batchList, setBatchList] = useState(['ALL']);
    const [field, setField] = useState('ALL');
    const fieldList = ['ALL', '연합 프로젝트', '심화 프로젝트'];
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModifyOpen, setIsModifyOpen] = useState(false);
    const [fileSet, setFileSet] = useState([]);
    const [detailData, setDetailData] = useState({});

    const fieldMapping = {
        ALL: 'ALL',
        '연합 프로젝트': '연합',
        '심화 프로젝트': 'ADVANCED',
    };

    useEffect(() => {
            async function fetchProject() {
                try {
                    const projectData = await getProject();
                    setFileSet(projectData.content);
                    console.log(projectData.content);
                    // generation 값을 기준으로 batchList 업데이트
                    const uniqueGenerations = new Set(projectData.content.map((file) => file.generation));
                    const sortedGenerations = Array.from(uniqueGenerations)
                        .sort((a, b) => parseInt(b) - parseInt(a)) // 내림차순 정렬
                        .map((gen) => `${gen}기`); 
                    setBatchList((prevBatchList) => ['ALL', ...sortedGenerations]); // 'ALL' 포함
                } catch (e) {
                    console.log(e);
                }
            }
            fetchProject();
        }, []);
   
    const filteredFileSet = fileSet.filter((file) => {
        const isFieldMatch = field === 'ALL' || file.field === fieldMapping[field];
        const isBatchMatch = batch === 'ALL' || file.generation === batch.replace('기', '');
        const isSearchMatch = !searchTerm || file.description.includes(searchTerm) || file.title.includes(searchTerm);

        return isFieldMatch && isBatchMatch && isSearchMatch;
    });

    const itemsPerPage = 7;

    const totalPages = Math.ceil(filteredFileSet.length / itemsPerPage);
    const paginatedData = filteredFileSet.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = (term) => setSearchTerm(term);
    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    const handleDetailClick = (projectId) => {
        const projectDetail = fileSet.find((file) => file.id === projectId);
        setDetailData(projectDetail);
        setIsDetailOpen(true);
    };

    return (
        <div className="pt-[150px] pb-14 min-h-screen">
            <Header />
            <div className="m-auto max-w-screen-xl px-[72px]">
                <p className="text-white text-[40px] font-bold">PROJECT 관리</p>
                <p className="text-white opacity-70 font-medium text-xl">
                    역대 기수들의 프로젝트 조회 및 수정을 하는 페이지입니다.
                </p>
                <div className="flex mt-8 justify-between">
                    <div className="flex gap-6 z-50 w-[35%]">
                        <DropDown type="default" valueList={batchList} setValue={setBatch} essential={false} />
                        <DropDown type="default" valueList={fieldList} setValue={setField} essential={false} />
                    </div>
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-4 gap-10 mt-[60px] mb-6">
                    <File
                        type="plus"
                        plusType="project"
                        onClick={() => {
                            setIsRegisterOpen(true);
                        }}
                    />
                    {paginatedData.map((data, index) => (
                        <File
                            key={index}
                            type="project"
                            generation={data.generation}
                            title={data.description}
                            teamName={data.title}
                            imageUrl={data.imageUrl}
                            onClick={() => handleDetailClick(data.id)}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            {isDetailOpen && (
                <DetailDialog
                    onModify={() => {
                        setIsModifyOpen(true);
                        setIsDetailOpen(false);
                    }}
                    onDelete={() => {
                        console.log('delete');
                    }}
                    type="project"
                    detailData={detailData}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}
            {isRegisterOpen && (
                <WriteDialog
                    type="project"
                    onClose={() => setIsRegisterOpen(false)}
                    onSubmit={(formData) => {
                        postProject(formData);
                    }}
                />
            )}
            {isModifyOpen && (
                <WriteDialog
                    pageType="modify"
                    type="project"
                    initialData={detailData}
                    onClose={() => setIsModifyOpen(false)}
                    onSubmit={(formData) => {
                        modifyProject(formData);
                    }}
                />
            )}
        </div>
    );
}
