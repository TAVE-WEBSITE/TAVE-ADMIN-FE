import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';

//

export default function DetailDialog({ type, onClose, detailData, onDelete, onModify }) {
    const studyLabels = {
        generation: '기수',
        field: '분야',
        topic: '스터디 주제',
        teamName: '스터디 팀 이름',
        //blogUrl: '블로그 링크',
    };

    const projectLabels = {
        generation: '기수',
        field: '프로젝트 종류',
        description: '프로젝트 주제',
        title: '프로젝트 팀 이름',
        //blogUrl: '블로그 링크',
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[500px] py-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    {type === 'project' ? detailData.title : detailData.topic}
                    <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                </div>
                <div className="pt-6 pb-8 px-6 grid grid-cols-2 gap-8 w-full ">
                    {Object.keys(type === 'project' ? projectLabels : studyLabels).map((key, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2 font-semibold">
                                <p className="text-[#6c727f] text-sm">
                                    {type === 'project' ? projectLabels[key] : studyLabels[key]}
                                </p>
                                <p className="text-[#272d3a] text-lg">{detailData[key]}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-col gap-2 font-semibold pb-6 px-6">
                        <p className="text-[#6c727f] text-sm">
                            블로그 링크
                        </p>
                        <p
  className="text-[#272d3a] text-lg cursor-pointer underline whitespace-nowrap"
  onClick={() => window.open(detailData["blogUrl"], '_blank')}
>
  {detailData["blogUrl"]}
</p>

                </div>
                <div className="flex gap-3 pr-6 pl-[270px] justify-end">
                    <Button
                        text="수정"
                        className="text-[#394150] text-base font-semibold px-5 py-3 bg-gray-200 rounded-[10px]"
                        onClick={onModify}
                    />
                    <Button
                        text="삭제"
                        className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
}
