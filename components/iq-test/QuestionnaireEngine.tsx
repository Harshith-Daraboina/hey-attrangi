"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Question {
    id: number | string;
    text: string;
    domain?: string;
}

interface QuestionnaireProps {
    title: string;
    questions: Question[];
    responseScale: Record<string, string>;
    scoring?: {
        method: string;
        threshold?: number;
    };
    severityCutoffs?: Record<string, number[]>;
}

export default function QuestionnaireEngine({ title, questions, responseScale, scoring, severityCutoffs }: QuestionnaireProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);

    const orderedScale = Object.entries(responseScale).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    const handleAnswer = (value: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));

        if (currentIndex < questions.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 250); // Slight delay for better UX
        } else {
            setIsFinished(true);
        }
    };

    const calculateScore = () => {
        let total = 0;
        Object.values(answers).forEach(val => total += val);
        return total;
    };

    const getResult = () => {
        const score = calculateScore();
        if (!severityCutoffs) return `Score: ${score}`;

        // Find severity
        for (const [severity, range] of Object.entries(severityCutoffs)) {
            // range is [min, max]
            if (score >= range[0] && score <= range[1]) {
                return severity.charAt(0).toUpperCase() + severity.slice(1);
            }
        }
        return "Completed";
    };

    if (isFinished) {
        const score = calculateScore();
        const severity = getResult();

        return (
            <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">{title} Complete</h1>

                    <div className="mb-10 p-8 bg-orange-50 rounded-2xl">
                        <p className="text-sm text-orange-500 uppercase font-bold tracking-wider mb-2">Your Result</p>
                        <p className="text-5xl font-extrabold text-orange-900 mb-2">{score}</p>
                        <p className="text-xl text-orange-700 font-medium">{severity}</p>
                    </div>

                    <p className="text-gray-500 mb-8">
                        Thank you for completing this assessment. This is a screening tool and not a medical diagnosis.
                    </p>

                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="font-bold text-gray-900 truncate mr-4">{title}</h1>
                    <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                        {currentIndex + 1} / {questions.length}
                    </span>
                </div>
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-100">
                    <div
                        className="h-full bg-orange-500 transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-10 leading-tight">
                            {currentQuestion.text}
                        </h2>

                        <div className="grid gap-3">
                            {orderedScale.map(([value, label]) => (
                                <button
                                    key={value}
                                    onClick={() => handleAnswer(parseInt(value))}
                                    className="text-left px-6 py-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group flex items-center justify-between"
                                >
                                    <span className="text-lg text-gray-700 group-hover:text-orange-900 font-medium">{label}</span>
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-orange-500"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 text-center text-gray-400 text-xs">
                Question {currentIndex + 1} of {questions.length}
            </div>
        </div>
    );
}
