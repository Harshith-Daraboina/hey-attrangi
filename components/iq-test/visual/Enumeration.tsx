"use client";

import { useEffect, useState, useRef } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";
import InstructionDialog from "../InstructionDialog";

interface EnumerationProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function Enumeration({ question, onComplete }: EnumerationProps) {
    const [started, setStarted] = useState(false);
    const [showStimulus, setShowStimulus] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        grid_size = 5,
        red_count = 7,
        blue_count = 5,
        display_time_ms = 2500
    } = question.stimulus || {};

    const [dots, setDots] = useState<any[]>([]);

    useEffect(() => {
        // Reset state on question change
        setIsSubmitting(false);
        setStarted(false);
        setShowStimulus(false);
        setShowOptions(false);

        // Generate positions
        const newDots = [];
        const totalCells = grid_size * grid_size;
        const positions = new Set<number>();

        // Random unique positions
        while (positions.size < (red_count + blue_count)) {
            positions.add(Math.floor(Math.random() * totalCells));
        }

        const posArray = Array.from(positions);

        // Assign colors
        for (let i = 0; i < posArray.length; i++) {
            newDots.push({
                pos: posArray[i],
                color: i < red_count ? 'red' : 'blue'
            });
        }
        setDots(newDots);
    }, [question]);

    const startTrial = () => {
        setStarted(true);
        setShowStimulus(true);

        setTimeout(() => {
            setShowStimulus(false);
            setShowOptions(true);
        }, display_time_ms);
    };

    const handleAnswer = (choice: string) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const isCorrect = choice === question.answer;
        const score = calculateQuestionScore({
            isCorrect,
            reactionTime: 0,
            expectedTime: question.expectedTimeMs || 3000,
            weight: question.weight,
            difficulty: question.difficulty
        });

        onComplete({
            correct: isCorrect,
            score,
            reactionTime: 0
        });
    };

    if (!started) {
        return (
            <InstructionDialog
                title={question.prompt || "Rapid Enumeration"}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">You will see a grid of red and blue squares.</p>
                        <p className="text-xl font-bold text-red-600">Count the RED squares accurately!</p>
                        <p className="text-sm text-gray-500">The grid will disappear quickly (2.5s).</p>
                    </div>
                }
                onStart={startTrial}
            />
        );
    }

    if (showStimulus) {
        return (
            <div className="flex items-center justify-center h-96">
                <div
                    className="grid gap-2 bg-gray-100 p-4 rounded-lg shadow-inner"
                    style={{
                        gridTemplateColumns: `repeat(${grid_size}, 1fr)`,
                        width: '400px',
                        height: '400px'
                    }}
                >
                    {Array.from({ length: grid_size * grid_size }).map((_, i) => {
                        const dot = dots.find(d => d.pos === i);
                        return (
                            <div key={i} className="w-full h-full flex items-center justify-center">
                                {dot && (
                                    <div
                                        className={`w-4/5 h-4/5 rounded-sm shadow-sm ${dot.color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (showOptions) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <h3 className="text-xl font-bold mb-6">How many RED squares?</h3>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {question.options.map((opt: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt)}
                            disabled={isSubmitting}
                            className={`p-6 border-2 rounded-xl text-xl font-bold transition 
                                ${isSubmitting
                                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-slate-800'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
