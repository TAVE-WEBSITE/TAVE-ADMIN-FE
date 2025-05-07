import { useMemo } from 'react';
import FileOne from '../assets/images/fileOne.png';
import FileTwo from '../assets/images/fileTwo.png';
import FileThree from '../assets/images/fileThree.png';
import FileBack from '../assets/images/fileBack.png';
import FileFront from '../assets/images/fileFront.png';
import PlusIcon from '../assets/images/plusIcon.svg';

export default function File({ title, generation, teamName, imageUrl, type, onClick, plusType }) {
    const studyVariants = [FileOne, FileTwo, FileThree];

    const studyVariant = useMemo(() => {
        return studyVariants[Math.floor(Math.random() * studyVariants.length)];
    }, []);

    return (
        <div
            className={`relative w-[270px] cursor-pointer flex 
                ${type === 'plus' ? 'items-center justify-center h-[224px]' : 'items-end justify-start h-[225px]'}`}
            onClick={onClick}
            style={{
                backgroundImage: `url(${type === 'study' ? studyVariant : FileBack})`,
                backgroundSize: 'cover',
            }}
        >
            {type !== 'study' && (
                <img
                    src={type === 'plus' ? FileFront : imageUrl || FileFront}
                    alt="fileImage"
                    className="absolute w-[270px] h-[181px] bottom-0 left-0 object-cover rounded-[18px] z-0"
                />
            )}
            {type === 'plus' ? (
                <div className="flex flex-col items-center gap-1 z-10 mt-10">
                    <img src={PlusIcon} alt="plusIcon" />
                    <p className="text-white text-lg font-bold opacity-50">{plusType === 'study' ? '스터디' : '프로젝트'} 추가</p>
                </div>
            ) : (
                <div className="text-white px-5 py-6 z-10">
                    <p className="text-base font-bold">{title}</p>
                    <p className="text-[13px] font-normal">
                        {generation}기 {teamName} 팀
                    </p>
                </div>
            )}
        </div>
    );
}
