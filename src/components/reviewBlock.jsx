import React from "react";
import Button from "./button";
import DeleteButton from "./deleteButton";
import ReviewModal from "./reviewModal";
import { useState } from "react";

export default function ReviewBlock({ reviewProps }) {
  const [isOpen, setIsopen] = useState(false);
  const [generation, setGeneration] = useState("14기");
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
    alert(" 후기를 삭제하시겠습니까? \n 삭제 후 복원할 수 없습니다.");
  };
  return (
    <div className="w-280 bg-white bg-opacity-80 rounded-md">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">{reviewProps.nickname}</div>
          <div className="text-xl font-bold text-review-gray pl-2">
            {reviewProps.generation} {reviewProps.field}
          </div>
          <div className="flex justify-between gap-2 ml-auto">
            <Button text="수정" user_width="5rem" onClick={addBtn} />
            <DeleteButton text="삭제" user_width="5rem" onClick={deleteBtn} />
          </div>
        </div>
        {/*버튼*/}
        <div className="text-lg font-light">{reviewProps.content}</div>
      </div>
      <ReviewModal isOpen={isOpen} onClose={closeBtn} text="후기 수정하기" />
    </div>
  );
}
