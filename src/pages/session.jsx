import React from 'react';
import Tab from '../components/tab';
import Header from '../components/header';
import SessionBlock from '../components/sessionBlock';
import SessionDialog from '../components/sessionDialog';
import Pagination from '../components/pagination';
import { useSessions } from '../store/useSessions';
import useSessionStore from '../store/sessionStore';

export default function Session() {
    const categories = ['정규세션', '동아리 이력', '후기'];
    const links = ['/session', '/history', '/review'];

    const { data: sessions = [], isLoading, isError } = useSessions();

    const { currentPage, setCurrentPage, isModalOpen, openModal, closeModal } = useSessionStore();

    const sessionsPerPage = 5;
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
    const totalPages = Math.ceil(sessions.length / sessionsPerPage);

    const handleAddSession = () => {
        console.log('새 세션 추가');
        closeModal();
    };

    return (
        <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
            <Header />
            <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
                <div className="grid place-items-center">
                    <Tab category={categories} link={links} currentIndex={0} />
                </div>
                <div className='flex justify-end mt-12'>
                    <button
                        onClick={openModal}
                        className='bg-[#1A5BFF] h-12 px-5 py-2 rounded-lg inline-flex justify-center items-center gap-2 text-white text-lg font-semibold cursor-pointer'>
                        세션 추가
                    </button>
                </div>

                <div className="flex flex-col gap-5 justify-between mt-10">
                    {isLoading ? (
                        <p className="text-white text-center w-full">로딩 중...</p>
                    ) : isError ? (
                        <p className="text-white text-center w-full">세션 조회 실패</p>
                    ) : (
                        currentSessions.map((session) => (
                            <SessionBlock
                                key={session.sessionId}
                                sessionId={session.sessionId}
                                title={session.title}
                                description={session.description}
                                eventDay={session.eventDay}
                                imgUrl={session.imgUrl}
                                period={session.period}
                            />
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}

                {isModalOpen && (
                    <SessionDialog
                        type="register"
                        onClose={closeModal}
                        onSubmit={handleAddSession}
                    />
                )}
            </div>
        </div>
    );
}
