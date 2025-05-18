import { useCallback, useState } from "react";
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
  const { updateUserData, validateStep } = useSignupStore();
  const [modalTitle, setModalTitle] = useState("인증번호 발송");
  const [description, setDescription] = useState("");
  const [retransmit,setRetransmit] = useState(false);
  const [emailVerification , setEmailVerification] = useState(null);
  const [approveText, setApproveText] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationChange = (e) => {
    //updateUserData("email", e.target.value);
    setVarification(e.target.value);
  };


  const emailVerificationMutation = useMutation({
    mutationFn: (email) => postEmailVerification(email),
    onSuccess: (response) => {
      if (retransmit) {
        setModalTitle('인증번호 재발송');
      } else {
        setModalTitle('인증번호 발송');
        setRetransmit(true);
      }
      setDescription(`입력하신 이메일로 \n인증번호가 발송되었습니다.`);
      setIsEmailModal(true);
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        setModalTitle('중복된 이메일');
        setDescription('이미 회원가입된 이메일입니다.');
      } else {
        setModalTitle('인증번호 발송 오류');
        setDescription('올바르지 않은 이메일 형식입니다.');
      }
      setIsEmailModal(true);
    },
  });  
    
  // 이메일 인증번호 검증
  const emailNumberVerificationMutation = useMutation({
    mutationFn: ({ email, verification }) => postEmailVerify(email, verification),
    onSuccess: (response) => {
      updateUserData('email', email);
      setApproveText('인증번호가 확인되었습니다.');
      setEmailVerification(true);
      //여기도 초록색으로 처리
    },
    onError: (error) => {
      // 이메일 인증번호 틀렸을 때 처리
      setEmailVerification(false);
    },
  });

  const emailVerificationHandler = () => {
    emailVerificationMutation.mutate(email);
  };
  
  const emailNumberVerificationHandler = () => {
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
        ></MemberInput>
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
        ></MemberInput>
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
