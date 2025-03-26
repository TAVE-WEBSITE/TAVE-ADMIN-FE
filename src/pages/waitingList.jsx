import React, { act } from 'react';
import { useState, useEffect } from 'react';
import Tab from '../components/tab';
import Header from '../components/header';
import Pagination from '../components/pagination';
import SimpleModal from '../components/simpleModal';

export default function WaitingList() {
    const [categories, setCategories] = useState(['회원 명단', '가입 대기 명단']);
    const [links, setLinks] = useState(['/memberList', '/waitingList']);
    // const [memberData, serMemberData] = useState([]); // 가입 대기 리스트
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalAdditionalText, setModalAdditionalText] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // 탈퇴 완료 모달
    const [actionType, setActionType] = useState('');

    const memberData = [
        {
            name: '테이비',
            team: '회장',
            position: '-',
            id: 'qwerty1',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '경영처',
            position: '처원',
            id: 'qwerty2',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '경영처',
            position: '처원',
            id: 'qwerty3',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '경영처',
            position: '처장',
            id: 'qwerty4',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '기술처',
            position: '처원',
            id: 'qwerty5',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '기술처',
            position: '처원',
            id: 'qwerty6',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '기술처',
            position: '처원',
            id: 'qwerty7',
            generation: 13,
            agitId: 'agitId',
        },
        {
            name: '테이비',
            team: '기술처',
            position: '처원',
            id: 'qwerty8',
            generation: 13,
            agitId: 'agitId',
        },
    ];
    // useEffect(() => {
    //   fetchWaitingList();
    // }, []);

    // const fetchWaitingList = async () => {
    //   try {
    //     const data = await getWaitingList();
    //     serMemberData(data || []);
    //     console.log(data)
    //   } catch (error) {
    //     console.error("가입 대기 명단 조회 실패", error);
    //   }
    // };

    const itemsPerPage = 6;

    const totalPages = Math.ceil(memberData.length / itemsPerPage);
    const memberDataPaged = memberData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNum) => setCurrentPage(pageNum);

    const handleOpenModal = (member, action) => {
        setSelectedMember(member);
        setActionType(action);

        const text = `${member.team} ${member.position} ${member.name}님의`;
        const additionalText = action === 'approve' ? '가입을 승인하시겠습니까?' : '가입을 거절하시겠습니까?';

        setModalText(text);
        setModalAdditionalText(additionalText);

        setModalOpen(true);
    };

    // 첫 번째 모달 닫기
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // 승인 / 거절 실행
    const handleApproveOrReject = () => {
        if (!selectedMember) {
            setModalText('오류');
            setModalAdditionalText('회원을 찾을 수 없습니다.');
            setModalOpen(true);
            return;
        }

        // 첫 번째 모달 닫기
        setModalOpen(false);

        // 상태 업데이트를 보장하기 위해 최신 값을 사용
        setActionType((prevAction) => {
            setTimeout(() => {
                setModalText(`${selectedMember.team} ${selectedMember.position} ${selectedMember.name}님에게`);
                setModalAdditionalText(
                    prevAction === 'approve' ? '가입 승인 메일이 발송되었습니다.' : '가입 거절 메일이 발송되었습니다.'
                );

                setConfirmModalOpen(true); // 두 번째 모달 열기
            }, 300);

            return prevAction; // 기존 상태 유지
        });
    };

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
                                        <button
                                            className="w-20 rounded-lg bg-[#FF0073CC] py-2 px-1 font-bold text-base hover:bg-[#FF0073BB]"
                                            onClick={() => handleOpenModal(member, 'reject')}
                                        >
                                            거절
                                        </button>
                                        <button
                                            className="w-20 rounded-lg bg-[#195BFF] py-2 px-1 font-bold text-base hover:bg-[#195BFFCC]"
                                            onClick={() => handleOpenModal(member, 'approve')}
                                        >
                                            승인
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            {isModalOpen && (
                <SimpleModal
                    text={modalText}
                    additionalText={modalAdditionalText}
                    buttonType="confirm"
                    isAvailable={true}
                    showCancel={true}
                    onClose={handleCloseModal}
                    onConfirm={handleApproveOrReject}
                />
            )}
            {isConfirmModalOpen && (
                <SimpleModal
                    text={modalText}
                    additionalText={modalAdditionalText}
                    buttonType="confirm"
                    isAvailable={true}
                    showCancel={false}
                    onClose={() => setConfirmModalOpen(false)}
                />
            )}
        </div>
    );
}
