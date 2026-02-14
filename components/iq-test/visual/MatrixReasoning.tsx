"use client";

import { useState, useEffect } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";
import InstructionDialog from "../InstructionDialog";

interface MatrixProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function MatrixReasoning({ question, onComplete }: MatrixProps) {
    const [started, setStarted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        if (question.options) {
            setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
        }
        setSelectedOption(null);
        setIsSubmitted(false);
    }, [question]);

    const { grid = [], rule = "" } = question.stimulus || {};
    const gridSize = Math.sqrt(grid.length + 1); // e.g. 3 for 3x3 (8 items + 1 missing)

    const handleSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
        setIsSubmitted(true);

        const isCorrect = question.answer === shuffledOptions[index];

        const score = calculateQuestionScore({
            isCorrect,
            reactionTime: 0,
            expectedTime: question.expectedTimeMs || 10000,
            weight: question.weight,
            difficulty: question.difficulty
        });

        // Small delay to show feedback if we wanted, or immediate
        setTimeout(() => {
            onComplete({
                correct: isCorrect,
                score,
                reactionTime: 0
            });
        }, 500);
    };

    // Helper to render SVG shapes based on string identifiers
    const renderShape = (shapeId: string) => {
        switch (shapeId) {
            case 'circle': return <circle cx="50" cy="50" r="40" fill="currentColor" />;
            case 'square': return <rect x="10" y="10" width="80" height="80" fill="currentColor" />;
            case 'triangle': return <polygon points="50,10 90,90 10,90" fill="currentColor" />;
            default: return <text x="50" y="55" textAnchor="middle">{shapeId}</text>;
        }
    };

    // New: Image-based Rendering
    if (!started) {
        return (
            <InstructionDialog
                title={question.prompt || "Matrix Reasoning"}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">Identify the missing piece that completes the pattern.</p>
                        <p className="text-lg text-gray-600">Look for rules in rows and columns.</p>
                    </div>
                }
                onStart={() => setStarted(true)}
            />
        );
    }

    if (question.stimulus?.type === 'image_pair') {
        return (
            <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-bold mb-8 text-gray-800 bg-white px-6 py-2 rounded-full shadow-sm">{question.prompt}</h2>

                <div className="flex flex-col md:flex-row items-start justify-center gap-8 w-full">
                    {/* Question Image (Left) */}
                    <div className="w-full md:w-[40%] flex justify-center md:justify-end">
                        <div className="bg-white p-2 rounded-xl shadow-md border border-gray-100 inline-block w-full flex justify-center">
                            <img
                                src={question.stimulus.question_image}
                                alt="Pattern"
                                className="w-full max-h-[600px] object-contain rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Options Grid (Right) */}
                    <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
                        <div className="grid grid-cols-4 gap-4 w-full mb-8">
                            {shuffledOptions.map((opt: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    disabled={isSubmitted}
                                    className={`aspect-square !bg-white border-2 rounded-lg overflow-hidden transition-all shadow-sm p-1
                                        ${selectedOption === i
                                            ? 'border-blue-500 ring-2 ring-blue-200 scale-105'
                                            : 'border-transparent hover:border-blue-300 hover:shadow-md'
                                        }
                                        ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}
                                    `}
                                >
                                    <img
                                        src={`${question.stimulus.options_base}${opt}.png`}
                                        alt={`Option ${opt}`}
                                        className="w-full h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default: SVG Grid Rendering
    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Select the missing piece</h2>

            {/* Matrix Grid */}
            <div className={`grid gap-4 mb-8 p-4 bg-gray-50 rounded-xl shadow-inner`}
                style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
                {grid.map((cell: any, i: number) => (
                    <div key={i} className="aspect-square bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center p-4">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
                            {renderShape(cell)}
                        </svg>
                    </div>
                ))}
                {/* Missing Cell */}
                <div className="aspect-square bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-4xl text-gray-400">?</span>
                </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-4 gap-4 w-full">
                {shuffledOptions.map((opt: any, i: number) => (
                    <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`aspect-square bg-white border-2 rounded-lg flex items-center justify-center p-4 transition-all hover:shadow-md
                    ${selectedOption === i
                                ? (question.answer === opt ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50')
                                : 'border-gray-200 hover:border-blue-400'
                            }`}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-600">
                            {renderShape(opt)}
                        </svg>
                    </button>
                ))}
            </div>
        </div>
    );
}
