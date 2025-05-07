import CloseIcon from '../assets/images/closeIcon.svg';
import ImgUpload from '../assets/images/imgUpload.svg';
import Button from './button';
import DialogInput from './dialogInput';
import { postSession, modifySession } from '../api/session';
import { useState } from 'react';

// type - register, modify

export default function SessionDialog({ type, sessionId, existingSessionData, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        sessionName: existingSessionData?.sessionName || '',
        discription: existingSessionData?.discription || '',
        date: existingSessionData?.date || '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        sessionName: false,
        discription: false,
        date: false,
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
    };

    const handleSubmit = async () => {
        setIsValidateTrigger(true);
    
        const newErrors = {
            sessionName: !formData.sessionName.trim(),
            discription: !formData.discription.trim(),
            date: !formData.date.trim(),
        };
    
        setErrors(newErrors);
    
        if (!newErrors.sessionName && !newErrors.discription && !newErrors.date) {
            try {
                const formDataToSend = new FormData();
    
                const requestData = {
                    title: formData.sessionName,
                    description: formData.discription,
                    eventDay: formData.date,
                };
    
                formDataToSend.append(
                    'request',
                    new Blob([JSON.stringify(requestData)], { type: 'application/json' })
                );
    
                if (image) {
                    const imageFile = document.getElementById('fileInput')?.files?.[0];
                    if (imageFile) {
                        formDataToSend.append('file', imageFile);
                    } else {
                        console.error('이미지 파일이 없습니다.');
                        return;
                    }
                }
    
                let result;
    
                if (type === 'modify') {
                    result = await modifySession(sessionId, formDataToSend);
                    console.log('수정 결과:', result);
    
                    if (result) {
                        onSubmit(formData);
                        onClose();
                    } else {
                        console.error('세션 수정 실패: 서버에서 응답을 받지 못했습니다.');
                    }
                } else {
                    result = await postSession(formDataToSend);
                    console.log('생성 결과:', result);
    
                    if (result) {
                        onSubmit(formData);
                        onClose();
                    } else {
                        console.error('세션 생성 실패: 서버에서 응답을 받지 못했습니다.');
                    }
                }
            } catch (error) {
                console.error('세션 처리 실패:', error);
            }
        }
    };
    
    
    const [image, setImage] = useState(null);

    const handleImageClick = () => {
        document.getElementById('fileInput').click(); 
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            console.log(file); 
        }
    };

    return (
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
                        value={formData.sessionName}
                        onChange={(e) => handleChange('sessionName', e.target.value)}
                        essentialText="* 세션 이름을 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.sessionName}
                    />
                    <DialogInput
                        text="정규 세션 설명"
                        placeholder="세션에 대한 설명을 입력해주세요."
                        value={formData.discription}
                        onChange={(e) => handleChange('discription', e.target.value)}
                        essentialText="* 세션 설명을 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.discription}
                    />
                    <DialogInput
                        text="날짜 입력"
                        placeholder="날짜를 입력해주세요 (YYYY.MM.DD)"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        essentialText="* 날짜를 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.date}
                    />
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
    );
}
