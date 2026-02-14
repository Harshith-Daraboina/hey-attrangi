"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTestSession } from "@/hooks/iq-test/useTestSession";
import MultipleObjectTracking from "./visual/MultipleObjectTracking";
import MatrixReasoning from "./visual/MatrixReasoning";
import VisualWorkingMemory from "./visual/VisualWorkingMemory";
import GoNoGo from "./visual/GoNoGo";
import Enumeration from "./visual/Enumeration";

import Memorability from "./visual/Memorability";
import TaskSwitching from "./visual/TaskSwitching";
import IntakeForm from "./IntakeForm";
import GeneralTask from "./visual/GeneralTask";
import CalculatingScreen from "./CalculatingScreen";

export default function VisualTestEngine() {
    const [intakeCompleted, setIntakeCompleted] = useState(false);
    const [timer, setTimer] = useState(0); // Session timer in seconds
    const [calculationDone, setCalculationDone] = useState(false); // State for calculation screen

    const {
        status,
        currentQuestion,
        currentIndex,
        totalQuestions,
        results,
        startTest,
        submitAnswer
    } = useTestSession({ userId: "guest", age: 25 }); // Initial defaults

    // Timer Effect
    useEffect(() => {
        if (!intakeCompleted || status !== 'RUNNING') return;
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [intakeCompleted, status]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins}:${s.toString().padStart(2, '0')}`;
    };

    const handleIntakeComplete = (data: { name: string; age: number; confidence: number; focus: number; detail: number }) => {
        // Here we could update the useTestSession hook with real data
        // For now, let's just mark as done and potentially pass data to startTest if refactored
        // We need to refactor useTestSession to accept these *when calling startTest* or via context.
        // For this quick iteration, we'll store in local state and modify startTest call if possible,
        // or just accept that useTestSession takes initial props.

        // Actually, let's re-instantiate or pass to startTest? 
        // useTestSession takes props. We might need to lift state up or modify hook.
        // Easier: Modify startTest to accept overrides.

        setIntakeCompleted(true);
        startTest(data);
    };

    // Component Mapping
    const renderQuestion = () => {
        if (!currentQuestion) return <div>Loading Question...</div>;

        const commonProps = {
            question: currentQuestion,
            onComplete: (res: any) => {
                submitAnswer({
                    answer: res.correct ? (currentQuestion.answer || "CORRECT") : "WRONG",
                    reactionTime: res.reactionTime
                });
            }
        };

        const domain = currentQuestion.domain;

        // Visual Tasks
        if (domain === 'multiple_object_tracking') return <MultipleObjectTracking {...commonProps} />;
        if (domain === 'matrix_reasoning') return <MatrixReasoning {...commonProps} />;
        if (domain === 'working_memory_visual') return <VisualWorkingMemory {...commonProps} />;
        if (domain === 'go_no_go') return <GoNoGo {...commonProps} />;
        if (domain === 'enumeration') return <Enumeration {...commonProps} />;

        if (domain === 'memorability') return <Memorability {...commonProps} />;
        if (domain === 'task_switching') return <TaskSwitching {...commonProps} />;

        // General/Text Tasks (Numeric, Logic, Verbal, Attention, Speed, Working Memory)
        if (['numeric', 'logic', 'verbal', 'attention', 'processing_speed', 'integrated_reasoning', 'working_memory'].includes(domain)) {
            return <GeneralTask {...commonProps} />;
        }

        // Fallback
        return (
            <div className="text-center p-10">
                <h3 className="text-xl">Unknown Domain: {domain}</h3>
                <button onClick={() => commonProps.onComplete({ correct: true, reactionTime: 0 })}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Skip (Dev)
                </button>
            </div>
        );
    };

    if (!intakeCompleted) {
        return <IntakeForm onComplete={handleIntakeComplete} />;
    }

    if (status === 'IDLE' || status === 'LOADING') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Hey Attrangi IQ Test</h1>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="mt-4 text-gray-600">Preparing your assessment...</p>
            </div>
        );
    }

    const DOMAIN_DETAILS: Record<string, { label: string; description: string }> = {
        multiple_object_tracking: { label: "Multiple Object Tracking", description: "Reflects your ability to sustain attention and track multiple moving items simultaneously." },
        matrix_reasoning: { label: "Matrix Reasoning", description: "Measures your fluid intelligence and pattern recognition skills." },
        working_memory_visual: { label: "Visual Working Memory", description: "Indicates your capacity to hold and manipulate visual information in your mind." },
        go_no_go: { label: "Inhibitory Control", description: "Assesses your ability to control impulses and respond selectively to stimuli." },
        enumeration: { label: "Rapid Enumeration", description: "Reflects how quickly and accurately you can quantify small sets of items." },
        load_induced_blindness: { label: "Perceptual Awareness", description: "Measures your ability to detect stimuli under high attentional load." },
        memorability: { label: "Visual Recognition Memory", description: "Indicates your ability to recognize previously seen images." },
        task_switching: { label: "Cognitive Flexibility", description: "Reflects your ability to switch between different mental tasks and rules." },
        numeric: { label: "Numeric Reasoning", description: "Measures your ability to work with numbers and mathematical concepts." },
        logic: { label: "Logical Reasoning", description: "Assesses your ability to analyze arguments and draw correct conclusions." },
        verbal: { label: "Verbal Reasoning", description: "Reflects your vocabulary and ability to understand complex language." },
        attention: { label: "Sustained Attention", description: "Measures your ability to maintain focus over time." },
        processing_speed: { label: "Processing Speed", description: "Reflects how quickly you can perceive and process simple information." },
        integrated_reasoning: { label: "Integrated Reasoning", description: "Assesses your ability to combine information from multiple sources." },
    };

    if (status === 'COMPLETED' && results) {
        if (!calculationDone) {
            return <CalculatingScreen onComplete={() => setCalculationDone(true)} />;
        }

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans py-12">
                <div className="bg-white p-6 md:p-10 max-w-4xl w-full text-center rounded-3xl shadow-xl">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Assessment Complete</h1>
                    <p className="text-gray-500 mb-12 font-medium text-lg">Here is your comprehensive cognitive profile.</p>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-2">Total Score</h3>
                            <p className="text-7xl font-black text-gray-900 leading-none">{results.totalScore.toFixed(0)}</p>
                        </div>
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col justify-center">
                            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Cognitive Profile</h3>
                            <p className="text-3xl font-bold text-blue-900">{results.cognitiveProfile}</p>
                        </div>
                    </div>

                    <div className="text-left mb-16">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Domain Breakdown</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(results.domainScores as Record<string, number>).map(([domain, score]) => {
                                const details = DOMAIN_DETAILS[domain] || { label: domain.replace(/_/g, ' '), description: "Performance in this specific cognitive domain." };
                                return (
                                    <div key={domain} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-gray-800 text-lg">{details.label}</h4>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${score >= 70 ? 'bg-green-100 text-green-700' : score >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                                {score.toFixed(0)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{details.description}</p>
                                        <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gray-900 rounded-full"
                                                style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/test-your-iq'}
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg"
                    >
                        Return to Tests
                    </button>
                </div>
            </div>
        );
    }

    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col font-sans text-slate-800">
            {/* Navbar */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/logo-main.png"
                                alt="Attrangi Logo"
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-xl shadow-lg object-contain bg-white p-1"
                            />
                            <div>
                                <h1 className="text-xl font-bold text-orange-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Attrangi</h1>
                                <p className="text-xs text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Mental Healthcare</p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-6">
                            {/* Timer */}
                            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="font-mono text-lg font-bold text-orange-700 tabular-nums">
                                    {formatTime(timer)}
                                </span>
                            </div>

                            {/* Question Count */}
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Progress</span>
                                <span className="text-sm font-bold text-gray-700">
                                    Question {currentIndex + 1} <span className="text-gray-400">/ {totalQuestions}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-10 right-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="w-full max-w-5xl flex flex-col items-center animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                    {renderQuestion()}
                </div>
            </div>

            {/* Footer (Optional) */}
            <div className="py-4 text-center text-gray-400 text-xs">
                Reviewing answers...
            </div>
        </div>
    );
}
