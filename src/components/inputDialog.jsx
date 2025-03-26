import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';
import MemberInput from './memberInput';

export default function InputDialog({ type, title, onClose, detailData }) {
    const studyLabels = {
        generation: '기수',
        category: '분야',
        subject: '스터디 주제',
        teamName: '스터디 팀 이름',
        webLink: '블로그 링크',
    };

    const projectLabels = {
        generation: '기수',
        category: '프로젝트 종류',
        subject: '프로젝트 주제',
        teamName: '프로젝트 팀 이름',
        webLink: '블로그 링크',
    };

    const handleChange = (key, value) => {};

    const handleValidChange = (key, isValid) => {
        console.log(`${key}의 입력 유효성: ${isValid}`);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col">
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    {type} {title === 'register' ? '등록하기' : '수정하기'}
                    <img src={CloseIcon} onClick={onClose} alt="close" />
                </div>
                <div className="p-6 flex flex-col gap-6">
                    <MemberInput
                        text="기수"
                        onChange={handleChange}
                        onValidChange={handleValidChange}
                        user_width="w-full"
                        hint="ex.13"
                        type="MODAL"
                        essentialText="비밀번호를 입력해주세요."
                    ></MemberInput>
                    <MemberInput
                        text="기수"
                        onChange={handleChange}
                        onValidChange={handleValidChange}
                        user_width="w-full"
                        hint="ex.13"
                        type="MODAL"
                        essentialText="비밀번호를 입력해주세요."
                    ></MemberInput>
                    <MemberInput
                        text="기수"
                        onChange={handleChange}
                        onValidChange={handleValidChange}
                        user_width="w-full"
                        hint="ex.13"
                        type="MODAL"
                        essentialText="비밀번호를 입력해주세요."
                    ></MemberInput>
                    <MemberInput
                        text="기수"
                        onChange={handleChange}
                        onValidChange={handleValidChange}
                        user_width="w-full"
                        hint="ex.13"
                        type="MODAL"
                        essentialText="비밀번호를 입력해주세요."
                    ></MemberInput>
                </div>
                <div className="flex gap-3 pr-6 pl-[270px] justify-end">
                    <Button text="취소" />
                    <Button text="등록" />
                </div>
            </div>
        </div>
    );
}
