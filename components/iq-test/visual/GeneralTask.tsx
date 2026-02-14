"use client";

import { useState, useEffect } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";

interface GeneralTaskProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function GeneralTask({ question, onComplete }: GeneralTaskProps) {
    const [startTime, setStartTime] = useState(Date.now());
    const [showOptions, setShowOptions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check if this is a memory task that requires hiding the prompt
    const isMemoryTask = question.domain === 'working_memory';

    useEffect(() => {
        setStartTime(Date.now());
        setIsSubmitting(false); // Reset submission state on new question
        if (isMemoryTask) {
            setShowOptions(false);
            const timer = setTimeout(() => {
                setShowOptions(true);
            }, 3000); // Show prompt for 3 seconds, then switch
            return () => clearTimeout(timer);
        } else {
            setShowOptions(true); // Always show options for other tasks
        }
    }, [question, isMemoryTask]);

    const handleAnswer = (choice: string) => {
        if (isSubmitting) return; // Prevent double clicks
        setIsSubmitting(true);

        const endTime = Date.now();
        // For memory tasks, reaction time should probably start AFTER options appear?
        // Or total time? Usually from stimulus offset. 
        // Let's reset start time when options appear? 
        // For simplicity, let's keep it from mount, but maybe subtract 3000ms? 
        // Actually, if we want RT from when options appear:
        // We should setStartTime when showOptions becomes true.
        const effectiveStartTime = isMemoryTask ? (startTime + 3000) : startTime;
        const reactionTime = Math.max(0, endTime - effectiveStartTime);

        // Normalize comparison (handle string vs number answers in JSON)
        const isCorrect = String(choice).trim().toLowerCase() === String(question.answer).trim().toLowerCase();

        const score = calculateQuestionScore({
            isCorrect,
            reactionTime,
            expectedTime: question.expectedTimeMs || 15000,
            weight: question.weight,
            difficulty: question.difficulty
        });

        onComplete({
            correct: isCorrect,
            score,
            reactionTime
        });
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-3xl">
            <h2 className="text-xl text-orange-600 font-bold mb-2 uppercase tracking-wide">{question.domain.replace('_', ' ')}</h2>

            {/* 
               Logic: 
               If NOT memory task: Show Prompt AND Options.
               If IS memory task:
                  - If !showOptions: Show Prompt (Stimulus).
                  - If showOptions: Hide Prompt (Stimulus), Show Options.
            */}

            {(!isMemoryTask || !showOptions) && (
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center leading-relaxed animate-in fade-in duration-500">
                    {question.prompt}
                </h1>
            )}

            {(showOptions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {question.options?.map((opt: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt)}
                            disabled={isSubmitting}
                            className={`py-4 px-6 border-2 rounded-xl text-lg font-medium transition shadow-sm 
                                ${isSubmitting
                                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-orange-500 hover:bg-orange-50 hover:shadow'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
