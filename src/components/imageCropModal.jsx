import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CloseIcon from '../assets/images/closeIcon.svg';
import Button from './button';

export default function ImageCropModal({ imageFile, onCropComplete, onClose }) {
    const [crop, setCrop] = useState({
        unit: '%',
        width: 80,
        height: 5.3, // 80 / 15.07 ≈ 5.3
        x: 10,
        y: 47.35, // (100 - 5.3) / 2 ≈ 47.35 (중앙 정렬)
    });
    const [imageSrc, setImageSrc] = useState(null);
    const imgRef = useRef(null);

    // 이미지 파일이 변경될 때마다 URL 생성
    React.useEffect(() => {
        if (imageFile) {
            console.log('크롭 모달에서 이미지 파일 받음:', imageFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                console.log('이미지 URL 생성 완료');
            };
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.9);
        });
    };

    const handleCropComplete = async () => {
        if (!imgRef.current) return;

        try {
            const croppedImageBlob = await getCroppedImg(imgRef.current, crop);
            const croppedImageFile = new File([croppedImageBlob], 'cropped-image.jpg', {
                type: 'image/jpeg',
            });
            onCropComplete(croppedImageFile);
        } catch (error) {
            console.error('이미지 크롭 실패:', error);
        }
    };

    if (!imageSrc) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
            <div className="bg-white rounded-[18px] w-[600px] py-6 flex flex-col max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="px-6 pb-6 border-b border-b-gray-100 flex justify-between items-center">
                    <span className="text-lg font-semibold">이미지 크롭</span>
                    <img src={CloseIcon} onClick={onClose} alt="close" className="cursor-pointer" />
                </div>
                
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex justify-center">
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                           
                            minWidth={50}
                          
                        >
                            <img
                                ref={imgRef}
                                src={imageSrc}
                                alt="Crop preview"
                                className="max-w-full max-h-96 object-contain"
                            />
                        </ReactCrop>
                    </div>
                    
                    {/* <div className="text-sm text-gray-600 text-center">
                        가로형 영역을 선택한 후 확인 버튼을 눌러주세요. (비율: 15.07:1)
                    </div> */}
                </div>

                <div className="flex gap-3 px-6 justify-end">
                    <Button
                        text="취소"
                        className="text-[#394150] text-base font-semibold px-5 py-3 bg-gray-200 rounded-[10px]"
                        onClick={onClose}
                    />
                    <Button
                        text="확인"
                        className="text-white text-base font-semibold px-5 py-3 bg-[#195bff] rounded-[10px]"
                        onClick={handleCropComplete}
                    />
                </div>
            </div>
        </div>
    );
} 