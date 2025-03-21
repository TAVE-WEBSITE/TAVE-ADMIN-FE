export default function InputDialog({ onClose, type }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="flex flex-col gap-6 bg-white rounded-[30px] shadow-[1px_1px_40px_0px_rgba(0,0,0,0.35)] w-[627px]">
                <div className="flex items-center justify-between px-8 py-7 border-b border-[#cccccc]">
                    <p className="text-black text-base font-medium">
                        {type === 'project' ? '프로젝트' : '스터디'} 등록하기
                    </p>
                </div>
                <div className="flex gap-7 mb-1 mx-9">
                    <div
                        className="w-full h-full flex justify-center items-center
                     bg-gradient-to-br from-black to-black rounded-[18px]"
                    ></div>
                    <div className="flex flex-col gap-3"></div>
                </div>
            </div>
        </div>
    );
}
