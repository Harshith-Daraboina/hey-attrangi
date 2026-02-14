"use client";

import { useState, useEffect } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";

interface MemoryProps {
    question: any;
    onComplete: (result: any) => void;
}

import InstructionDialog from '../InstructionDialog';

interface MemoryProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function VisualWorkingMemory({ question, onComplete }: MemoryProps) {
    const { grid_size = 3, sequence_length = 5 } = question.stimulus || {};

    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [gameState, setGameState] = useState<'INSTRUCTION' | 'SHOWING' | 'WAITING' | 'RECALL' | 'FINISHED'>('INSTRUCTION');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Initial sequence generation moved to start
    const startGame = () => {
        setGameState('SHOWING');
        const newSeq = [];
        for (let i = 0; i < sequence_length; i++) {
            newSeq.push(Math.floor(Math.random() * (grid_size * grid_size)));
        }
        setSequence(newSeq);
        playSequence(newSeq);
    };

    const playSequence = (seq: number[]) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= seq.length) {
                clearInterval(interval);
                setActiveIndex(null);
                setGameState('RECALL');
                return;
            }
            setActiveIndex(seq[i]);
            setTimeout(() => setActiveIndex(null), 500); // Flash duration
            i++;
        }, 1000); // Gap duration

        return () => clearInterval(interval);
    };

    const handleCellClick = (index: number) => {
        if (gameState !== 'RECALL') return;

        const newSeq = [...userSequence, index];
        setUserSequence(newSeq);

        // Visual feedback (flash click)
        setActiveIndex(index);
        setTimeout(() => setActiveIndex(null), 200);

        // Check correctness immediately? Or wait for full sequence?
        // Let's wait for full sequence length
        if (newSeq.length === sequence_length) {
            finishGame(newSeq);
        }
    };

    const finishGame = (finalSeq: number[]) => {
        setGameState('FINISHED');
        const isCorrect = finalSeq.every((val, index) => val === sequence[index]);

        setTimeout(() => {
            onComplete({
                correct: isCorrect,
                score: isCorrect ? question.weight * 10 : 0,
                reactionTime: 0
            });
        }, 1000);
    };

    if (gameState === 'INSTRUCTION') {
        return (
            <InstructionDialog
                title={question.prompt || "Spatial Sequence Memory"}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">Watch the squares light up in a sequence.</p>
                        <p className="text-lg font-bold text-blue-600">Memorize the order.</p>
                        <p className="text-md text-gray-600">Then, tap the squares in the exact same order.</p>
                    </div>
                }
                onStart={startGame}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold mb-4">
                {gameState === 'SHOWING' ? 'Watch the sequence...' : 'Repeat the pattern!'}
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                {gameState === 'SHOWING'
                    ? "Pay close attention to the order in which the squares light up. You will need to repeat the exact sequence."
                    : "Tap the squares in the same order they lit up."}
            </p>

            <div className="grid gap-4"
                style={{
                    gridTemplateColumns: `repeat(${grid_size}, minmax(0, 1fr))`,
                    width: '400px', height: '400px'
                }}>
                {Array.from({ length: grid_size * grid_size }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleCellClick(i)}
                        disabled={gameState !== 'RECALL'}
                        className={`w-full h-full rounded-2xl transition-all duration-300 transform 
                    ${activeIndex === i
                                ? 'bg-indigo-500 scale-105 shadow-[0_0_25px_rgba(99,102,241,0.6)] border-indigo-400 z-10'
                                : 'bg-white shadow-md hover:shadow-lg border border-gray-100 hover:border-blue-100'
                            }
                    ${gameState !== 'RECALL'
                                ? 'cursor-default'
                                : 'cursor-pointer hover:-translate-y-1 active:scale-95'
                            }
                `}
                    />
                ))}
            </div>
        </div>
    );
}
