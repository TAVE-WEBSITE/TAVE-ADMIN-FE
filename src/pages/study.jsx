import { useState, useEffect } from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import DropDown from '../components/dropDown';
import File from '../components/file';
import Pagination from '../components/pagination';
import WriteDialog from '../components/writeDialog';
import { getStudy, modifyStudy, postStudy, deleteStudy } from '../api/study';
import DetailDialog from '../components/detailDialog';

export default function Study() {
    const [batch, setBatch] = useState('ALL');
    const [batchList, setBatchList] = useState(['ALL']);
    const [field, setField] = useState('ALL');
    const fieldList = ['ALL', 'Web/App', 'Back', 'DeepLearning', 'DataAnalysis', 'Design'];
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isModifyOpen, setIsModifyOpen] = useState(false);
    const [fileSet, setFileSet] = useState([]);
    const [detailData, setDetailData] = useState({});

    const fieldMapping = {
        ALL: 'ALL',
        'Web/App': 'FRONTEND',
        Back: 'BACKEND',
        DeepLearning: 'DEEPLEARNING',
        DataAnalysis: 'DATAANALYSIS',
        Design: 'DESIGN',
    };

    useEffect(() => {
        async function fetchStudy() {
            try {
                const studyData = await getStudy();
                setFileSet(studyData.content);
                
                // generation 값을 기준으로 batchList 업데이트
                const uniqueGenerations = new Set(studyData.content.map((file) => file.generation));
                const sortedGenerations = Array.from(uniqueGenerations)
                    .sort((a, b) => parseInt(b) - parseInt(a)) // 내림차순 정렬
                    .map((gen) => `${gen}기`); 
                setBatchList((prevBatchList) => ['ALL', ...sortedGenerations]); // 'ALL' 포함
            } catch (e) {
                console.log(e);
            }
        }
        fetchStudy();
    }, []);

    const filteredFileSet = (fileSet || []).filter((file) => {
        const isFieldMatch = field === 'ALL' || file.field === fieldMapping[field];
        const isBatchMatch = batch === 'ALL' || file.generation === batch.replace('기', '');
        const isSearchMatch = !searchTerm || file.topic.includes(searchTerm) || file.teamName.includes(searchTerm);
    
        return isFieldMatch && isBatchMatch && isSearchMatch;
    });
    

    const itemsPerPage = 7;
    const totalPages = Math.ceil(filteredFileSet.length / itemsPerPage);
    const paginatedData = filteredFileSet.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    const handleSearch = (term) => setSearchTerm(term);
    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    const handleDetailClick = (id) => {
        const studyDetail = fileSet.find((file) => file.studyId === id);
        setDetailData(studyDetail);
        setIsDetailOpen(true);
    };

    return (
        <div className="pt-[150px] pb-14 min-h-screen">
            <Header />
            <div className="m-auto max-w-screen-xl px-[72px]">
                <p className="text-white text-[40px] font-bold">STUDY 관리</p>
                <p className="text-white opacity-70 font-medium text-xl">
                    역대 기수들의 스터디 조회 및 수정을 하는 페이지입니다.
                </p>
                <div className="flex mt-8 justify-between">
                    <div className="flex gap-6 z-50 w-[35%]">
                        <DropDown type="default" valueList={batchList} setValue={setBatch} />
                        <DropDown type="default" valueList={fieldList} setValue={setField} />
                    </div>
                    <SearchBar onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-4 gap-10 mt-[60px] mb-6">
                    <File
                        type="plus"
                        plusType="study"
                        onClick={() => {
                            setIsRegisterOpen(true);
                        }}
                    />
                    {paginatedData.map((data, index) => (
                        <File
                            key={index}
                            type="study"
                            generation={data.generation}
                            title={data.topic}
                            teamName={data.teamName}
                            onClick={() => handleDetailClick(data.studyId)}
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
                    type="study"
                    detailData={detailData}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}
            {isRegisterOpen && (
                <WriteDialog
                    pageType="register"
                    type="study"
                    onClose={() => setIsRegisterOpen(false)}
                    onSubmit={async (formData) => {
                        try {
                            await postStudy(formData);
                            alert('스터디가 성공적으로 등록되었습니다.');
                            window.location.reload();
                        } catch (error) {
                            alert('스터디 등록에 실패했습니다. 다시 시도해주세요.');
                        }
                    }}
                />
            )}
            {isModifyOpen && (
                <WriteDialog
                    pageType="modify"
                    type="study"
                    initialData={detailData}
                    onClose={() => setIsModifyOpen(false)}
                    onSubmit={async (formData) => {
                        try {
                            await modifyStudy(detailData.studyId, formData);
                            alert('스터디가 성공적으로 수정되었습니다.');
                            window.location.reload();
                        } catch (error) {
                            alert('스터디 수정에 실패했습니다. 다시 시도해주세요.');
                        }
                    }}
                />
            )}
        </div>
    );
}
