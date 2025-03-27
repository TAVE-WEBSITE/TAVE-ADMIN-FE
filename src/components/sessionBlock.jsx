import React, { useState } from 'react';
import SimpleModal from './simpleModal';
import SessionDialog from './sessionDialog';
import { modifySession, deleteSession } from '../api/session';

export default function SessionBlock({ sessionId, title, description, eventDay, imgUrl }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // 수정 다이얼로그 상태 추가
    const [selectedSession, setSelectedSession] = useState(null); // 선택된 세션 상태 추가
    const [sessionData, setSessionData] = useState({
        title,
        description,
        eventDay,
        imgUrl,
    });

    const handleClickSession = () => {
        setSelectedSession({ sessionId, title, description });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditDialogOpen(false); // 모달 닫을 때 수정 다이얼로그 상태 초기화
    };

    const handleEditSession = () => {
        setIsEditDialogOpen(true); // 수정 다이얼로그 열기
        setIsModalOpen(false); // 기존 모달 닫기
    };

    const handleDeleteSession = async () => {
        console.log('세션 삭제');
        try {
            await deleteSession(selectedSession.sessionId); // API 호출
            setIsModalOpen(false);
            console.log('세션 삭제 완료');
        } catch (error) {
            console.error('세션 삭제 실패', error);
        }
    };

    const handleSubmitEdit = async (updatedData) => {
        console.log('세션 수정');
        try {
            await modifySession(selectedSession.sessionId, updatedData); // 수정된 데이터 API 호출
            setSessionData(updatedData); // 수정된 데이터를 상태에 반영
            setIsEditDialogOpen(false); // 수정 다이얼로그 닫기
            console.log('세션 수정 완료');
        } catch (error) {
            console.error('세션 수정 실패', error);
        }
    };

    return (
        <div className="w-full items-center gap-12 relative" onClick={handleClickSession}>
            <div 
                className="w-full h-20 bg-neutral-600 bg-opacity-30 rounded-2xl backdrop-blur-blur flex items-center px-12 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${sessionData.imgUrl})` }}
            >
                <div className="absolute inset-0 bg-black opacity-55"></div>
                <div className="relative text-white text-2xl font-bold leading-9 px-4 py-2">
                    {sessionData.title}
                </div>
            </div>

            {/* 세션 삭제 및 수정 모달 */}
            {isModalOpen && selectedSession && (
                <SimpleModal
                    title={selectedSession.title}
                    sessionId={selectedSession.sessionId}
                    description={selectedSession.description}
                    grayBtnText="수정"
                    blueBtnText="삭제"
                    onClickGray={handleEditSession} // 수정 버튼 클릭 시 처리
                    onClickBlue={handleDeleteSession} // 삭제 버튼 클릭 시 처리
                    onClose={handleCloseModal}
                />
            )}

            {/* 세션 수정 다이얼로그 */}
            {isEditDialogOpen && (
                <SessionDialog
                type="modify"
                sessionId={selectedSession.sessionId}   
                    title={sessionData.title}
                    description={sessionData.description}
                    eventDay={sessionData.eventDay} // eventDay도 수정 가능
                    onSubmit={handleSubmitEdit} // 수정된 데이터를 전달
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
