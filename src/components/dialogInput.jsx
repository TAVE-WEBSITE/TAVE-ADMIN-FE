import Input from '../components/input';

export default function DialogInput({
    text,
    placeholder,
    onChange,
    essentialText = '',
    onValidChange = () => {},
    essential = true,
    initialValue = '',
    isValidateTrigger = false,
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="text-base font-medium flex gap-0.5">
                <span className="text-[#394150]">{text}</span>
                <span className="text-[#ff0072]/80">*</span>
            </div>
            <Input
                type="dialog"
                isValidateTrigger={isValidateTrigger}
                initialValue={initialValue}
                placeholder={placeholder}
                onChange={onChange}
                essentialText={essentialText}
                onValidChange={onValidChange}
                value={value}
            />
        </div>
    );
}
