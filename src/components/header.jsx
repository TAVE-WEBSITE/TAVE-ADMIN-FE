import React from 'react';
import TaveLogo from '../assets/images/taveLogo.svg';

export default function Header() {
    return (
        <header className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between py-4 px-20 bg-[#D9D9D9]`}>
            <div className="items-start">
                <img src={TaveLogo} className="w-32 h-auto"></img>
            </div>
            <nav className="flex items-end text-white">
                <ul className="flex items-center gap-x-10">
                    <li>
                        <a href="study" className="cursor-pointer">
                            STUDY
                        </a>
                    </li>
                    <li>
                        <a href="project" className="cursor-pointer">
                            PROJECT
                        </a>
                    </li>
                    <li>
                        <a href="regularsession" className="cursor-pointer">
                            ACTIVITY
                        </a>
                    </li>
                    <li>
                        <a href="apply" className="cursor-pointer">
                            APPLY
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
