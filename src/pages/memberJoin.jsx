import { useState, useEffect, useCallback, React } from 'react';
import TaveLogo from '../assets/images/taveLogo.svg';
import Button from '../components/button';
import MemberInput from '../components/memberInput';
import DropDown from '../components/dropDown';
import SimpleModal from '../components/simpleModal';
import Wave from '../assets/images/wave.svg';
import { useNavigate } from 'react-router-dom';

export default function MemberJoin() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [department, setDepartment] = useState('부서');
    const [position, setPosition] = useState('직책');
    const departmentList = ['부서', '경영처', '기술처'];
    const positionList = ['직책', '회장', '처장', '처원'];

    const [authCode, setAuthCode] = useState(''); // 실제 인증번호
    const [inputAuthCode, setInputAuthCode] = useState(''); // 사용자가 입력한 인증번호
    const [authStatus, setAuthStatus] = useState(null);

    // step별로 유효성 관리
    const [step1Valid, setStep1Valid] = useState([false, false, false, false]);
    const [step2Valid, setStep2Valid] = useState([false, false, false, false]);

    const handleNextStep = () => {
        setStep(step + 1);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // 전달하는 함수가 무한으로 재생성하는걸 방지하기 위해 useCallbsck으로 감쌈
    const handleValidChange = useCallback(
        (index, isValid) => {
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
        },
        [step]
    );

    // 인증 요청 버튼 클릭 시 인증번호 생성 (나중에 서버에서 실제 인증값 받아서 대치)
    const handleRequestAuth = () => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 랜덤 숫자
        console.log(generatedCode);
        setAuthCode(generatedCode);
        setModalOpen(true);
    };

    // 인증번호 확인
    const handleVerifyAuth = () => {
        if (inputAuthCode === authCode) {
            setAuthStatus('success'); // 인증 성공
        } else {
            setAuthStatus('fail'); // 인증 실패
        }
        console.log(authStatus);
    };

    useEffect(() => {
        if (authStatus === 'success') {
            handleValidChange(1, true); // 인증 성공 시 유효성 true
        } else if (authStatus === 'fail') {
            handleValidChange(1, false); // 인증 실패 시 유효성 false
        }
    }, [authStatus]);

    //step별로 유효성 검사사
    const step1AllValid = step1Valid.every((value) => value);
    const step2AllValid = step2Valid.every((value) => value);

    return <></>;
}
