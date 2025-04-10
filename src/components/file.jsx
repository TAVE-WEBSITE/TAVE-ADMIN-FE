import React, { useMemo } from 'react';

const File = ({ type, title, teamNum, teamName, category }) => {
    const studyVariants = [];

    const studyVariant = useMemo(() => {
        return studyVariants[Math.floor(Math.random() * studyVariants.length)];
    }, []);

    return (
        <div>
            <div
                className="relative w-[194px] h-[164px] md:w-[269px] md:h-[230px] bg-no-repeat cursor-pointer"
                style={{
                    backgroundImage: `url(${studyVariant.back})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    className="absolute w-[194px] h-[140px] md:w-[270px] md:h-[195px] mt-7 md:mt-[44px] flex items-center bg-no-repeat justify-center "
                    style={{
                        backgroundImage: `url(${studyVariant.front})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-sm md:text-lg font-bold font-Pretendard">{title}</h2>
                    <p className="text-xs font-normal font-Pretendard">
                        {teamNum}기 {teamName}팀
                    </p>
                </div>
            </div>
        </div>
    );
};

export default File;
