import Button from './button';
import { useState } from 'react';
import { deleteReview } from '../api/review';

export default function ReviewBlock({ reviewProps, onReviewDeleted, onModify }) {
    const [isOpen, setIsopen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [generation, setGeneration] = useState('14기');

    const addBtn = () => {
        setIsopen(true);
    };

    const closeBtn = () => {
        setIsopen(false);
    };

    const handleDelete = async () => {
        if (window.confirm('후기를 삭제하시겠습니까?\n삭제 후 복원할 수 없습니다.')) {
            try {
                setIsDeleting(true);
                await deleteReview(reviewProps.id);
                if (onReviewDeleted) {
                    onReviewDeleted(reviewProps.id);
                }
            } catch (error) {
                console.error('후기 삭제 실패:', error);
                alert('후기 삭제에 실패했습니다.');
            } finally {
                window.location.reload();
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="w-280 bg-[#ffffff]/10 bg-opacity-80 rounded-md text-white">
            <div className="px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-bold">{reviewProps.nickname}</div>
                    <div className="text-xl font-bold text-[#868686] pl-2">
                        {reviewProps.generation} {reviewProps.field}
                    </div>
                    <div className="flex justify-between gap-2 ml-auto">
                        <Button 
                            text="수정" 
                            user_width="5rem" 
                            onClick={onModify}
                            disabled={isDeleting}
                            className="bg-[#5E5F63] text-[#B5BAC2] text-base px-5 py-3 rounded-md"
                        />
                        <Button 
                            text="삭제" 
                            user_width="5rem" 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-[#1A5BFF] text-white text-base px-5 py-3 rounded-md"
                        />
                    </div>
                </div>
                {/*버튼*/}
                <div className="text-lg font-light">{reviewProps.content}</div>
            </div>
        </div>
    );
}
