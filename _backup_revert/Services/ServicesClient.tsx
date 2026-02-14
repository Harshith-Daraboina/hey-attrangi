"use client";

import { useState } from "react";

const reflectionPrompts = [
    "Do I often ignore my own needs to keep others comfortable?",
    "Have I felt emotionally overwhelmed more than once this week?",
    "Do I find it hard to say ‘no’ even when I’m exhausted?",
    "Have I been avoiding a conversation I know I need to have?",
    "Do I judge myself more harshly than I judge others?",
    "Have I celebrated anything I accomplished recently?",
    "Do I feel like I’m living in alignment with my values?",
    "Have I taken time to rest intentionally this week?",
    "Do I feel understood by the people closest to me?",
    "Have I been holding onto something I need to let go of?",
    "Do I struggle to trust my own decisions?",
    "Have I been honest with myself about what I’m feeling?",
    "Do I tend to bottle up emotions instead of expressing them?",
    "Have I taken any step—big or small—toward personal growth lately?",
    "Do I feel disconnected from myself right now?",
];

export default function ServicesClient() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questions = reflectionPrompts.slice(0, 8);
    const totalQuestions = questions.length + 1; // +1 for the end suggestion

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const isEndSuggestion = currentQuestionIndex === questions.length;
    const currentQuestion = questions[currentQuestionIndex] || '';

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        🌈 Thought Provoking Questions
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                        Pause with every question and try to answer it honestly(yes or no).
                    </h3>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        these questions are designed to help you reflect on your thoughts and feelings.
                    </p>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                    {/* Question Card */}
                    <div className="relative bg-gradient-to-br from-white to-orange-50 border border-orange-100 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-12 mb-8 min-h-[400px] flex flex-col justify-center">
                        {!isEndSuggestion ? (
                            <>
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span className="text-sm text-orange-600 font-medium italic">Take a deep breath and relax</span>
                                </div>
                                <span className="text-xs tracking-[0.35em] uppercase text-orange-500 font-semibold block mb-3">
                                    Prompt {currentQuestionIndex + 1} of {questions.length}
                                </span>
                                <p
                                    className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug"
                                    style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                    {currentQuestion}
                                </p>
                            </>
                        ) : (
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-sm text-orange-700 font-semibold uppercase tracking-wide">End-of-Stack Reveal Suggestion</span>
                                </div>
                                <div className="space-y-4 mt-6">
                                    <div className="bg-white/60 rounded-xl p-5 border border-orange-200">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                                            For every <span className="text-orange-600 font-bold">'yes'</span> you answered:
                                        </p>
                                        <p className="text-base text-gray-700 leading-relaxed italic">
                                            Pause and ask: <span className="font-semibold text-gray-900">What is this 'yes' trying to tell me?</span>
                                        </p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-5 border border-orange-200">
                                        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                                            For every <span className="text-orange-600 font-bold">'no'</span> you answered:
                                        </p>
                                        <p className="text-base text-gray-700 leading-relaxed italic">
                                            Ask: <span className="font-semibold text-gray-900">What would need to change for this to become a 'yes'?</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentQuestionIndex === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Previous
                        </button>

                        <div className="text-sm text-gray-600 font-medium">
                            {currentQuestionIndex + 1} / {totalQuestions}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={currentQuestionIndex === totalQuestions - 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentQuestionIndex === totalQuestions - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
                                }`}
                        >
                            Next
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
