import BlogIcon from '../assets/images/BlogIcon.svg';
import InstaIcon from '../assets/images/InstaIcon.svg';
import MailIcon from '../assets/images/MailIcon.svg';
import MessageIcon from '../assets/images/MessageIcon.svg';

export default function Footer() {
    return (
        <footer className="relative mx-0 bottom-0 w-full mt-52 flex px-36 py-10 z-50 justify-between bg-[#393A40]">
            <div className="flex flex-col gap-4 text-[#A7A7A7]">
                <p className="mb-4">TECHNOLOGY WAVE</p>
                <p>TAVE (4차 산업혁명 연합 동아리)</p>
                <p>ⓒ TAVE. 2018 - 2024 All Rights Reserved</p>
            </div>
            <div className="flex gap-2.5 items-end">
                <img src={MessageIcon} alt="message" />
                <img src={MailIcon} alt="mail" />
                <a href="https://www.instagram.com/tave_wave/" target="_blank">
                    <img src={InstaIcon} alt="instagram" />
                </a>
                <a href="https://blog.naver.com/t-ave" target="_blank">
                    <img src={BlogIcon} alt="bold" />
                </a>
            </div>
        </footer>
    );
}