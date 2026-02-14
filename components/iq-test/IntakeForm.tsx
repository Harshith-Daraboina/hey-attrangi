"use client";

import { useState, useEffect } from "react";

interface IntakeFormProps {
    onComplete: (data: { name: string; age: number; confidence: number; focus: number; detail: number }) => void;
}

export default function IntakeForm({ onComplete }: IntakeFormProps) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [name, setName] = useState("");
    const [age, setAge] = useState<string>("");

    const questions = [
        { id: "confidence", text: "I feel confident about solving complex problems." },
        { id: "focus", text: "I can focus on tasks for a long time without distraction." },
        { id: "detail", text: "I often notice details that others miss." }
    ];

    // Total steps: Name (0), Age (1), Questions (2, 3, 4)
    const totalSteps = 2 + questions.length;

    const handleNext = () => {
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSelect = (id: string, value: number) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
        // Auto-advance for questions
        setTimeout(() => {
            if (step < totalSteps) {
                setStep(s => s + 1);
            }
        }, 250);
    };

    // Check if we can proceed
    const canProceed = () => {
        if (step === 0) return name.trim().length > 0;
        if (step === 1) return age.length > 0;
        if (step >= 2) {
            const qIndex = step - 2;
            if (qIndex < questions.length) {
                return answers[questions[qIndex].id] !== undefined;
            }
        }
        return false;
    };

    // Special handling for last question auto-submit
    useEffect(() => {
        if (step >= 2 && step < totalSteps) {
            const qIndex = step - 2;
            // If we answered the last question, we might want to trigger submit automatically 
            // OR modify logic to have a button. 
            // Given the UI style, selecting an option usually feels better if it auto-advances.
            // But for the last one, let's just let the auto-advance logic in handleSelect handle it?
            // Ah, handleSelect uses setTimeout.
            // If step goes out of bounds, we can trigger submit.
        }
        if (step === totalSteps) {
            handleSubmit();
        }
    }, [step, answers]);


    const handleSubmit = () => {
        onComplete({
            name: name,
            age: parseInt(age),
            confidence: answers["confidence"],
            focus: answers["focus"],
            detail: answers["detail"]
        });
    };

    const options = [
        { value: 5, label: "Strongly Agree", color: "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200", letter: "A" },
        { value: 4, label: "Agree", color: "!bg-pink-100 !text-pink-800 !border-pink-200 hover:!bg-pink-200", letter: "B" },
        { value: 3, label: "Neutral", color: "!bg-orange-100 !text-orange-800 !border-orange-200 hover:!bg-orange-200", letter: "C" },
        { value: 2, label: "Disagree", color: "!bg-purple-100 !text-purple-800 !border-purple-200 hover:!bg-purple-200", letter: "D" },
        { value: 1, label: "Strongly Disagree", color: "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200", letter: "E" }
    ];

    const ageRanges = [
        { label: "8 - 12 (Child)", value: 10 },
        { label: "13 - 17 (Teen)", value: 15 },
        { label: "18 - 39 (Adult)", value: 25 },
        { label: "40+ (Mature)", value: 45 }
    ];

    const handleAgeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAge(e.target.value);
    };

    const renderStep = () => {
        if (step === 0) {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Let's get started. What is your name?</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name here..."
                        className="w-full p-4 text-xl rounded-xl border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-center"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                    />
                </div>
            );
        }
        if (step === 1) {
            return (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Hi {name}, how old are you?</h2>
                    <div className="relative">
                        <select
                            value={age}
                            onChange={handleAgeSelect}
                            className="w-full p-4 text-xl rounded-xl border-2 border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-center appearance-none bg-white cursor-pointer"
                        >
                            <option value="" disabled>Select your age range</option>
                            {ageRanges.map((range) => (
                                <option key={range.label} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }

        const qIndex = step - 2;
        const q = questions[qIndex];

        if (!q) return null;

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="text-center space-y-2">
                    <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">Question {qIndex + 1} of {questions.length}</span>
                    <h2 className="text-2xl font-bold text-gray-800">{q.text}</h2>
                </div>
                <div className="flex flex-col gap-3 max-w-xl mx-auto">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleSelect(q.id, opt.value)}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 text-left group
                                ${opt.color} 
                                ${answers[q.id] === opt.value
                                    ? 'ring-2 ring-offset-2 ring-orange-500 scale-[1.02] shadow-md border-transparent'
                                    : 'border-transparent hover:scale-[1.01] hover:shadow-sm opacity-90 hover:opacity-100'
                                }
                            `}
                        >
                            <span className="font-semibold text-lg">{opt.letter}. {opt.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4 font-sans">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
                <div className="mb-0 text-center">

                    <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Just a few questions...</h1>
                    <div className="flex justify-center gap-1 mt-4">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-orange-500' : 'w-2 bg-gray-200'}`} />
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    {renderStep()}
                </div>

                <div className="mt-12 flex justify-between items-center">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="text-gray-400 hover:text-gray-600 font-bold px-4 py-2"
                        >
                            Back
                        </button>
                    )}
                    <div className="flex-1"></div>
                    {(step === 0 || step === 1) && (
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all
                                ${canProceed()
                                    ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:translate-x-1'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }
                            `}
                        >
                            Next &rarr;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
