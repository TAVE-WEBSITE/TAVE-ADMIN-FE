import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';
import DialogInput from './dialogInput';
import TextArea from './textArea';
import { useState } from 'react';

// type - register, modify

export default function HistoryDialog({ type, onClose, onSubmit }) {
    const [formData, setFormData] = useState({ generation: '', history: '', description: '' });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({ generation: false, history: false, description: false });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
    };

    const handleSubmit = () => {
        setIsValidateTrigger(true);

        const newErrors = {
            generation: !formData.generation.trim(),
            history: !formData.history.trim(),
            description: !formData.description.trim(),
        };

        setErrors(newErrors);

        if (!newErrors.generation && !newErrors.history && !newErrors.description) {
            onSubmit(formData);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    {type === 'register' ? '이력 등록하기' : '이력 수정하기'}
                    <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <DialogInput
                        text="기수"
                        placeholder="ex. 13"
                        value={formData.generation}
                        onChange={(e) => handleChange('generation', e.target.value)}
                        essentialText="* 기수를 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.generation}
                    />
                    <DialogInput
                        text="이력"
                        placeholder="ex. 서울과학기술대학교 캡스톤 경진대회 2등"
                        value={formData.history}
                        onChange={(e) => handleChange('history', e.target.value)}
                        essentialText="* 이력을 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.history}
                    />
                    <TextArea
                        text="이력 설명"
                        placeholder="후기 자유롭게 작성해주세요."
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        essentialText="* 이력 설명을 입력해주세요."
                        inValidateTrigger={isValidateTrigger && errors.description}
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
