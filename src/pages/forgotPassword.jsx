import { useState, useEffect, useCallback } from 'react';
import {postEmailVerification, postEmailVerify, putResetPassword} from '../api/password';
import usePasswordStore from '../store/usePasswordStore';
import TaveLogo from '../assets/images/taveLogo.svg';
import Button from '../components/button';
import MemberInput from '../components/memberInput';
import SimpleModal from '../components/simpleModal';
import Wave from '../assets/images/wave.svg';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [authCode, setAuthCode] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [newPw, setNewPw] = useState(false);
    const [btnText, setBtnText] = useState('다음으로');
    const [modalType, setModalType] = useState(null); 
    const [isModalOpen, setModalOpen] = useState(false);
    const [authVerified, setAuthVerified] = useState(null);
    const [step1Valid, setStep1Valid] = useState([false, false, false]);
    const [step2Valid, setStep2Valid] = useState([false, false]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordReset, setPasswordReset] = useState(false); 
    const [retransmit, setRetransmit] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
const [description, setDescription] = useState('');
const [isEmailModal, setIsEmailModal] = useState(false);
const [isEmailVerified, setIsEmailVerified] = useState(false);


    const navigate = useNavigate();

    const authAfter = () => {
        const isValid = step1Valid.every((value) => value);
        if (isValid) {
            setNewPw(true);
        }
    };

    const step1AllValid = step1Valid.every((value) => value);
    const step2AllValid = step2Valid.every((value) => value);

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
    
    const handlePasswordValidation = (password) => {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[!@#$%^&*]/.test(password);
    };
    useEffect(() => {
        const isPasswordValid = handlePasswordValidation(password);
        const isConfirmValid = isPasswordValid && password === confirmPassword;
        setStep2Valid([isPasswordValid, isConfirmValid]);
    }, [password, confirmPassword]);
    
    const handleRequestAuth = async () => {
        try {
            const response = await postEmailVerification(email, true);
            const isSuccess = response?.status === 200;
    
            if (isSuccess) {
                setModalTitle(retransmit ? "인증번호 재발송" : "인증번호 발송");
                setDescription("입력하신 이메일로\n인증번호가 발송되었습니다.");
                setRetransmit(true);
            } else {
                throw new Error("INVALID_EMAIL");
            }
    
            setIsEmailModal(true);
        } catch (error) {
            console.error("인증번호 요청 실패:", error);
            setModalTitle("인증번호 발송 오류");
            setDescription("이메일을 확인해주세요.");
            setIsEmailModal(true);
        }
    };
    

    const handleVerifyCode = async () => {
        try {
          const status = await postEmailVerify(email, authCode);
          if (status === 200) {
            setIsEmailVerified(true);
            handleValidChange(2, true, 1);
          } else {
            setIsEmailVerified(false);
            handleValidChange(2, false, 1);
          }
        } catch (err) {
          setIsEmailVerified(false);
          setAuthVerified(false);
        //   console.error("인증 실패", err);
        }
      };
    
    
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const handleEmailChange = (email) => {
        handleValidChange(1, validateEmail(email), 1);
        setEmail(email);
    };
        
    const handleCompletePassword = async () => {
        try {
            const response = await putResetPassword(nickname, password, confirmPassword);
    
            if (response?.status === 200) {
                setPasswordReset(true);
                setModalType('password');
                setModalOpen(true);
            } else {
                throw new Error("비밀번호 재설정에 실패했습니다.");
            }
        } catch (error) {
            console.error("비밀번호 재설정 실패:", error.message || error);
            alert(error.message || "비밀번호 재설정에 실패했습니다.");
        }
    };
    
    
    

    return (
        <div className="flex flex-row h-screen w-screen px-24 py-24 justify-center items-center gap-36 bg-[linear-gradient(180deg,#121212_66.46%,#142755_97.53%,#195BFF_134.64%)] relative">
            <div className="flex flex-col items-center z-10">
                <div className="text-white text-3xl">The new technology wave,</div>
                <img className="w-96" src={TaveLogo} alt="Logo" />
            </div>
            {!newPw ? (
                <div className="flex flex-col w-[41rem] h-[40rem] justify-center items-center gap-5 p-20 border border-[#FFFFFF1A] bg-[rgba(110,112,117,0.12)] shadow-[1px_2px_48px_0px_rgba(0,0,0,0.04)] backdrop-blur-[15px] rounded-2xl backdrop-blur-md relative z-10">
                    <div className="text-4xl text-white font-medium">비밀번호 재설정</div>
                    <div className="flex flex-col gap-5 w-full">
                        <MemberInput
                            text="이름"
                            placeholder="이름을 입력해주세요"
                            user_width="16.5em"
                            hint="이름을 입력해주세요"
                            essentialText="이름을 입력해주세요."
                            onChange={(e)=> setNickname(e.target.value)}
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
    isConfirmed={authVerified} 
    onValidChange={(isValid) => handleValidChange(1, isValid, 1)}
/>

                           
                        </div>
                        <div className="flex gap-5 items-center mb-5">
                        <MemberInput
    text="인증번호"
    placeholder="인증번호를 입력해주세요"
    btnText="인증확인"
    onClick={handleVerifyCode}
    user_width="16.5em"
    hint="인증번호를 입력해주세요"
    essentialText="인증번호를 입력해주세요."
    approveText='인증번호가 확인되었습니다.'
    disapproveText="인증번호가 일치하지 않습니다."
    isConfirmed={authVerified} 
    onChange={(e) => setAuthCode(e.target.value)} 
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
                    {isEmailModal && (
    <SimpleModal
        title={modalTitle} 
        description={description} 
        blueBtnText="확인"
        onClickBlue={() => setIsEmailModal(false)}
        onClose={() => setIsEmailModal(false)} 
    />
)}


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
                    

{modalType === 'password' && isModalOpen && (
    <SimpleModal
        title="비밀번호 재설정 완료"
        description="로그인 화면으로 이동합니다."
        blueBtnText="확인"
        onClickBlue={() => {
            setModalOpen(false);
            navigate('/');
        }}
        onClose={() => {
            setModalOpen(false);
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
