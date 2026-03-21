import React from "react";

interface InstructionDialogProps {
    title: string;
    instructions: React.ReactNode;
    onStart: () => void;
}

export default function InstructionDialog({ title, instructions, onStart }: InstructionDialogProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">

            <div className="flex flex-col md:flex-row items-end justify-center max-w-4xl w-full gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Teacher Character */}
                <div className="relative z-10 w-48 md:w-64 flex-shrink-0">
                    <img
                        src="/images/teacher_pointing_upper.png"
                        alt="Teacher"
                        className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Speech Bubble */}
                <div className="relative bg-white p-8 rounded-3xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl w-full">

                    {/* Desktop Tail (Left) */}
                    <div className="hidden md:block absolute top-1/3 -left-6 w-0 h-0 
                        border-t-[20px] border-t-transparent
                        border-r-[24px] border-r-gray-900
                        border-b-[20px] border-b-transparent">
                    </div>
                    <div className="hidden md:block absolute top-1/3 -left-[18px] w-0 h-0 
                        border-t-[16px] border-t-transparent
                        border-r-[20px] border-r-white
                        border-b-[16px] border-b-transparent">
                    </div>

                    {/* Mobile Tail (Top) */}
                    <div className="md:hidden absolute -top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-[20px] border-l-transparent
                        border-b-[24px] border-b-gray-900
                        border-r-[20px] border-r-transparent">
                    </div>
                    <div className="md:hidden absolute -top-[18px] left-1/2 transform -translate-x-1/2 w-0 h-0 
                        border-l-[16px] border-l-transparent
                        border-b-[20px] border-b-white
                        border-r-[16px] border-r-transparent">
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-gray-100 pb-2">
                        {title}
                    </h2>

                    <div className="space-y-4 text-lg font-medium text-gray-700 font-sans mb-8">
                        {instructions}
                    </div>

                    <button
                        onClick={onStart}
                        className="w-full py-4 bg-orange-500 text-white font-black text-xl rounded-xl hover:bg-orange-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                    >
                        GOT IT, LET'S GO! 🚀
                    </button>
                </div>
            </div>

        </div>
    );
}
