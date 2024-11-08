import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tab({ category, link, currentIndex }) {
    // 현재 페이지의 인덱스로 초기 state 설정
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);

  const navigate = useNavigate();

    // 인덱스가 바뀔때마다 렌더링
  useEffect(() => {
    setSelectedIndex(currentIndex);
  }, [currentIndex]);

    // 버튼 클릭 시, 인덱스를 수정하고 이동
  const handleClick = index => {
    setSelectedIndex(index);
    navigate(`${link[index]}`);
  };

  return (
    <div className="flex flex-row gap-20">
      {category.map((name, index) => (
        <div
          key={index}
          className={`text-2xl font-bold leading-9 cursor-pointer ${
            selectedIndex === index ? "text-black" : "text-[#7E7E7E]"
          }`}
          onClick={() => handleClick(index)}>
          {name}
        </div>
      ))}
    </div>
  );
}
