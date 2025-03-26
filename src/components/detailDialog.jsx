import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';

export default function DetailDialog({ type, onClose, detailData }) {
    const studyLabels = {
        generation: '기수',
        field: '분야',
        topic: '스터디 주제',
        teamName: '스터디 팀 이름',
        blogUrl: '블로그 링크',
    };

    const projectLabels = {
        generation: '기수',
        field: '프로젝트 종류',
        description: '프로젝트 주제',
        title: '프로젝트 팀 이름',
        blogUrl: '블로그 링크',
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col">
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    <img src={CloseIcon} onClick={onClose} alt="close" />
                </div>
                <div className="pt-6 pb-12 px-6 grid grid-cols-2 gap-8">
                    {Object.keys(type === 'project' ? projectLabels : studyLabels).map((key, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2 font-semibold">
                                <p className="text-[#6c727f] text-sm">{projectLabels[key]}</p>
                                <p className="text-[#272d3a] text-lg">{'detailData[key]'}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-3 pr-6 pl-[270px] justify-end">
                    <Button text="수정" />
                    <Button text="삭제" />
                </div>
            </div>
        </div>
    );
}
