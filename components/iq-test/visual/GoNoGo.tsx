"use client";

import { useState, useEffect, useRef } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";

import InstructionDialog from '../InstructionDialog';

interface GoNoGoProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function GoNoGo({ question, onComplete }: GoNoGoProps) {
    const {
        trial_count = 10,
        go_probability = 0.7,
        stimulus_duration_ms = 700,
        inter_trial_interval_ms = 500
    } = question.stimulus || {};

    const [gameState, setGameState] = useState<'INSTRUCTION' | 'FIXATION' | 'STIMULUS' | 'FEEDBACK' | 'FINISHED'>('INSTRUCTION');
    const [currentTrial, setCurrentTrial] = useState(0);
    const [stimulusType, setStimulusType] = useState<'GO' | 'NOGO'>('GO'); // Green vs Red
    const [feedback, setFeedback] = useState("");

    const resultsRef = useRef<{ type: string, response: boolean, rt: number }[]>([]);
    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    // Instructions
    const handleStart = () => {
        setGameState('FIXATION');
        runTrial();
    };

    const runTrial = () => {
        // 1. Fixation
        setGameState('FIXATION');
        const isGo = Math.random() < go_probability;
        setStimulusType(isGo ? 'GO' : 'NOGO');

        timeoutRef.current = setTimeout(() => {
            // 2. Stimulus
            setGameState('STIMULUS');
            startTimeRef.current = Date.now();

            // Auto-miss if no response
            timeoutRef.current = setTimeout(() => {
                handleResponse(false); // No response (Miss or Correct Rejection)
            }, stimulus_duration_ms);

        }, inter_trial_interval_ms + Math.random() * 200); // jitter
    };

    const handleResponse = (responded: boolean) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        const rt = responded ? Date.now() - startTimeRef.current : 0;
        const isGo = stimulusType === 'GO';

        // Logic
        // GO + Respond = Hit (Correct)
        // GO + No Respond = Miss (Error)
        // NOGO + Respond = False Alarm (Error)
        // NOGO + No Respond = Correct Rejection (Correct)

        let isCorrect = false;
        if (isGo && responded) isCorrect = true;
        if (!isGo && !responded) isCorrect = true;

        resultsRef.current.push({
            type: stimulusType,
            response: responded,
            rt: isCorrect && responded ? rt : 0
        });

        if (resultsRef.current.length >= trial_count) {
            finishGame();
        } else {
            runTrial();
        }
    };

    // Keyboard handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState === 'STIMULUS' && e.code === 'Space') {
                handleResponse(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    const finishGame = () => {
        setGameState('FINISHED');
        const trials = resultsRef.current;
        const correctCount = trials.filter(t => {
            if (t.type === 'GO' && t.response) return true;
            if (t.type === 'NOGO' && !t.response) return true;
            return false;
        }).length;

        const avgRT = trials
            .filter(t => t.type === 'GO' && t.response)
            .reduce((sum, t) => sum + t.rt, 0) / (trials.filter(t => t.type === 'GO' && t.response).length || 1);

        const isPass = (correctCount / trial_count) > 0.8; // Example threshold

        const score = calculateQuestionScore({
            isCorrect: isPass,
            reactionTime: avgRT,
            expectedTime: 500, // benchmark
            weight: question.weight,
            difficulty: question.difficulty
        });

        setTimeout(() => {
            onComplete({
                correct: isPass,
                score,
                reactionTime: avgRT
            });
        }, 1000);
    };

    if (gameState === 'INSTRUCTION') {
        return (
            <InstructionDialog
                title={question.prompt || "Go / No-Go Task"}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">Press <strong className="bg-gray-200 px-2 py-1 rounded">SPACE</strong> when you see the <span className="text-green-600 font-bold">GREEN</span> circle.</p>
                        <p className="text-xl">Do <strong className="text-red-600 font-bold">NOT</strong> press for the <span className="text-red-600 font-bold">RED</span> circle.</p>
                        <p className="text-lg text-gray-500">Respond as quickly as possible!</p>
                    </div>
                }
                onStart={handleStart}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 h-96">
            {gameState === 'FIXATION' && (
                <div className="text-4xl text-gray-400">+</div>
            )}

            {gameState === 'STIMULUS' && (
                <div
                    className={`w-40 h-40 rounded-full shadow-xl transition-transform transform scale-100
                ${stimulusType === 'GO' ? 'bg-green-500' : 'bg-red-500'}
            `}
                />
            )}

            {gameState === 'FINISHED' && (
                <div className="text-xl font-bold">Processing Results...</div>
            )}
        </div>
    );
}
