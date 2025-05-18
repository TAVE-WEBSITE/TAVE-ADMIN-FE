import CloseIcon from '../assets/images/closeIcon.svg';
import ImgUpload from '../assets/images/imgUpload.svg';
import Button from './button';
import DialogInput from './dialogInput';
import { postSession, modifySession } from '../api/session';
import { useState } from 'react';

// type - register, modify

export default function SessionDialog({ type, sessionId, existingSessionData, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: existingSessionData?.title || '',
        description: existingSessionData?.description || '',
        date: existingSessionData?.date || '',
    });
    const [isValidateTrigger, setIsValidateTrigger] = useState(false);
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        date: false,
    });

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: !value.trim() }));
    };

    const handleSubmit = async () => {
        setIsValidateTrigger(true);
    
        const newErrors = {
            title: !formData.title.trim(),
            description: !formData.description.trim(),
            date: !formData.date.trim(),
        };
    
        setErrors(newErrors);
    
        if (!newErrors.title && !newErrors.description && !newErrors.date) {
            try {
                const formDataToSend = new FormData();
    
                // request 객체를 JSON으로 만들어서 전송
                const requestData = {
                    title: formData.title,
                    description: formData.description,
                    eventDay: formData.date,
                };
                
                // request 객체를 문자열로 변환하여 추가
                formDataToSend.append('request', new Blob([JSON.stringify(requestData)], {
                    type: 'application/json'
                }));
    
                // 이미지 파일이 있는 경우에만 추가
                const imageFile = document.getElementById('fileInput')?.files?.[0];
                if (imageFile) {
                    formDataToSend.append('file', imageFile);
                }

                // FormData 내용 출력 (디버깅용)
                console.log('FormData 내용:');
                for (let pair of formDataToSend.entries()) {
                    if (pair[0] === 'request') {
                        const requestBlob = pair[1];
                        requestBlob.text().then(text => {
                            console.log('request 데이터:', JSON.parse(text));
                        });
                    } else if (pair[0] === 'file') {
                        const file = pair[1];
                        console.log('file 데이터:', {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            lastModified: file.lastModified
                        });
                    }
                }
    
                let result;
    
                if (type === 'modify') {
                    result = await modifySession(sessionId, formDataToSend);
                } else {
                    result = await postSession(formDataToSend);
                }
    
                if (result) {
                    onSubmit(formData);
                    onClose();
                } else {
                    console.error('세션 처리 실패: 서버에서 응답을 받지 못했습니다.');
                    alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
                }
            } catch (error) {
                console.error('세션 처리 실패:', error);
                alert('세션 등록에 실패했습니다. 다시 시도해주세요.');
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
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        essentialText="* 세션 이름을 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.title}
                    />
                    <DialogInput
                        text="정규 세션 설명"
                        placeholder="세션에 대한 설명을 입력해주세요."
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        essentialText="* 세션 설명을 입력해주세요."
                        essential={true}
                        inValidateTrigger={isValidateTrigger && errors.description}
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
