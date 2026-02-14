"use client";

import { useEffect, useState } from 'react';

interface CalculatingScreenProps {
    onComplete: () => void;
}

export default function CalculatingScreen({ onComplete }: CalculatingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false, false]);

    const measures = ["Memory", "Speed", "Reaction", "Concentration", "Logic"];

    useEffect(() => {
        // Total duration approx 5 seconds
        const duration = 5000;
        const intervalTime = 50;
        const steps = duration / intervalTime;
        const progressIncrement = 100 / steps;

        let currentProgress = 0;
        const timer = setInterval(() => {
            currentProgress += progressIncrement;
            setProgress(Math.min(currentProgress, 100));

            // Check items based on progress
            const newChecked = [...checkedItems];
            if (currentProgress > 15) newChecked[0] = true;
            if (currentProgress > 35) newChecked[1] = true;
            if (currentProgress > 55) newChecked[2] = true;
            if (currentProgress > 75) newChecked[3] = true;
            if (currentProgress > 90) newChecked[4] = true;
            setCheckedItems(newChecked);

            if (currentProgress >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 800); // Small delay before finishing
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4 font-sans">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Calculating your</h1>
                <h1 className="text-4xl font-bold text-orange-500 mb-10">IQ score...</h1>

                <p className="text-gray-900 mb-4 font-semibold text-lg">5 key measures of intelligence</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-5 mb-10 overflow-hidden">
                    <div
                        className="bg-orange-500 h-5 rounded-full transition-all duration-100 ease-linear flex items-center justify-center"
                        style={{ width: `${progress}%` }}
                    >
                        <span className="text-xs text-white font-bold">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Checklist */}
                <div className="space-y-5">
                    {measures.map((measure, index) => (
                        <div key={measure} className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded border-2 box-border flex items-center justify-center transition-all duration-300 ${checkedItems[index] ? 'bg-orange-500 border-orange-500' : 'border-gray-200 bg-white'}`}>
                                {checkedItems[index] && (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                            <span className={`text-lg font-bold transition-colors duration-300 ${checkedItems[index] ? 'text-gray-900' : 'text-gray-900'}`}>
                                {measure}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
