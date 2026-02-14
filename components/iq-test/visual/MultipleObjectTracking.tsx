"use client";

import { useEffect, useRef, useState } from "react";
import { calculateQuestionScore } from "@/lib/iq-test/scoring";

import InstructionDialog from '../InstructionDialog';

interface MOTProps {
    question: any;
    onComplete: (result: any) => void;
}

export default function MultipleObjectTracking({ question, onComplete }: MOTProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'HIGHLIGHT' | 'MOVING' | 'SELECTING' | 'FINISHED'>('HIGHLIGHT');
    const [selectedTargets, setSelectedTargets] = useState<number[]>([]);
    const [message, setMessage] = useState("Memorize the highlighted circles!");
    const [started, setStarted] = useState(false); // Add started state

    // Refs for performance (Animation Loop)
    const gameStateRef = useRef<'HIGHLIGHT' | 'MOVING' | 'SELECTING' | 'FINISHED'>('HIGHLIGHT');
    const selectedTargetsRef = useRef<number[]>([]);

    // Sync state to refs for drawing
    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    useEffect(() => {
        selectedTargetsRef.current = selectedTargets;
    }, [selectedTargets]);

    // Game parameters
    const { object_count = 8, target_count = 3, movement_duration_ms = 4000, speed_range = [2, 4] } = question.stimulus || {};

    // Refs for animation loop to avoid re-renders
    const objects = useRef<any[]>([]);
    const animationFrameId = useRef<number>(0);
    const startTime = useRef<number>(0);

    useEffect(() => {
        if (started) {
            initGame();
        }
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [question, started]);

    const initGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize objects
        const newObjects = [];
        for (let i = 0; i < object_count; i++) {
            newObjects.push({
                id: i,
                x: Math.random() * (canvas.width - 40) + 20,
                y: Math.random() * (canvas.height - 40) + 20,
                vx: (Math.random() - 0.5) * speed_range[1],
                vy: (Math.random() - 0.5) * speed_range[1],
                isTarget: i < target_count,
                radius: 15,
                color: '#3B82F6' // Default Blue
            });
        }
        objects.current = newObjects;

        // Start Sequence
        setGameState('HIGHLIGHT');
        setMessage("Track these BLUE circles!");

        // Highlight Phase
        setTimeout(() => {
            setGameState('MOVING'); // Hide highlights, start moving
            setMessage("Keep your eyes on them...");
            startTime.current = Date.now();
            loop();
        }, 2000);

        draw(); // Initial draw
    };

    const loop = () => {
        const elapsed = Date.now() - startTime.current;
        if (elapsed > movement_duration_ms) {
            setGameState('SELECTING');
            setMessage("Select the original targets.");
            draw(); // Final position
            return;
        }

        updatePhysics();
        draw();
        animationFrameId.current = requestAnimationFrame(loop);
    };

    const updatePhysics = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        objects.current.forEach(obj => {
            obj.x += obj.vx;
            obj.y += obj.vy;

            // Bounce off walls
            if (obj.x - obj.radius < 0 || obj.x + obj.radius > canvas.width) obj.vx *= -1;
            if (obj.y - obj.radius < 0 || obj.y + obj.radius > canvas.height) obj.vy *= -1;
        });
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false }); // Optimize
        if (!ctx) return;

        ctx.fillStyle = '#f9fafb'; // bg-gray-50
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with color

        objects.current.forEach(obj => {
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);

            if (gameStateRef.current === 'HIGHLIGHT' && obj.isTarget) {
                ctx.fillStyle = '#F59E0B'; // Highlight Orange
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#F59E0B';
            } else if (gameStateRef.current === 'SELECTING' && selectedTargetsRef.current.includes(obj.id)) {
                ctx.fillStyle = '#10B981'; // Selected Green
                ctx.shadowBlur = 0;
            } else {
                ctx.fillStyle = '#3B82F6'; // Standard Blue
                ctx.shadowBlur = 0;
            }

            ctx.fill();
            ctx.closePath();

            // Reset shadow
            ctx.shadowBlur = 0;
        });
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (gameState !== 'SELECTING') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Find clicked object
        const clickedObj = objects.current.find(obj => {
            const dx = obj.x - x;
            const dy = obj.y - y;
            return Math.sqrt(dx * dx + dy * dy) < obj.radius + 5; // +5 tolerance
        });

        if (clickedObj && !selectedTargets.includes(clickedObj.id)) {
            const newSelection = [...selectedTargets, clickedObj.id];
            setSelectedTargets(newSelection);

            // Critical Fix: Update ref immediately so draw() sees the new state
            selectedTargetsRef.current = newSelection;

            draw(); // Re-draw to show selection

            // Check if finished selection
            if (newSelection.length === target_count) {
                finishGame(newSelection);
            }
        }
    };

    const finishGame = (finalSelection: number[]) => {
        setGameState('FINISHED');

        // Calculate Score
        let correctCount = 0;
        finalSelection.forEach(id => {
            const obj = objects.current.find(o => o.id === id);
            if (obj && obj.isTarget) correctCount++;
        });

        const isCorrect = correctCount === target_count; // All correct?
        // Partial credits could be implemented, but adherence to binary is strict in some tests
        // Let's stick to strict or weighted.

        // Call onComplete
        const score = calculateQuestionScore({
            isCorrect,
            reactionTime: 0, // Not timed for speed
            expectedTime: 0,
            weight: question.weight,
            difficulty: question.difficulty
        });

        setTimeout(() => {
            onComplete({
                correct: isCorrect,
                score,
                reactionTime: 0
            });
        }, 1000); // 1s delay to see result
    };

    if (!started) {
        return (
            <InstructionDialog
                title={question.prompt}
                instructions={
                    <div className="text-center space-y-4">
                        <p className="text-xl">Several blue circles will appear.</p>
                        <p className="text-xl font-bold text-orange-500">Some will flash ORANGE. <br /> These are your targets.</p>
                        <p className="text-lg">Track them as they move around.</p>
                        <p className="text-md text-gray-500 italic">When they stop, click on the original targets.</p>
                    </div>
                }
                onStart={() => setStarted(true)}
            />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{message}</h2>
            <canvas
                ref={canvasRef}
                width={600}
                height={400} // Fixed size for consistency
                className="border-4 border-gray-200 rounded-lg shadow-inner bg-gray-50 cursor-pointer"
                onClick={handleCanvasClick}
            />
        </div>
    );
}
