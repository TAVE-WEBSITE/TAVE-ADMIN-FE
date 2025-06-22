import React from 'react';
import { useState, useEffect } from 'react';
import Tab from '../components/tab';
import Header from '../components/header';
import DropDown from '../components/dropDown';
import ReviewBlock from '../components/reviewBlock';
import Button from '../components/button';
import ReviewDialog from '../components/reviewDialog';
import { getManagerReview, postReview } from '../api/review';

export default function Review() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState('register');
    const [selectedReview, setSelectedReview] = useState(null);
    const [generation, setGeneration] = useState('14기');
    const [reviewList, setReviewList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generationList = [
        '14기',
        '13기',
        '12기',
        '11기',
        '10기',
        '9기',
        '8기',
        '7기',
        '6기',
        '5기',
        '4기',
        '3기',
        '2기',
        '1기',
    ];
    const categories = ['정규세션', '동아리 이력', '후기'];
    const links = ['/session', '/history', '/review'];

    // 기수 변경 시 후기 리스트 다시 불러오기
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const generationNumber = generation.replace('기', '');
                const data = await getManagerReview(generationNumber);
                console.log('받아온 후기 데이터:', data);
                
                if (Array.isArray(data)) {
                    setReviewList(data);
                } else {
                    console.error('후기 데이터가 배열이 아닙니다:', data);
                    setReviewList([]);
                }
            } catch (error) {
                console.error('후기 조회 실패:', error);
                setError('후기 조회에 실패했습니다.');
                setReviewList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [generation]);

    const handleAddReview = () => {
        setDialogType('register');
        setSelectedReview(null);
        setIsDialogOpen(true);
    };

    const handleModifyReview = (review) => {
        setDialogType('modify');
        setSelectedReview(review);
        setIsDialogOpen(true);
    };

    const handleDialogSubmit = async (formData) => {
        try {
            // TODO: API 호출하여 후기 등록/수정 처리
            console.log('제출된 데이터:', formData);
            // 성공 후 리스트 새로고침
            //const generationNumber = formData.generation.replace('기', '');
            const data = await postReview(formData);
            setReviewList(data);
        } catch (error) {
            console.error('후기 처리 실패:', error);
            alert('후기 처리에 실패했습니다.');
        }
    };

    const handleReviewDeleted = (deletedId) => {
        setReviewList(prevList => prevList.filter(review => review.id !== deletedId));
    };

    return (
        <div className="flex flex-col pt-40 min-h-screen bg-gradient-to-b from-[#121212] via-[#121212] via-40% to-[#5586FF]">
            <Header />
            <div className="m-auto w-4/5 max-w-screen-xl flex-grow pb-40">
                <div className="grid place-items-center mb-20">
                    <Tab category={categories} link={links} currentIndex={2} />
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex justify-between w-28">
                        <DropDown
                            type="default"
                            valueList={generationList}
                            setValue={setGeneration}
                        />
                    </div>
                    <div>
                        <Button
                            text="후기 추가"
                            onClick={handleAddReview}
                            className="bg-[#1A5BFF] text-white text-base px-4 py-3.5 rounded-md"
                        />
                    </div>
                </div>
                
                <div className="grid sm:grid-colos-1 md:grid-cols-2 px-18 py-20 gap-4">
                    {isLoading ? (
                        <div className="text-white text-center w-full">로딩 중...</div>
                    ) : error ? (
                        <div className="text-white text-center w-full">{error}</div>
                    ) : !Array.isArray(reviewList) || reviewList.length === 0 ? (
                        <div className="text-white text-center w-full">해당 기수의 후기가 없습니다.</div>
                    ) : (
                        reviewList?.map((review) => (
                            <ReviewBlock 
                                key={review.id} 
                                reviewProps={{
                                    id: review.id,
                                    nickname: review.nickname,
                                    generation: review.generation,
                                    field: review.field,
                                    content: review.content,
                                    isPublic: review.isPublic,
                                }}
                                onReviewDeleted={handleReviewDeleted}
                                onModify={() => handleModifyReview(review)}
                            />
                        ))
                    )}
                </div>
                <div className="flex justify-between mt-16"></div>
                <div className="mt-12 flex flex-col gap-8"></div>
            </div>

            {isDialogOpen && (
                <ReviewDialog
                    type={dialogType}
                    onClose={() => setIsDialogOpen(false)}
                    onSubmit={handleDialogSubmit}
                    initialData={selectedReview}
                />
            )}
        </div>
    );
}
