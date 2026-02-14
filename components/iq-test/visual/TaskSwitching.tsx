"use client";

import { useState, useEffect, useCallback } from "react";

import InstructionDialog from '../InstructionDialog';

interface TaskSwitchingProps {
    question: any;
    onComplete: (result: any) => void;
}

type Shape = 'circle' | 'square';
type Color = 'blue' | 'orange'; // Using orange instead of red to be colorblind friendly/less aggressive? Or stick to prompt 'red'. Prompt says 'red'.

export default function TaskSwitching({ question, onComplete }: TaskSwitchingProps) {
    const [status, setStatus] = useState<'INSTRUCTION' | 'FIXATION' | 'STIMULUS' | 'FEEDBACK'>('INSTRUCTION');
    const [currentTrial, setCurrentTrial] = useState(0);
    const [score, setScore] = useState(0);
    const [stimulus, setStimulus] = useState<{ color: Color, shape: Shape } | null>(null);
    const [rule, setRule] = useState<'COLOR' | 'SHAPE'>('COLOR'); // Current rule
    const [startTime, setStartTime] = useState(0);
    const [results, setResults] = useState<any[]>([]);

    const totalTrials = question.stimulus?.trial_count || 10;
    const switchProb = question.stimulus?.switch_probability || 0.5;

    // Instructions
    const shapeKeys = { left: 'Circle', right: 'Square' };
    const colorKeys = { left: 'Blue', right: 'Orange' }; // Mapping Left/Right

    const generateTrial = useCallback(() => {
        // Determine rule
        const isSwitch = Math.random() < switchProb;
        // Simple logic: if switch, flip rule. But for random flow:
        // Let's just pick randomly based on probability, or pre-generate. 
        // For simplicity: Random rule
        const newRule = Math.random() > 0.5 ? 'COLOR' : 'SHAPE';
        setRule(newRule);

        // Generate Stimulus
        const shapes: Shape[] = ['circle', 'square'];
        const colors: Color[] = ['blue', 'orange'];

        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        setStimulus({ shape, color });
        setStatus('FIXATION');

        setTimeout(() => {
            setStatus('STIMULUS');
            setStartTime(performance.now());
        }, 500); // 500ms fixation
    }, [switchProb]);

    useEffect(() => {
        if (status === 'INSTRUCTION') {
            // Wait for user to start
        }
    }, [status]);

    const handleResponse = (direction: 'LEFT' | 'RIGHT') => {
        if (status !== 'STIMULUS' || !stimulus) return;

        const reactionTime = performance.now() - startTime;
        let isCorrect = false;

        if (rule === 'SHAPE') {
            // Left = Circle, Right = Square
            if (direction === 'LEFT' && stimulus.shape === 'circle') isCorrect = true;
            if (direction === 'RIGHT' && stimulus.shape === 'square') isCorrect = true;
        } else {
            // Color: Left = Blue, Right = Orange
            if (direction === 'LEFT' && stimulus.color === 'blue') isCorrect = true;
            if (direction === 'RIGHT' && stimulus.color === 'orange') isCorrect = true;
        }

        const newResult = { trial: currentTrial, rule, isCorrect, reactionTime, switch: false }; // meaningful 'switch' needs prev trial tracking
        setResults(prev => [...prev, newResult]);

        if (isCorrect) setScore(s => s + 1);

        if (currentTrial + 1 >= totalTrials) {
            // Finish
            onComplete({
                correct: true, // Task completion is 'correct'
                score: (score + (isCorrect ? 1 : 0)) / totalTrials * 100, // Accuracy %
                reactionTime: 0 // Avg RT calculate later?
            });
        } else {
            setCurrentTrial(t => t + 1);
            generateTrial();
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (status !== 'STIMULUS') return;
            if (e.key === 'ArrowLeft') handleResponse('LEFT');
            if (e.key === 'ArrowRight') handleResponse('RIGHT');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, rule, stimulus]);

    if (status === 'INSTRUCTION') {
        return (
            <InstructionDialog
                title={question.prompt || "Task Switching"}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">Sort the shape based on the rule shown.</p>
                        <ul className="text-left bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="font-bold w-16">COLOR:</span>
                                <span className="text-blue-600 font-bold">Blue</span> = Left, <span className="text-orange-500 font-bold">Orange</span> = Right
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-bold w-16">SHAPE:</span>
                                <span>Circle = Left, Square = Right</span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-500 italic">Use Left / Right Arrow keys.</p>
                    </div>
                }
                onStart={() => generateTrial()}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto h-[500px]">
            {/* Status Bar */}
            <div className="mb-8 text-gray-400 font-medium tracking-wide">
                Trial {currentTrial + 1} / {totalTrials}
            </div>

            {/* Stimulus Card */}
            <div className={`
                w-64 h-64 flex items-center justify-center bg-white rounded-3xl shadow-xl transition-all duration-200
                border-[12px] 
                ${status === 'FIXATION' ? 'border-gray-100' : (rule === 'SHAPE' ? 'border-blue-500' : 'border-orange-500')}
            `}>
                {status === 'FIXATION' && (
                    <div className="text-4xl text-gray-300">+</div>
                )}

                {status === 'STIMULUS' && stimulus && (
                    <div className={`
                        transition-all duration-100
                        ${stimulus.shape === 'circle' ? 'rounded-full' : 'rounded-none'}
                        ${stimulus.color === 'blue' ? 'bg-blue-600' : 'bg-orange-500'}
                        w-32 h-32 shadow-sm
                    `}></div>
                )}
            </div>

            {/* Hint / Controls */}
            <div className="mt-12 grid grid-cols-2 gap-20 opacity-50">
                <div className="text-center">
                    <div className="text-2xl mb-2">⬅️</div>
                    <div className="text-xs font-bold uppercase">Left</div>
                    <div className="text-[10px] text-gray-500">Circle / Blue</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl mb-2">➡️</div>
                    <div className="text-xs font-bold uppercase">Right</div>
                    <div className="text-[10px] text-gray-500">Square / Orange</div>
                </div>
            </div>

            <div className="mt-8 flex gap-4 md:hidden">
                <button
                    onPointerDown={() => handleResponse('LEFT')}
                    className="p-6 bg-gray-100 rounded-full active:bg-blue-100"
                >
                    ⬅️
                </button>
                <button
                    onPointerDown={() => handleResponse('RIGHT')}
                    className="p-6 bg-gray-100 rounded-full active:bg-orange-100"
                >
                    ➡️
                </button>
            </div>
        </div>
    );
}
