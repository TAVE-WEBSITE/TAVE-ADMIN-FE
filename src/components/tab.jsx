import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Tab({ category, link, currentIndex }) {
    const [selectedIndex, setSelectedIndex] = useState(currentIndex);

    const navigate = useNavigate();

    useEffect(() => {
        setSelectedIndex(currentIndex);
    }, [currentIndex]);

    const handleClick = (index) => {
        setSelectedIndex(index);
        navigate(`${link[index]}`);
    };

    return (
        <div className="flex gap-2">
            {category.map((name, index) => (
                <div
                    key={index}
                    className={`px-5 py-2 text-2xl font-bold cursor-pointer ${
                        selectedIndex === index ? 'text-white' : 'text-[#A7A7A7]'
                    }`}
                    onClick={() => handleClick(index)}
                >
                    {name}
                </div>
            ))}
        </div>
    );
}
