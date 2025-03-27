import { useState, useEffect, useCallback } from 'react';
import TaveLogo from '../assets/images/taveLogo.svg';
import Button from '../components/button';
import MemberInput from '../components/memberInput';
import SimpleModal from '../components/simpleModal';
import Wave from '../assets/images/wave.svg';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [authCode, setAuthCode] = useState('');
    const [newPw, setNewPw] = useState(false);
    const [btnText, setBtnText] = useState('다음으로');
    const [isModalOpen, setModalOpen] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [inputAuthCode, setInputAuthCode] = useState('');
    const [authStatus, setAuthStatus] = useState(null);
    const [step1Valid, setStep1Valid] = useState([false, false, false]); // 기본적으로 false
    const [step2Valid, setStep2Valid] = useState([false, false]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordReset, setPasswordReset] = useState(false); 

    const navigate = useNavigate();

    const authAfter = () => {
        if (step1AllValid) {
            setNewPw(true);
        }
    };

    const handleValidChange = useCallback((index, isValid, step) => {
        if (step === 1) {
            setStep1Valid((prev) => {
                const updated = [...prev];
                updated[index] = isValid;
                return updated;
            });
        } else if (step === 2) {
            setStep2Valid((prev) => {
                const updated = [...prev];
                updated[index] = isValid;
                return updated;
            });
        }
    }, []);

    const step1AllValid = step1Valid.every((value) => value);
    const step2AllValid = step2Valid.every((value) => value);

    // 비밀번호 유효성 검사
    const handlePasswordValidation = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);
        return hasMinLength && hasUpperCase && hasLowerCase && hasSpecialChar;
    };

    useEffect(() => {
        handleValidChange(0, handlePasswordValidation(password), 2);
        handleValidChange(1, handlePasswordValidation(password) && password === confirmPassword, 2);
    }, [password, confirmPassword]);

    const handleRequestAuth = () => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("인증번호: ", generatedCode);
        setAuthCode(generatedCode);
    
        // 상태 업데이트 후 바로 반영되도록 setTimeout 사용
        setTimeout(() => {
            setModalOpen(true);
        }, 0);
    };
    
    useEffect(() => {
        console.log("모달 상태 변경됨:", isModalOpen);
    }, [isModalOpen]);
    
    
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const handleEmailChange = (email) => {
        handleValidChange(1, validateEmail(email), 1);
    };
    
    const handleAuthCodeChange = (code) => {
        setInputAuthCode(code);
        handleValidChange(2, code === authCode, 1);
    };
    
const handleCompletePassword = () => {
    setPasswordReset(true);
    setModalOpen(true);
}

    return (
        <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-[linear-gradient(180deg,#121212_66.46%,#142755_97.53%,#195BFF_134.64%)] relative">
            <div className="flex flex-col items-center z-10">
                <div className="text-white text-3xl">The new technology wave,</div>
                <img className="w-96" src={TaveLogo} alt="Logo" />
            </div>
            {!newPw ? (
                <div className="flex flex-col w-[41rem] h-[40rem] justify-center items-center gap-5 p-20 border border-[#FFFFFF1A] bg-[rgba(110,112,117,0.12)] shadow-[1px_2px_48px_0px_rgba(0,0,0,0.04)] backdrop-blur-[15px] rounded-2xl backdrop-blur-md relative z-10">
                    <div className="text-4xl text-white font-medium">비밀번호 찾기</div>
                    <div className="flex flex-col gap-5 w-full">
                        <MemberInput
                            text="이름"
                            placeholder="이름을 입력해주세요"
                            user_width="16.5em"
                            hint="이름을 입력해주세요"
                            essentialText="이름을 입력해주세요."
                            onValidChange={(isValid) => handleValidChange(0, isValid, 1)}
                        />
                        <div className="flex gap-5 items-center justify-center">
                        <MemberInput
    text="이메일"
    placeholder="이메일을 입력해주세요"
    btnText={"인증요청"}
    onClick={handleRequestAuth}
    user_width="16.5em"
    hint="이메일을 입력해주세요"
    essentialText="올바른 이메일 형식을 입력해주세요."
    onChange={(e) => handleEmailChange(e.target.value)}
    onValidChange={(isValid) => handleValidChange(1, isValid, 1)}
/>

                           
                        </div>
                        <div className="flex gap-5 items-center mb-5">
                        <MemberInput
    text="인증번호"
    placeholder="인증번호를 입력해주세요"
    btnText={"인증확인"}
    
    user_width="16.5em"
    hint="인증번호를 입력해주세요"
    essentialText="인증번호가 일치하지 않습니다."
    onChange={(e) => handleAuthCodeChange(e.target.value)}
/>


                        </div>
                    </div>

                    <Button
                        text={btnText}
                        onClick={authAfter}
                        disabled={!step1AllValid}
                        user_width="28em"
                        user_height="3em"
                    />
                </div>
            ) : (
                <div className="flex flex-col w-[41rem] h-[40rem] justify-center items-center gap-5 p-20 border border-[#FFFFFF1A] bg-[rgba(110,112,117,0.12)] shadow-[1px_2px_48px_0px_rgba(0,0,0,0.04)] backdrop-blur-[15px] rounded-2xl backdrop-blur-md relative z-10">
                    <div className="text-4xl text-white font-medium">비밀번호 재설정</div>
                    <div className="flex flex-col gap-5 mb-5 w-full">
                        <MemberInput
                            text="새 비밀번호"
                            type="password"
                            hint="비밀번호를 다시 입력해주세요"
                            essentialText="비밀번호를 입력해주세요."
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <MemberInput
                            text="비밀번호 확인"
                            hint="비밀번호를 다시 입력해주세요"
                            essentialText="비밀번호가 일치하지 않습니다."
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        text="비밀번호 재설정"
                        onClick={() => handleCompletePassword(true)}
                        disabled={!step2AllValid}
                        user_width="28em"
                        user_height="3em"
                    />
                    {isModalOpen ? (
    <SimpleModal
        title="이메일 발송 완료"
        description="인증번호가 이메일로 발송되었습니다."
        blueBtnText="확인"
        onClickBlue={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
    />
) : null}
                    {isModalOpen && isPasswordReset &&  (
                        <SimpleModal
                                            title="비밀번호 재설정 완료"
                                            description="로그인 화면으로 이동합니다."
                                            blueBtnText="확인"
                                         
                                            onClickBlue={() => {
                                                navigate('/');
                                            }}
                                            onClose={() => {
                                                navigate('/');
                                            }}
                                        />
                    )}
                </div>
            )}
            <img src={Wave} className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Wave Background" />
        </div>
    );
}
