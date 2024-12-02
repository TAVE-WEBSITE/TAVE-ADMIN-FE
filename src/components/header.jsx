import React from 'react';
import { useLocation } from 'react-router-dom';
import TaveLogo from '../assets/images/taveLogo.svg';
import Arrow from "../assets/images/HeaderArrowUp.svg"

export default function Header() {
    const location = useLocation();
  
    const isActive = (path) => location.pathname === path;
    return (
        <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-20 bg-[#121212]`}>
            <div className="items-start">
                <img src={TaveLogo} className="w-32 h-auto"></img>
            </div>
            <nav className="flex items-end text-white">
                <ul className="flex items-center gap-x-10">
                <li>
                        <a href="regularsession"  className={`cursor-pointer ${isActive('/regularsession') ? 'text-[#195bff]' : ''}`}>
                            ACTIVITY
                        </a>
                    </li>
                    <li>
                        <a href="study"  className={`cursor-pointer ${isActive('/study') ? 'text-[#195bff]' : ''}`}>
                            STUDY
                        </a>
                    </li>
                    <li>
                        <a href="project"  className={`cursor-pointer ${isActive('/project') ? 'text-[#195bff]' : ''}`}>
                            PROJECT
                        </a>
                    </li>
                   
                    <li>
                        <a href="apply"  className={`cursor-pointer ${isActive('/apply') ? 'text-[#195bff]' : ''}`}>
                            APPLY
                        </a>
                    </li>
                    <li className='text-[#BACEFF] font-medium flex cursor-pointer'>경영처 000님
                        <img src={Arrow} alt='HeaderArrow'></img>
                    </li>
                </ul>
                
            </nav>
        </header>
    );
}
