import { useCallback, useEffect, useState } from "react";
import MemberInput from "../memberInput";
import { useNavigate } from "react-router-dom";
import SimpleModal from "../simpleModal";
import { postEmailVerification, postEmailVerify } from "../../api/member";
import useSignupStore from "../../store/useSignupStore";
import { useMutation } from "@tanstack/react-query";

export default function JoinStep1() {
  const [email, setEmail] = useState("");
  const [verification, setVarification] = useState("");
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("인증번호 발송");
  const [description, setDescription] = useState("");
  const [retransmit, setRetransmit] = useState(false);
  const [emailVerification, setEmailVerification] = useState(null);
  const [approveText, setApproveText] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isCounting, setIsCounting] = useState(false); 

  const { updateUserData } = useSignupStore();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const domainParts = email.split("@")[1]?.split(".");
    if (!domainParts || domainParts.length < 2) return false;
    const extension = domainParts[domainParts.length - 1];
    return extension.length >= 2 && extension.length <= 6 && emailRegex.test(email);
  };

  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft <= 0) {
      setIsCounting(false);
      setEmailVerification(false);
    }

    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const formatTime = (time) => {
    const minute = String(Math.floor(time / 60)).padStart(2, "0");
    const second = String(time % 60).padStart(2, "0");
    return `${minute}:${second}`;
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleVerificationChange = (e) => setVarification(e.target.value);

  const emailVerificationMutation = useMutation({
    mutationFn: (email) => postEmailVerification(email),
    onSuccess: () => {
      setModalTitle(retransmit ? "인증번호 재발송" : "인증번호 발송");
      setRetransmit(true);
      setDescription("입력하신 이메일로 \n인증번호가 발송되었습니다.");
      setIsEmailModal(true);
      setIsCounting(true);
      setTimeLeft(180);
      setEmailVerification(null);
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        setModalTitle("중복된 이메일");
        setDescription("이미 회원가입된 이메일입니다.");
      } else {
        setModalTitle("인증번호 발송 오류");
        setDescription("올바르지 않은 이메일 형식입니다.");
      }
      setIsEmailModal(true);
    },
  });

  const emailNumberVerificationMutation = useMutation({
    mutationFn: ({ email, verification }) => postEmailVerify(email, verification),
    onSuccess: () => {
      updateUserData("email", email);
      setApproveText("인증번호가 확인되었습니다.");
      setEmailVerification(true);
      setIsCounting(false);
    },
    onError: () => {
      setEmailVerification(false);
    },
  });

  const emailVerificationHandler = () => {
    if (!email.trim()) {
      setModalTitle("이메일 입력 오류");
      setDescription("이메일을 입력해주세요.");
      setIsEmailModal(true);
      return;
    }

    if (!validateEmail(email)) {
      setModalTitle("이메일 형식 오류");
      setDescription("올바른 이메일 형식으로 입력해주세요.");
      setIsEmailModal(true);
      return;
    }

    emailVerificationMutation.mutate(email);
  };

  const emailNumberVerificationHandler = () => {
    if (!verification.trim()) {
      setModalTitle("인증번호 입력 오류");
      setDescription("인증번호를 입력해주세요.");
      setIsEmailModal(true);
      return;
    }

    if (timeLeft <= 0) {
      setModalTitle("인증번호 만료");
      setDescription("인증번호 입력 시간이 만료되었습니다.\n다시 요청해주세요.");
      setIsEmailModal(true);
      return;
    }

    emailNumberVerificationMutation.mutate({ email, verification });
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex gap-2 items-center w-full">
        <MemberInput
          text="이메일"
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요"
          essentialText="* 이메일을 입력해주세요."
          btnText="인증요청"
          onClick={emailVerificationHandler}
        />
      </div>
      <div className="flex gap-2 items-center w-full justify-center">
        <MemberInput
          text="인증번호"
          onChange={handleVerificationChange}
          placeholder="인증번호를 입력해주세요"
          essentialText="* 인증번호를 입력해주세요."
          approveText={approveText}
          disapproveText="인증번호가 일치하지 않습니다."
          isConfirmed={emailVerification}
          btnText="인증확인"
          onClick={emailNumberVerificationHandler}
          timeString={isCounting ? formatTime(timeLeft) : null}
        />
      </div>

      {isEmailModal && (
        <SimpleModal
          title={modalTitle}
          description={description}
          blueBtnText="확인"
          onClickBlue={() => setIsEmailModal(false)}
        />
      )}
    </div>
  );
}
