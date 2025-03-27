import React, { useState } from 'react';
import SimpleModal from './simpleModal';

export default function SessionBlock({ title, description, eventDay, imgUrl }) {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedSession, setSelectedSession] = useState(null);

    const handleClickSession = () => {
        setSelectedSession({ title, description });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleEditSession = () => {
        console.log('세션 수정');
        setIsModalOpen(false);
    };

    const handleDeleteSession = () => {
        console.log('세션 삭제');
        setIsModalOpen(false);
    };

    return (
        <div className="w-full items-center gap-12 relative" onClick={handleClickSession}>
            <div 
                className="w-full h-20 bg-neutral-600 bg-opacity-30 rounded-2xl backdrop-blur-blur flex items-center px-12 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${imgUrl})` }}
            >
                <div className="absolute inset-0 bg-black opacity-55"></div>
                <div className="relative text-white text-2xl font-bold leading-9 px-4 py-2">
                    {title}
                </div>
            </div>

            {isModalOpen && selectedSession && (
                <SimpleModal
                    title={selectedSession.title}
                    description={selectedSession.description}
                    grayBtnText="수정"
                    blueBtnText="삭제"
                    onClickGray={handleEditSession}
                    onClickBlue={handleDeleteSession}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}