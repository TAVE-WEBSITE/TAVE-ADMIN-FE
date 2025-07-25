import Input from "../components/input";
import Button from "./button";

// 특정 type - password
export default function MemberInput({
  type,
  btnText,
  onClick,
  text,
  placeholder,
  onChange,
  disapproveText = "",
  essentialText = "",
  approveText = "",
  onValidChange = () => {},
  isValidateTrigger = false,
  isConfirmed = false,
  isPassword = false,
  timeString = "",
  value = "",
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 font-medium items-center">
        <span className="text-[#d2d2df] text-base">{text}</span>
        {type === "password" && (
          <span className="text-[#81818A] text-sm">
            8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함
          </span>
        )}
      </div>

      <div className="w-full flex gap-4 items-center justify-center">
        <div className="flex flex-col gap-1 w-full">
          <Input
            isValidateTrigger={isValidateTrigger}
            isConfirmed={isConfirmed}
            placeholder={placeholder}
            onChange={onChange}
            essentialText={essentialText}
            approveText={approveText}
            disapproveText={disapproveText}
            onValidChange={onValidChange}
            isPassword={isPassword}
            value={value}
          />
          {timeString && (
            <p className="text-zinc-500 text-sm font-medium absolute right-[220px] mt-14">
              {timeString}
            </p>
          )}
        </div>

        {btnText && (
          <Button
            onClick={onClick}
            text={btnText}
            className={`mb-[20px] p-3.5 rounded-[10px] text-white text-base font-semibold bg-[#195BFF]`}
          />
        )}
      </div>
    </div>
  );
}
