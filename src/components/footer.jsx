import BlogIcon from '../assets/images/BlogIcon.svg';
import InstaIcon from '../assets/images/InstaIcon.svg';
import MailIcon from '../assets/images/MailIcon.svg';
import MessageIcon from '../assets/images/MessageIcon.svg';

export default function Footer() {
    return (
        <footer className="mt-auto w-full flex px-36 py-10 bg-[#393A40] text-[#A7A7A7] justify-between">
            <div className="flex flex-col gap-4">
                <p className="mb-4">TECHNOLOGY WAVE</p>
                <p>TAVE (4차 산업혁명 연합 동아리)</p>
                <p>ⓒ TAVE. 2018 - 2024 All Rights Reserved</p>
            </div>
            <div className="flex gap-2.5 items-end">
                <img src={MessageIcon} alt="message" />
                <img src={MailIcon} alt="mail" />
                <a href="https://www.instagram.com/tave_wave/" target="_blank" rel="noopener noreferrer">
                    <img src={InstaIcon} alt="instagram" />
                </a>
                <a href="https://blog.naver.com/t-ave" target="_blank" rel="noopener noreferrer">
                    <img src={BlogIcon} alt="blog" />
                </a>
            </div>
        </footer>
    );
}