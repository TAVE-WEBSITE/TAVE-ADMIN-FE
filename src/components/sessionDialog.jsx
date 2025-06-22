import CloseIcon from '../assets/images/closeIcon.svg';
import ImgUpload from '../assets/images/imgUpload.svg';
import Button from './button';
import DialogInput from './dialogInput';
import ImageCropModal from './imageCropModal';
import { postSession, modifySession } from '../api/session';
import { useState } from 'react';

// type - register, modify

export default function SessionDialog({ type, sessionId, existingSessionData, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: existingSessionData?.title || '',
        description: existingSessionData?.description || '',
        date: existingSessionData?.date || '',
        period: existingSessionData?.period || '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        date: false,
        period: false,
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        
        // 날짜 형식 검증
        if (key === 'date') {
            const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
            setErrors((prev) => ({ ...prev, [key]: !value.trim() || !dateRegex.test(value) }));
        } else {
            setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
        }
    };

    const handleSubmit = () => {
        setIsValidateTrigger(true);

        const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
        const newErrors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            date: !formData.date.trim() || !dateRegex.test(formData.date),
            period: !formData.period.trim(),
        };

        setErrors(newErrors);

        if (!newErrors.title && !newErrors.description && !newErrors.date && !newErrors.period) {
            handleApiCall();
        }
    };

    const handleApiCall = async () => {
        try {
            const formDataToSend = new FormData();
            const requestData = {
                title: formData.title,
                description: formData.description,
                eventDay: formData.date,
                period: formData.period,
            };
            formDataToSend.append('request', new Blob([JSON.stringify(requestData)], {
                type: 'application/json',
            }));
            
            const imageFile = selectedImageFile || document.getElementById('fileInput')?.files?.[0];
            if (imageFile) {
                formDataToSend.append('file', imageFile);
            }
            
            const result = type === 'modify'
                ? await modifySession(sessionId, formDataToSend)
                : await postSession(formDataToSend);
            
            if (result) {
                onSubmit(formData);
                window.location.reload();
                onClose();
            } else {
                console.error('세션 처리 실패: 서버에서 응답을 받지 못했습니다.');
                alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('세션 처리 실패:', error);
            alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
        }
    };
    
    
    
    
    const [image, setImage] = useState(existingSessionData?.imgUrl || null);
    const [isCropModalOpen, setIsCropModalOpen] = useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleImageClick = () => {
        document.getElementById('fileInput').click(); 
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('이미지 파일 선택됨:', file);
            setSelectedImageFile(file);
            setIsCropModalOpen(true);
            console.log('크롭 모달 열기 시도');
        }
    };

    const handleCropComplete = (croppedFile) => {
        setImage(URL.createObjectURL(croppedFile));
        setSelectedImageFile(croppedFile);
        setIsCropModalOpen(false);
    };

    const handleCropCancel = () => {
        setIsCropModalOpen(false);
        setSelectedImageFile(null);
        // 파일 입력 초기화
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
                <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col" onClick={(e) => e.stopPropagation()}>
                    <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                        {type === 'register' ? '정규 세션 등록하기' : '정규 세션 수정하기'}
                        <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                    </div>
                    <div className='flex justify-center items-center my-4'>
                        <img
                            src={image || ImgUpload}
                            alt="Upload"
                            onClick={handleImageClick}
                            className="cursor-pointer w-40 h-40 object-cover rounded-lg"
                        />
                        <input
                            id="fileInput"
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>
                    <div className="p-6 flex flex-col gap-3">
                        <DialogInput
                            text="정규 세션 이름"
                            placeholder="세션 이름을 입력해주세요."
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            essentialText="* 세션 이름을 입력해주세요."
                            essential={true}
                            isValidateTrigger={isValidateTrigger && errors.title}
                        />
                        <DialogInput
                            text="정규 세션 설명"
                            placeholder="세션에 대한 설명을 입력해주세요."
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            essentialText="* 세션 설명을 입력해주세요."
                            essential={true}
                            isValidateTrigger={isValidateTrigger && errors.description}
                        />
                        <DialogInput
    text="날짜 입력"
    placeholder="날짜를 입력해주세요 (YYYY.MM.DD)"
    value={formData.date}
    onChange={(e) => handleChange('date', e.target.value)}
    essentialText={
        isValidateTrigger
            ? !formData.date.trim()
                ? "* 날짜를 입력해주세요."
                : !/^\d{4}\.\d{2}\.\d{2}$/.test(formData.date)
                ? "* 날짜 형식이 맞지 않습니다."
                : ""
            : ""
    }
    essential={true}
    isValidateTrigger={isValidateTrigger}
/>

                        
                        {/* 라디오 버튼 섹션 */}
                        <div className="flex flex-col gap-2 w-full">
                            <div className="text-base font-medium flex gap-0.5">
                                <span className="text-[#394150]">세션 구분</span>
                                <span className="text-[#ff0072]/80">*</span>
                            </div>
                            <div className="flex gap-6">
                                {['START', 'PART1', 'PART2'].map((option) => (
                                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="period"
                                            value={option}
                                            checked={formData.period === option}
                                            onChange={(e) => handleChange('period', e.target.value)}
                                            className="w-4 h-4 text-[#195bff] bg-white border-2 border-[#e5e7eb] focus:ring-[#195bff] focus:ring-2"
                                        />
                                        <span className="text-[#394150] text-base">{option}</span>
                                    </label>
                                ))}
                            </div>
                            {isValidateTrigger && errors.period && (
                                <p className="text-[#ff0072]/80 text-sm font-medium mt-[6px]">* 세션 구분을 선택해주세요.</p>
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
                            text={type === 'register' ? "등록" : "수정"}
                            className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
            
            {/* 이미지 크롭 모달 */}
            {isCropModalOpen && (
                <ImageCropModal
                    imageFile={selectedImageFile}
                    onCropComplete={handleCropComplete}
                    onClose={handleCropCancel}
                />
            )}
        </>
    );
}
