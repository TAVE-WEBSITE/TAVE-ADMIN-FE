import { useState } from 'react';
import SearchIcon from '../assets/images/searchIcon.svg';

export default function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue.trim());
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex gap-10 justify-between items-center rounded-[28px] bg-[#6e7075]/10 py-3 px-5">
            <input
                placeholder="검색어를 입력해주세요."
                onChange={handleInputChange}
                onKeyDown={handleEnterKey}
                className="outline-none bg-transparent placeholder-[#81818a] text-lg font-medium text-white"
            ></input>
            <img src={SearchIcon} alt="searchIcon" onClick={handleSearch} className="cursor-pointer" />
        </div>
    );
}
