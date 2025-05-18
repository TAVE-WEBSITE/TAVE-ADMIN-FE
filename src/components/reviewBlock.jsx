import Button from './button';
import { useState } from 'react';

export default function ReviewBlock({ reviewProps }) {
    const [isOpen, setIsopen] = useState(false);
    const [generation, setGeneration] = useState('14기');
    const addBtn = () => {
        setIsopen(true);
    };

    const closeBtn = () => {
        setIsopen(false);
    };
    /*
    nickname = "",
    generation = "",
    field = "",
    content = "",
    isPublic = false,*/
    const deleteBtn = () => {
        alert(' 후기를 삭제하시겠습니까? \n 삭제 후 복원할 수 없습니다.');
    };
    return (
        <div className="w-280 bg-white bg-opacity-80 rounded-md">
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-bold">{reviewProps.nickname}</div>
                    <div className="text-xl font-bold text-[#4D121212] pl-2">
                        {reviewProps.generation} {reviewProps.field}
                    </div>
                    <div className="flex justify-between gap-2 ml-auto">
                        <Button text="수정" user_width="5rem" onClick={addBtn} />
                    </div>
                </div>
                {/*버튼*/}
                <div className="text-lg font-light">{reviewProps.content}</div>
            </div>
        </div>
    );
}
