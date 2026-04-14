"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { useTestSession } from "@/hooks/mind-matrix/useTestSession";
import MatrixReasoning from "./visual/MatrixReasoning";
import Enumeration from "./visual/Enumeration";
import GeneralTask from "./visual/GeneralTask";
import MindCheckProcessing from "./MindCheckProcessing";
import { getMindCheckRetakeLine } from "@/lib/mind-matrix/mind-check-retake";

const PROCESSING_MIN_MS = 1600;

function formatMmSs(secs: number): string {
    const safe = Math.max(0, Math.floor(secs));
    const mins = Math.floor(safe / 60);
    const s = safe % 60;
    return `${mins}:${s.toString().padStart(2, "0")}`;
}

function MindCheckShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FFF7ED] flex flex-col items-center justify-center p-6 font-sans text-stone-800">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
}

export default function VisualTestEngine() {
    const [preTest, setPreTest] = useState<"entry" | "instructions">("entry");
    const [resultReleased, setResultReleased] = useState(false);
    const finishingAtRef = useRef<number | null>(null);

    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
    const [showTimeUp, setShowTimeUp] = useState(false);
    const timedOutRef = useRef(false);
    const secondsLeftRef = useRef(0);
    const prevStatusRef = useRef<string>("IDLE");

    const {
        status,
        currentQuestion,
        currentIndex,
        totalQuestions,
        results,
        timeLimitSeconds,
        startTest,
        submitAnswer,
        finishTest,
    } = useTestSession({ userId: "guest" });

    const finishTestRef = useRef(finishTest);
    finishTestRef.current = finishTest;

    useEffect(() => {
        if (secondsLeft !== null) secondsLeftRef.current = secondsLeft;
    }, [secondsLeft]);

    useEffect(() => {
        if (prevStatusRef.current === "LOADING" && status === "RUNNING") {
            setSecondsLeft(timeLimitSeconds);
            timedOutRef.current = false;
            setShowTimeUp(false);
        }
        prevStatusRef.current = status;
    }, [status, timeLimitSeconds]);

    useEffect(() => {
        if (status === "LOADING" || status === "COMPLETED" || status === "FINISHING") {
            setShowTimeUp(false);
        }
    }, [status]);

    useEffect(() => {
        if (status === "FINISHING") {
            finishingAtRef.current = Date.now();
            setResultReleased(false);
        }
    }, [status]);

    useEffect(() => {
        if (status !== "COMPLETED" || !results || finishingAtRef.current === null) return;
        const elapsed = Date.now() - finishingAtRef.current;
        const remaining = Math.max(0, PROCESSING_MIN_MS - elapsed);
        const t = setTimeout(() => setResultReleased(true), remaining);
        return () => clearTimeout(t);
    }, [status, results]);

    useEffect(() => {
        if (!showTimeUp) return;
        const t = setTimeout(() => {
            void finishTestRef.current({ timeRemainingSeconds: 0 });
        }, 1200);
        return () => clearTimeout(t);
    }, [showTimeUp]);

    useEffect(() => {
        if (status !== "RUNNING" || secondsLeft === null) return;

        const id = setInterval(() => {
            setSecondsLeft((s) => {
                if (s === null || s <= 0) return 0;
                const next = s - 1;
                if (next <= 0) {
                    if (!timedOutRef.current) {
                        timedOutRef.current = true;
                        queueMicrotask(() => setShowTimeUp(true));
                    }
                    return 0;
                }
                return next;
            });
        }, 1000);

        return () => clearInterval(id);
    }, [status, secondsLeft === null, finishTest]);

    const displaySeconds = secondsLeft ?? timeLimitSeconds;
    const timeAlmostUp = status === "RUNNING" && displaySeconds <= 30 && displaySeconds > 0;

    const renderQuestion = () => {
        if (!currentQuestion) return <div className="text-stone-500 text-center py-12">Loading…</div>;

        const commonProps = {
            question: currentQuestion,
            onComplete: (res: { correct: boolean }) => {
                if (timedOutRef.current) return;
                submitAnswer({
                    answer: res.correct ? (currentQuestion.answer || "CORRECT") : "WRONG",
                    timeRemainingSeconds: secondsLeftRef.current,
                });
            },
        };

        const domain = currentQuestion.domain;

        if (domain === "matrix_reasoning") return <MatrixReasoning {...commonProps} />;
        if (domain === "enumeration") return <Enumeration {...commonProps} />;
        if (domain === "logic" || domain === "processing_speed") {
            return <GeneralTask {...commonProps} />;
        }

        return (
            <div className="text-center p-10 max-w-md mx-auto">
                <p className="text-stone-600 mb-4">This step isn&apos;t part of today&apos;s Mind Check.</p>
                <button
                    type="button"
                    onClick={() => {
                        if (timedOutRef.current) return;
                        commonProps.onComplete({ correct: false });
                    }}
                    className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-medium"
                >
                    Skip
                </button>
            </div>
        );
    };

    // Entry
    if (preTest === "entry") {
        return (
            <MindCheckShell>
                <div className="bg-[#FFF7ED] rounded-3xl shadow-sm border border-stone-200/80 p-10 md:p-12 text-center">
                    <h1 className="text-2xl md:text-[1.65rem] font-semibold text-stone-900 leading-snug">
                        Take a moment to check in with your mind (3 min)
                    </h1>
                    <button
                        type="button"
                        onClick={() => setPreTest("instructions")}
                        className="mt-10 w-full py-3.5 bg-stone-800 text-white text-base font-medium rounded-xl hover:bg-stone-900 transition-colors"
                    >
                        Start Mind Check
                    </button>
                </div>
            </MindCheckShell>
        );
    }

    // Instructions (visible while session loads)
    if (preTest === "instructions" && (status === "IDLE" || status === "LOADING")) {
        const loading = status === "LOADING";
        return (
            <MindCheckShell>
                <div className="bg-[#FFF7ED] rounded-3xl shadow-sm border border-stone-200/80 p-10 md:p-12">
                    <h2 className="text-xl font-semibold text-stone-900 text-center mb-8">Before you begin</h2>
                    <ul className="space-y-4 text-stone-600 text-left text-base leading-relaxed mb-10">
                        <li className="flex gap-3">
                            <span className="text-stone-400 shrink-0">•</span>
                            <span>Twelve short steps, one screen at a time. Go at a pace that feels okay.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-stone-400 shrink-0">•</span>
                            <span>You have about three minutes in total; a timer will count down gently.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-stone-400 shrink-0">•</span>
                            <span>This isn&apos;t a test of you as a person. It&apos;s just a snapshot for today.</span>
                        </li>
                    </ul>
                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => void startTest()}
                            className="w-full py-3.5 bg-stone-800 text-white text-base font-medium rounded-xl hover:bg-stone-900 transition-colors disabled:opacity-60 disabled:pointer-events-none"
                        >
                            {loading ? "Loading…" : "I'm Ready"}
                        </button>
                        {loading ? (
                            <div
                                className="h-6 w-6 border-2 border-stone-200 border-t-stone-500 rounded-full animate-spin"
                                aria-hidden
                            />
                        ) : null}
                    </div>
                </div>
            </MindCheckShell>
        );
    }

    if (status === "ERROR") {
        return (
            <MindCheckShell>
                <div className="bg-[#FFF7ED] rounded-3xl shadow-sm border border-stone-200/80 p-10 text-center">
                    <h1 className="text-xl font-semibold text-stone-900 mb-3">We couldn&apos;t complete your Mind Check</h1>
                    <p className="text-stone-600 text-sm mb-8">
                        Something went wrong. Please try again in a moment.
                    </p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="w-full py-3.5 bg-stone-800 text-white text-sm font-medium rounded-xl hover:bg-stone-900"
                    >
                        Retry
                    </button>
                </div>
            </MindCheckShell>
        );
    }

    // Processing
    const showProcessing =
        status === "FINISHING" || (status === "COMPLETED" && results && !resultReleased);

    if (showProcessing) {
        return <MindCheckProcessing />;
    }

    // Result
    if (status === "COMPLETED" && results && resultReleased) {
        const score = typeof results.score === "number" ? results.score : 0;
        const band = typeof results.band === "string" ? results.band : "";
        const message = typeof results.message === "string" ? results.message : "";

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF7ED] p-4 font-sans py-12">
                <div className="bg-[#FFF7ED] p-8 md:p-12 max-w-lg w-full text-center rounded-3xl shadow-sm border border-stone-200/80">
                    <p className="text-sm text-gray-500 mb-2">Your Mind Today</p>
                    <p className="text-8xl font-light tabular-nums text-stone-900 leading-none tracking-tight">
                        {Math.round(score)}
                    </p>
                    <p className="mt-8 text-xl font-medium text-stone-700">{band}</p>
                    {message ? (
                        <p className="mt-6 text-stone-600 text-base leading-relaxed max-w-sm mx-auto">{message}</p>
                    ) : null}
                    <p className="mt-8 text-sm text-stone-500">{getMindCheckRetakeLine()}</p>
                    <button
                        type="button"
                        onClick={() => (window.location.href = "/mind-matrix")}
                        className="mt-10 w-full py-3.5 bg-stone-800 text-white text-sm font-medium rounded-xl hover:bg-stone-900 transition-colors"
                    >
                        Back to Mind Matrix
                    </button>
                </div>
            </div>
        );
    }

    // Active check-in
    const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
    const stepNum = totalQuestions > 0 ? currentIndex + 1 : 0;

    return (
        <div className="min-h-screen bg-[#FFF7ED] flex flex-col font-sans text-stone-800 relative">
            {showTimeUp ? (
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-900/40 backdrop-blur-sm px-6 animate-in fade-in duration-300"
                    role="status"
                    aria-live="polite"
                >
                    <div className="bg-white rounded-2xl shadow-lg px-8 py-10 max-w-sm w-full text-center border border-stone-200">
                        <p className="text-stone-800 text-base font-medium leading-relaxed">
                            Time&apos;s up. Understanding your results…
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="h-8 w-8 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
                        </div>
                    </div>
                </div>
            ) : null}

            <div className="bg-[#FFF7ED]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-between items-center gap-y-3 py-3 md:py-0 md:h-20 md:flex-nowrap">
                        <div className="flex items-center gap-3 min-w-0">
                            <Image
                                src="/images/logo-main.png"
                                alt="Attrangi Logo"
                                width={56}
                                height={56}
                                className="w-14 h-14 rounded-xl shadow-sm object-contain bg-[#FFF7ED] p-1"
                            />
                            <div>
                                <h1
                                    className="text-xl font-bold text-orange-600"
                                    style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                    Attrangi
                                </h1>
                                <p
                                    className="text-xs text-stone-600 font-medium"
                                    style={{ fontFamily: "Poppins, sans-serif" }}
                                >
                                    Mental Healthcare
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto justify-end sm:justify-start flex-wrap sm:flex-nowrap">
                            <div
                                className={`flex items-center gap-2 px-3 py-2 md:px-4 rounded-full border tabular-nums shrink-0 ${
                                    timeAlmostUp ? "bg-amber-50 border-amber-200" : "bg-stone-100 border-stone-200/80"
                                }`}
                            >
                                <svg
                                    className={`w-5 h-5 shrink-0 ${timeAlmostUp ? "text-amber-600" : "text-stone-500"}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="flex flex-col items-start sm:items-end leading-tight min-w-0">
                                    <span
                                        className={`text-xs font-semibold uppercase ${timeAlmostUp ? "text-amber-800" : "text-stone-500"}`}
                                    >
                                        Time left
                                    </span>
                                    <span
                                        className={`font-mono text-base md:text-lg font-bold ${timeAlmostUp ? "text-amber-900" : "text-stone-800"}`}
                                    >
                                        {formatMmSs(displaySeconds)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end leading-tight">
                                <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">
                                    Progress
                                </span>
                                <span className="text-sm font-bold text-stone-900 tabular-nums">
                                    Step {stepNum}{" "}
                                    <span className="text-stone-400 font-medium">of {totalQuestions}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-1 bg-orange-100/50">
                    <div
                        className="h-full bg-orange-600 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative">
                <div className="w-full max-w-5xl flex flex-col items-center animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                    {renderQuestion()}
                </div>
            </div>
        </div>
    );
}
