import React, { useMemo } from "react";
import FileBack from "../assets/images/FileBack.png";
import Back1 from "../assets/images/study/back1.png";
import Back2 from "../assets/images/study/back2.png";
import Back3 from "../assets/images/study/back3.png";
import Front1 from "../assets/images/study/front1.png";
import Front2 from "../assets/images/study/front2.png";
import Front3 from "../assets/images/study/front3.png";

const File = ({ type, title, teamNum, teamName, category }) => {
  const backgroundColor =
    "linear-gradient(180deg, rgba(76, 76, 76, 1), rgba(27, 27, 27, 1))";
  const boxShadow = "0px 4.61px 9.22px 0px rgba(0, 0, 0, 0.1)";

  const studyVariants = [
    { front: Front1, back: Back1 },
    { front: Front2, back: Back2 },
    { front: Front3, back: Back3 },
  ];

  const studyVariant = useMemo(() => {
    return studyVariants[Math.floor(Math.random() * studyVariants.length)];
  }, []);

  return (
    <div>
      <div
        className="relative w-[194px] h-[164px] md:w-[269px] md:h-[230px] bg-no-repeat cursor-pointer"
        style={{
          backgroundImage: `url(${studyVariant.back})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute w-[194px] h-[140px] md:w-[270px] md:h-[195px] mt-7 md:mt-[44px] flex items-center bg-no-repeat justify-center "
          style={{
            backgroundImage: `url(${studyVariant.front})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h2 className="text-sm md:text-lg font-bold font-Pretendard">
            {title}
          </h2>
          <p className="text-xs font-normal font-Pretendard">
            {teamNum}기 {teamName}팀
          </p>
        </div>
      </div>
    </div>
  );
};

export default File;
