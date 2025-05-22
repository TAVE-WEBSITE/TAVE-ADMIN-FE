import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';
import DialogInput from './dialogInput';
import DropDown from './dropDown';
import { useState, useEffect } from 'react';

export default function ReviewDialog({ type, onClose, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        nickname: '',
        company: '',
        generation: '',
        field: '',
        content: '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        nickname: false,
        generation: false,
        field: false,
        content: false,
    });

    const fieldValueList = ['선택', 'Web/App', 'Back', 'DeepLearning', 'DataAnalysis'];
    const generationList = [
        '14기',
        '13기',
        '12기',
        '11기',
        '10기',
        '9기',
        '8기',
        '7기',
        '6기',
        '5기',
        '4기',
        '3기',
        '2기',
        '1기',
    ];

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        setIsValidateTrigger(true);

        const newErrors = {
            nickname: !formData.nickname.trim(),
            generation: !formData.generation.trim(),
            field: !formData.field.trim(),
            content: !formData.content.trim(),
        };

        setErrors(newErrors);

        if (
            !newErrors.nickname &&
            !newErrors.generation &&
            !newErrors.field &&
            !newErrors.content
        ) {
            onSubmit(formData);
            onClose();
        }
    };

    useEffect(() => {
        if (type === 'modify' && initialData) {
            setFormData(initialData);
        }
    }, [type, initialData]);

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    {type === 'register' ? '후기 등록하기' : '후기 수정하기'}
                    <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <DialogInput
                            text="닉네임"
                            placeholder="ex. 홍길동"
                            value={formData.nickname}
                            onChange={(e) => handleChange('nickname', e.target.value)}
                            essentialText="* 닉네임을 입력해주세요."
                            essential={true}
                            initialValue={initialData?.nickname}
                            inValidateTrigger={isValidateTrigger && errors.nickname}
                        />
                        <DialogInput
                            text="회사"
                            placeholder="ex. 카카오"
                            value={formData.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            essential={false}
                            initialValue={initialData?.company}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <DialogInput
                            text="기수"
                            placeholder="ex. 14기"
                            value={formData.generation}
                            onChange={(e) => handleChange('generation', e.target.value)}
                            essentialText="* 기수를 필수로 입력해야 합니다."
                            essential={true}
                            initialValue={initialData?.generation}
                            inValidateTrigger={isValidateTrigger && errors.generation}
                        />
                        <div className="flex flex-col gap-2">
                            <div>
                            <span className="text-[#394150]">분야</span>
                            <span className="text-[#ff0072]/80"> *</span>
                            </div>
                       
                        <DropDown
                            type="dialog"
                            initialValue={initialData?.field}
                            valueList={fieldValueList}
                            setValue={(value) => handleChange('field', value)}
                            essentialText="* 분야를 필수로 입력해야 합니다."
                            essential={true}
                            isValidateTrigger={isValidateTrigger && errors.field}
                        />
                        </div>
                        
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="text-base font-medium flex gap-0.5">
                            <span className="text-[#394150]">후기</span>
                            <span className="text-[#ff0072]/80">*</span>
                        </div>
                        <textarea
                            className="w-full h-32 p-3 rounded-[10px] bg-white text-black text-base resize-none focus:outline-none border"
                            placeholder="후기를 입력해주세요."
                            value={formData.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                        {isValidateTrigger && errors.content && (
                            <p className="text-[#ff0072]/80 text-sm font-medium mt-[6px]">* 후기를 입력해주세요.</p>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 pr-6 pl-[270px] justify-end">
                    <Button
                        text="취소"
                        className="text-[#394150] text-base font-semibold px-5 py-3 bg-gray-200 rounded-[10px]"
                        onClick={onClose}
                    />
                    <Button
                        text={type === 'register' ? '등록' : '수정'}
                        className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}
