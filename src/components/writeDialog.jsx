import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';
import DialogInput from './dialogInput';
import DropDown from './dropDown';
import { useState, useEffect } from 'react';

// type - register, modify 야호

export default function WriteDialog({ pageType, type, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        blogUrl: '',
        field: '',
        generation: '',
        teamName: '',
        topic: '',
        imageUrl: '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        generation: false,
        field: false,
        teamName: false,
        topic: false,
        blogUrl: false,
        imageUrl: false,
    });

    const studyValueList = ['선택', 'Web/App', 'Back', 'DeepLearning', 'DataAnalysis'];
    const projectValueList = ['선택', '연합 프로젝트', '심화 프로젝트'];

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        setIsValidateTrigger(true);

        const newErrors = {
            generation: !formData.generation.trim(),
            field: !formData.field.trim(),
            teamName: !formData.teamName.trim(),
            topic: !formData.topic.trim(),
            blogUrl: !formData.blogUrl.trim(),
            imageUrl: type === 'project' && !formData.imageUrl.trim(),
        };

        setErrors(newErrors);

        if (
            !newErrors.generation &&
            !newErrors.field &&
            !newErrors.teamName &&
            !newErrors.topic &&
            !newErrors.blogUrl &&
            (!newErrors.imageUrl || type === 'project')
        ) {
            onSubmit(formData);
            onClose();
        }
            console.log("handleSubmit" , isValidateTrigger,  newErrors);
    };

    useEffect(() => {
        if (pageType === 'modify' && initialData) {
            setFormData(initialData);
        }
    }, [pageType, initialData]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    {pageType === 'register' ? '등록하기' : '수정하기'}
                    <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <DialogInput
                        text="기수"
                        placeholder="ex. 1기"
                        value={formData.generation}
                        onChange={(e) => handleChange('generation', e.target.value)}
                        essentialText="* 기수를 입력해주세요."
                        essential={true}
                        initialValue={initialData?.generation}
                        isValidateTrigger={isValidateTrigger && errors.generation}
                    />
                <div className='flex flex-col gap-2 text-base font-medium'>
                    <div className='gap-0.5'><span className="text-[#394150] ">분야</span>
                    <span className="text-[#ff0072]/80"> *</span></div>
                    <DropDown
                        type="dialog"
                        initialValue={initialData?.field}
                        valueList={type === 'study' ? studyValueList : projectValueList}
                        setValue={(value) => handleChange('field', value)}
                        essentialText={`* ${type === 'study' ? '분야' : '프로젝트 종류'}를 선택해주세요.`}
                        essential={true}
                        isValidateTrigger={isValidateTrigger && errors.field}
                    />
                </div>
                    
                    <DialogInput
                        text={type === 'study' ? '스터디 주제' : '프로젝트 주제'}
                        placeholder={type === 'study' ? 'ex. 리액트 기초' : 'ex. 자유롭게 기재'}
                        value={formData.topic}
                        initialValue={initialData?.topic}
                        onChange={(e) => handleChange   ('topic', e.target.value)}
                        essentialText={`* ${type === 'study' ? '스터디' : '프로젝트'} 주제를 입력해주세요.`}
                        essential={true}
                        isValidateTrigger={isValidateTrigger && errors.topic}
                    />
                    <DialogInput
                        text={`${type === 'study' ? '스터디' : '프로젝트'} 팀 이름`}
                        placeholder="ex. 하츄핑"
                        initialValue={initialData?.teamName}
                        value={formData.teamName}
                        onChange={(e) => handleChange('teamName', e.target.value)}
                        essentialText={`* ${type === 'study' ? '스터디' : '프로젝트'} 팀 이름을 입력해주세요.`}
                        essential={true}
                        isValidateTrigger={isValidateTrigger && errors.teamName}
                    />
                    <DialogInput
                        text="블로그 링크"
                        placeholder="ex. https://blog.naver.com"
                        initialValue={initialData?.blogUrl}
                        value={formData.blogUrl}
                        onChange={(e) => handleChange('blogUrl', e.target.value)}
                        essentialText="* 웹 링크를 입력해주세요"
                        essential={true}
                        isValidateTrigger={isValidateTrigger && errors.blogUrl}
                    />
                </div>
                <div className="flex gap-3 pr-6 pl-[270px] justify-end">
                    <Button
                        text="취소"
                        className="text-[#394150] text-base font-semibold px-5 py-3 bg-gray-200 rounded-[10px]"
                        onClick={onClose}
                    />
                    <Button
                        text="등록"
                        className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
