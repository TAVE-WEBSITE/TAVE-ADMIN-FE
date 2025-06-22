import React, { useState } from 'react';
import SimpleModal from './simpleModal';
import SessionDialog from './sessionDialog';
import { modifySession, deleteSession } from '../api/session';

export default function SessionBlock({ sessionId, title, description, eventDay, imgUrl, period }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
    const [selectedSession, setSelectedSession] = useState(null); 
    const [sessionData, setSessionData] = useState({
        title,
        description,
        eventDay,
        imgUrl,
        period: period || 'START',
    });

    const handleClickSession = () => {
        if (isModalOpen || isEditDialogOpen) {
            return;
        }
        setSelectedSession({ sessionId, title, description, eventDay, imgUrl, period: sessionData.period });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditDialogOpen(false);
        setSelectedSession(null);
    };

    const handleEditSession = () => {
        setIsEditDialogOpen(true); 
        setIsModalOpen(false); 
    };

    const handleDeleteSession = async () => {
        console.log('세션 삭제');
        try {
            await deleteSession(selectedSession.sessionId);
            setIsModalOpen(false);
            console.log('세션 삭제 완료');
           
            window.location.reload();
        } catch (error) {
            console.error('세션 삭제 실패', error);
        }
    };

    const handleSubmitEdit = async (updatedData) => {
        console.log('세션 수정');
    
        const formData = new FormData();
        formData.append('title', updatedData.title);
        formData.append('description', updatedData.description);
        formData.append('eventDay', updatedData.date);
        formData.append('period', updatedData.period);
    
        // 파일이 있을 경우만 추가
        if (updatedData.imgFile) {
            formData.append('file', updatedData.imgFile);
        }
    
        try {
            await modifySession(selectedSession.sessionId, formData); 
            setSessionData({
                title: updatedData.title,
                description: updatedData.description,
                eventDay: updatedData.date,
                imgUrl: updatedData.imgFile ? URL.createObjectURL(updatedData.imgFile) : sessionData.imgUrl,
                period: updatedData.period || 'START',
            });
            setIsEditDialogOpen(false); 
            console.log('세션 수정 완료');
            window.location.reload();
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

            {/* 세션 삭제/수정 모달 */}
            {isModalOpen && selectedSession && (
                <div onClick={(e) => e.stopPropagation()}>
                    <SimpleModal
                        title={selectedSession.title}
                        sessionId={selectedSession.sessionId}
                        description={`📅 ${selectedSession.eventDay}\n${selectedSession.description}`}
                        grayBtnText="수정"
                        blueBtnText="삭제"
                        onClickGray={handleEditSession} 
                        onClickBlue={handleDeleteSession} 
                        onClose={handleCloseModal}
                        showCloseButton={true}
                    />
                </div>
            )}

            {/* 세션 수정 다이얼로그 */}
            {isEditDialogOpen && (
                <div onClick={(e) => e.stopPropagation()}>
                    <SessionDialog
                        type="modify"
                        sessionId={selectedSession.sessionId}
                        existingSessionData={{
                            title: sessionData.title,
                            description: sessionData.description,
                            date: sessionData.eventDay,
                            period: sessionData.period || 'START', // 기본값 설정
                            imgUrl: sessionData.imgUrl,
                        }}
                        onSubmit={handleSubmitEdit} 
                        onClose={handleCloseModal}
                    />
                </div>
            )}
        </div>
    );
}
