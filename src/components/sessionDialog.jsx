import CloseIcon from '../assets/images/closeIcon.svg';
import ImgUpload from '../assets/images/imgUpload.svg';
import Button from './button';
import DialogInput from './dialogInput';
import { postSession, modifySession } from '../api/session';
import { useState } from 'react';

// type - register, modify

export default function SessionDialog({ type, sessionId, existingSessionData, onClose, onSubmit }) {
    // 날짜 형식 변환 함수
    const convertDateFormat = (dateString) => {
        if (!dateString) {
            return '';
        }
        // YYYY-MM-DD 형식을 YYYY.MM.DD 형식으로 변환
        const converted = dateString.replace(/-/g, '.');
        return converted;
    };

    const [formData, setFormData] = useState({
        title: existingSessionData?.title || '',
        description: existingSessionData?.description || '',
        eventDay: convertDateFormat(existingSessionData?.date) || '',
        period: existingSessionData?.period || '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        eventDay: false,
        period: false,
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        
        // 날짜 형식 검증
        if (key === 'eventDay') {
            const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
            setErrors((prev) => ({ ...prev, [key]: !value.trim() || !dateRegex.test(value) }));
        } else {
            setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
        }
    };

    const [image, setImage] = useState(existingSessionData?.imgUrl || null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageClick = () => {
        document.getElementById('fileInput').click(); 
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // JPEG, PNG, WebP 파일 형식만 허용
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            
            if (!validTypes.includes(file.type)) {
                alert('지원하지 않는 파일 형식입니다. JPEG, PNG, WebP 형식의 파일을 선택해주세요.');
                return;
            }
            
            setSelectedImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        setIsValidateTrigger(true);

        const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
        const newErrors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            eventDay: !formData.eventDay.trim() || !dateRegex.test(formData.eventDay),
            period: !formData.period.trim(),
        };

        setErrors(newErrors);

        if (!newErrors.title && !newErrors.description && !newErrors.eventDay && !newErrors.period) {
            handleApiCall();
        }
    };

    const handleApiCall = async () => {
        try {
            setIsSubmitting(true);
            const formDataToSend = new FormData();
            const requestData = {
                title: formData.title,
                description: formData.description,
                eventDay: formData.eventDay, // YYYY.MM.DD 형식 그대로 사용
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
                if (type === 'modify') {
                    alert('세션이 성공적으로 수정되었습니다.');
                }
                onSubmit(formData);
                window.location.reload();
                onClose();
            } else {
                alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[448px] py-6 flex flex-col relative" onClick={(e) => e.stopPropagation()}>
                {/* 로딩 오버레이 */}
                {isSubmitting && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 rounded-[18px] flex flex-col items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#195bff] mb-4"></div>
                        <p className="text-lg font-medium text-gray-700">업로드 중...</p>
                        <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
                    </div>
                )}
                
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
                        accept=".jpg,.jpeg,.png,.webp"
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
  value={formData.eventDay}
  onChange={(e) => handleChange('eventDay', e.target.value)}
  essentialText={
    isValidateTrigger
      ? !formData.eventDay.trim()
        ? "* 날짜를 입력해주세요."
        : !/^\d{4}.\d{2}.\d{2}$/.test(formData.eventDay)
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
                        text={isSubmitting ? "처리 중..." : (type === 'register' ? "등록" : "수정")}
                        className={`text-base font-semibold px-5 py-3 rounded-[10px] ${
                            isSubmitting 
                                ? "text-gray-400 bg-gray-300 cursor-not-allowed" 
                                : "text-white bg-[#195bff]"
                        }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </div>
    );
}
