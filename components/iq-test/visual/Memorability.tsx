"use client";

import { useState } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";
import InstructionDialog from "../InstructionDialog";

interface MemorabilityProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function Memorability({ question, onComplete }: MemorabilityProps) {
    const [started, setStarted] = useState(false);
    const [index, setIndex] = useState(0);
    const [seenSet, setSeenSet] = useState<Set<string>>(new Set());
    const [correctCount, setCorrectCount] = useState(0);

    // Hardcoded sequence for MVP since image paths in seed are fake
    const sequence = [
        { id: 'apple', content: '🍎' },
        { id: 'banana', content: '🍌' },
        { id: 'grapes', content: '🍇' },
        { id: 'apple', content: '🍎' }, // Repeat (target)
        { id: 'orange', content: '🍊' },
        { id: 'banana', content: '🍌' }, // Repeat (target)
        { id: 'pear', content: '🍐' },
        { id: 'grapes', content: '🍇' }  // Repeat (target)
    ];

    const currentItem = sequence[index];

    const handleChoice = (choice: 'New' | 'Seen') => {
        const hasSeen = seenSet.has(currentItem.id);
        const isCorrect = (choice === 'Seen' && hasSeen) || (choice === 'New' && !hasSeen);

        if (isCorrect) setCorrectCount(c => c + 1);

        // Add to seen set
        const newSet = new Set(seenSet);
        newSet.add(currentItem.id);
        setSeenSet(newSet);

        // Next item
        if (index < sequence.length - 1) {
            setIndex(i => i + 1);
        } else {
            finish();
        }
    };

    const finish = () => {
        const accuracy = (correctCount / sequence.length);
        const passed = accuracy > 0.6; // 60% threshold

        const score = calculateQuestionScore({
            isCorrect: passed,
            reactionTime: 0,
            expectedTime: 0,
            weight: question.weight,
            difficulty: question.difficulty
        });

        onComplete({
            correct: passed,
            score,
            reactionTime: 0
        });
    };

    if (!started) {
        return (
            <InstructionDialog
                title={question.prompt}
                instructions={
                    <>
                        <p>Here is how it works:</p>
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-200">
                            <span className="text-2xl">🌱</span>
                            <span>Click <strong className="text-green-700 font-black">NEW</strong> if seeing for the 1st time.</span>
                        </div>
                        <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-200">
                            <span className="text-2xl">👀</span>
                            <span>Click <strong className="text-blue-700 font-black">SEEN</strong> if it appeared before.</span>
                        </div>
                    </>
                }
                onStart={() => setStarted(true)}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-md">
            <div className="text-9xl mb-12 p-16 bg-white rounded-3xl shadow-lg border-2 border-gray-100 flex items-center justify-center w-64 h-64 animate-in fade-in zoom-in duration-300">
                {currentItem.content}
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
                <button
                    onClick={() => handleChoice('New')}
                    className="py-4 bg-green-500 text-white text-xl font-bold rounded-xl hover:bg-green-600 transition shadow-md active:scale-95"
                >
                    New
                </button>
                <button
                    onClick={() => handleChoice('Seen')}
                    className="py-4 bg-blue-500 text-white text-xl font-bold rounded-xl hover:bg-blue-600 transition shadow-md active:scale-95"
                >
                    Seen
                </button>
            </div>
            <div className="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((index + 1) / sequence.length) * 100}%` }}
                />
            </div>
            <p className="mt-2 text-gray-400 text-sm font-medium">Item {index + 1} of {sequence.length}</p>
        </div>
    );
}
