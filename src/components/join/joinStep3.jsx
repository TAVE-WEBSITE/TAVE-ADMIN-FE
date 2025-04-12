import { useEffect, useState } from "react";
import MemberInput from "../memberInput";
import DropDown from "../dropDown";
import useSignupStore from "../../store/useSignupStore";

export default function JoinStep3() {
  const [department, setDepartment] = useState("부서");
  const [position, setPosition] = useState("직책");
  const departmentList = ["부서", "회장", "경영처", "기술처"];
  const positionList = ["직책", "처장", "처원"];
  const [isPosition , setIsPosition] = useState(false);
  const {updateUserData} = useSignupStore();


  const handleUserNameChange = (e) => {
    updateUserData("username", e.target.value);
  };

  const handleGenerationChange = (e) => {
    if(!isNaN(e.target.value)){
      updateUserData("generation", e.target.value);
    }
  };

  const handleAgitIdChange = (e) => {
    updateUserData("agitId", e.target.value);
  };


  useEffect(() => {
    if (department === "회장") {
      updateUserData("department", "PRINCIPAL");
      updateUserData("job", "");
      setIsPosition(false);
    } else {
      setIsPosition(true);
      setPosition("직책");
  
      if (department === "기술처") {
        updateUserData("department", "TECHNICAL");
      } else if (department === "경영처") {
        updateUserData("department", "MANAGEMENT");
      } else {
        updateUserData("department", "");
        updateUserData("job", "");
        setIsPosition(false);
      }
    }
  }, [department]);

  useEffect(() => {
    if (position === "처원") {
      updateUserData("job", "STAFF");
    } else if (position === "처장") {
      updateUserData("job", "DIRECTOR");
    } else {
      updateUserData("job", "");
    }
  }, [position]);

  return (
    <div className="flex flex-col gap-[1.5vh] items-center w-full">
      <MemberInput
        text="이름"
        onChange={ handleUserNameChange }
        placeholder="이름을 입력해주세요"
        essentialText="* 이름을 입력해주세요"
     
      />
      <MemberInput
        text="본인 기수"
        onChange={handleGenerationChange}
        placeholder="기수를 입력해주세요(ex. 12)"
        essentialText="* 기수를 입력해주세요."
      
      />
      <MemberInput
        text="아지트 아이디"
        onChange={handleAgitIdChange}
        placeholder="아지트 아이디를 입력해주세요"
        essentialText="* 아지트 아이디를 입력해주세요."
       
      />
      <div className="flex flex-col w-full">
        <div
          className="text-left font-[Pretendard] text-[#D2D2DF] text-[16px] font-medium 
                leading-[30px] tracking-[-0.48px] w-full"
        >
          현재 직책
        </div>

        <div className="flex gap-4 items-center">
          <DropDown
            valueList={departmentList}
            setValue={setDepartment}
            isJoin={true}
            user_width="w-full"
           
            type="join"
          />
          <DropDown
          disabled={isPosition}
            valueList={positionList}
            setValue={setPosition}
            isJoin={true}
            type="join"
          />
        </div>
      </div>
    </div>
  );
}
