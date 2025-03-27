import React, { useEffect, useState } from 'react';
import { getSession } from '../api/session';
import Tab from '../components/tab';
import Header from '../components/header';
import SessionBlock from '../components/sessionBlock';
import SessionDialog from '../components/sessionDialog';

export default function Session() {
    const categories = ['정규세션', '동아리 이력', '후기'];
    const links = ['/session', '/history', '/review'];

    const [sessions, setSessions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function loadSessions() {
            try {
                const response = await getSession();
                if (response) {
                    setSessions(response);
                } else {
                    setSessions([]);
                }
            } catch (error) {
                console.error("세션 데이터 조회 오류", error);
                setSessions([]);
            }
        }
        loadSessions();
    }, []);

    // 세션 추가 버튼 모달
    const handleCreateSession = () => {
        setIsModalOpen(true); 
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    }

    // 세션 추가 버튼 모달 액션
    const handleAddSession = () => {
        console.log('새 세션 추가');
        setIsModalOpen(false);
    }

    return (
        <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
            <Header />
            <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
                <div className="grid place-items-center">
                    <Tab category={categories} link={links} currentIndex={0} />
                </div>
                <div className='flex justify-end mt-12'>
                    <button
                        onClick={handleCreateSession}
                        className='bg-[#1A5BFF] h-12 px-5 py-2 rounded-lg inline-flex justify-center items-center gap-2 text-white text-lg font-semibold cursor-pointer'>
                        세션 추가
                    </button>
                </div>

                <div className="flex flex-col gap-5 justify-between mt-10">
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <SessionBlock
                                key={session.sessionId}
                                title={session.title}
                                description={session.description}
                                eventDay={session.eventDay}
                                imgUrl={session.imgUrl}
                            />
                        ))
                    ) : (
                        <p className="text-white text-center w-full">세션 조회 실패</p>
                    )}
                </div>

                {isModalOpen && (
    <SessionDialog
        type="register"
        onClose={handleCloseModal}
        onSubmit={handleAddSession}
        
    />
)}


            </div>
        </div>
    );
}
