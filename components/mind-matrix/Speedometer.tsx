import React, { useEffect, useState } from 'react';

interface SpeedometerProps {
    score: number;
}

export default function Speedometer({ score }: SpeedometerProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 300);
        return () => clearTimeout(timer);
    }, [score]);

    const radius = 80;
    const strokeWidth = 14;
    const circumference = Math.PI * radius;

    const normalizedScore = Math.min(100, Math.max(0, animatedScore));
    const offset = circumference - (normalizedScore / 100) * circumference;

    return (
        <div className="relative w-64 h-44 mx-auto flex flex-col items-center justify-end overflow-hidden mb-6">
            <svg
                viewBox="0 0 200 120"
                className="w-full h-full drop-shadow-sm transition-transform duration-1000 ease-out"
            >
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fca5a5" />   {/* red-300 */}
                        <stop offset="50%" stopColor="#fde047" />  {/* yellow-300 */}
                        <stop offset="100%" stopColor="#86efac" /> {/* green-300 */}
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
                </defs>

                {/* Background Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />

                {/* Foreground Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-out"
                />

            </svg>
            
            {/* Score Text */}
            <div className="absolute bottom-0 w-full text-center pb-1">
                <span className="text-5xl font-light tabular-nums text-stone-900 tracking-tight">
                    {Math.round(animatedScore)}
                </span>
            </div>
        </div>
    );
}
