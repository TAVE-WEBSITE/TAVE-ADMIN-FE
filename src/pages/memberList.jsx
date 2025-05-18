import React from 'react';
import { useState, useEffect } from 'react';
import { getMemberList } from '../api/memberList';
import Tab from '../components/tab';
import Header from '../components/header';
import Pagination from '../components/pagination';
import SimpleModal from '../components/simpleModal';
import useUserStore from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export default function MemberList() {
    const [categories, setCategories] = useState(['회원 명단', '가입 대기 명단']);
    const [links, setLinks] = useState(['/memberList', '/waitingList']);
    const [memberData, setMemberData] = useState([]); // 회원 리스트

    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false); // 탈퇴 버튼 모달
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 탈퇴 완료 모달
    const [modalText, setModalText] = useState('');
    const [modalAdditionalText, setModalAdditionalText] = useState('');
    const [selectedMemberId, setSelectedMemberId] = useState(null); // 탈퇴 대상 ID

     useEffect(() => {
      fetchMemberList();
    }, []);

    const {department} = useUserStore();
    const navigate = useNavigate();
    useEffect( () => {
        if(department !== "회장"){
            navigate('/session');
        }
    },[])

    // 운영진 멤버 목록 불러오기
    const fetchMemberList = async () => {
      try {
        const data = await getMemberList();
        setMemberData(data.content || []);
        console.log(memberData);
      } catch (error) {
        console.error("회원 명단 조회 실패", error);
      }
    };

    // const memberData = [
    //     {
    //         name: '테이비',
    //         team: '회장',
    //         position: '-',
    //         id: 'qwerty1',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '경영처',
    //         position: '처원',
    //         id: 'qwerty2',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '경영처',
    //         position: '처원',
    //         id: 'qwerty3',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '경영처',
    //         position: '처장',
    //         id: 'qwerty4',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '기술처',
    //         position: '처원',
    //         id: 'qwerty5',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '기술처',
    //         position: '처원',
    //         id: 'qwerty6',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '기술처',
    //         position: '처원',
    //         id: 'qwerty7',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    //     {
    //         name: '테이비',
    //         team: '기술처',
    //         position: '처원',
    //         id: 'qwerty8',
    //         generation: 13,
    //         agitId: 'agitId',
    //     },
    // ];

    const itemsPerPage = 6;

    const totalPages = Math.ceil(memberData.length / itemsPerPage);
    const memberDataPaged = memberData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    // 탈퇴 버튼 클릭 시 실행 (탈퇴할 멤버의 ID를 설정)
    const handleOpenModal = (member) => {
        setSelectedMemberId(member.id);
        setModalText(`${member.team} ${member.position} ${member.name}님을`);
        setModalAdditionalText('정말 탈퇴시키겠습니까?');
        setModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleMemberRemoval = () => {
        if (!selectedMemberId) {
            setModalText('오류');
            setModalAdditionalText('탈퇴할 회원을 찾을 수 없습니다.');
            setModalOpen(true);
            return;
        }

        // 선택된 멤버 찾기
        const memberToRemove = memberData.find((member) => member.id === selectedMemberId);
        if (memberToRemove) {
            // 기존 모달 닫기
            setModalOpen(false);

            // 탈퇴 완료 모달 열기
            setTimeout(() => {
                setModalText(`${memberToRemove.team} ${memberToRemove.position} ${memberToRemove.name}님의`);
                setModalAdditionalText('탈퇴 처리가 완료되었습니다.');
                setConfirmModalOpen(true); // "탈퇴 완료" 모달 열기
            }, 300);
        } else {
            setModalText('오류');
            setModalAdditionalText('탈퇴할 회원을 찾을 수 없습니다.');
            setModalOpen(true);
        }
    };

    return (
        <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
            <Header />
            <div className="grid place-items-center mb-20">
                <Tab category={categories} link={links} currentIndex={0} />
            </div>
            <div className="w-4/5 max-w-screen-xl mx-auto mb-40">
                <table className="w-full border-collapse text-white text-2xl leading-9 table-fixed ">
                    {/* 테이블 헤더 */}
                    <thead>
                        <tr className="font-regular border-b border-white/30 text-left mb-4">
                            <th className="py-5 px-4 w-32">이름</th>
                            <th className="py-5 px-4">소속부서</th>
                            <th className="py-5 px-4">직책</th>
                            <th className="py-5 px-4">이메일</th>
                            <th className="py-5 px-4 w-32">기수</th>
                            <th className="py-5 px-4">아지트</th>
                            <th className="py-5 px-4"></th> {/* 탈퇴 버튼 열  */}
                        </tr>
                    </thead>
                    {/* 테이블 바디 */}
                    <tbody>
                        {memberDataPaged.map((member, index) => (
                            <tr key={index} className="">
                                <td className="py-4 px-4">{member.username}</td>
                                <td className="py-4 px-4">{member.department}</td>
                                <td className="py-4 px-4">{member.job}</td>
                                {/* 닉네임 -> 이메일 데이터 교체 백엔드에게 연락 */}
                                <td className="py-4 px-4">{member.nickname}</td>
                                <td className="py-4 px-4">{member.generation}</td>
                                <td className="py-4 px-4">{member.agitId}</td>
                                <td className="py-4 px-4 w-12 text-center">
                                    <button
                                        className="w-20 rounded-lg bg-white/20 py-2 px-1 font-bold text-base hover:bg-white/30"
                                        onClick={() => handleOpenModal(member)}
                                    >
                                        탈퇴
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* 탈퇴 확인 모달 */}
                    {isModalOpen && (
    <SimpleModal
        title={modalText}
        description={modalAdditionalText}
        grayBtnText="취소"
        blueBtnText="탈퇴"
        onClickGray={handleCloseModal}      
        onClickBlue={handleMemberRemoval} 
        onClose={handleCloseModal} 
    />
)}

{isConfirmModalOpen && (
    <SimpleModal
        title={modalText}
        description={modalAdditionalText}
        blueBtnText="확인"
        onClickBlue={() => setConfirmModalOpen(false)}
        onClose={() => setConfirmModalOpen(false)}
    />
)}

                </table>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
