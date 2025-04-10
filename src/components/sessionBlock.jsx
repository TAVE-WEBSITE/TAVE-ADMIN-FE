import React, { useState } from 'react';
import SimpleModal from './simpleModal';
import SessionDialog from './sessionDialog';
import { modifySession, deleteSession } from '../api/session';

export default function SessionBlock({ sessionId, title, description, eventDay, imgUrl }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
    const [selectedSession, setSelectedSession] = useState(null); 
    const [sessionData, setSessionData] = useState({
        title,
        description,
        eventDay,
        imgUrl,
    });

    const handleClickSession = () => {
        setSelectedSession({ sessionId, title, description, eventDay, imgUrl });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditDialogOpen(false);
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
        } catch (error) {
            console.error('세션 삭제 실패', error);
        }
    };

    const handleSubmitEdit = async (updatedData) => {
        console.log('세션 수정');
        try {
            await modifySession(selectedSession.sessionId, updatedData); 
            setSessionData(updatedData); 
            setIsEditDialogOpen(false); 
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

            {/* 세션 삭제/수정 모달 */}
            {isModalOpen && selectedSession && (
                <SimpleModal
                    title={selectedSession.title}
                    sessionId={selectedSession.sessionId}
                    description={selectedSession.description}
                    grayBtnText="수정"
                    blueBtnText="삭제"
                    onClickGray={handleEditSession} 
                    onClickBlue={handleDeleteSession} 
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
                    eventDay={sessionData.eventDay} 
                    onSubmit={handleSubmitEdit} 
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
