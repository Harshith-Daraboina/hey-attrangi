import { useState, useCallback } from 'react';
import {
    parseMindMatrixReportData,
    type MindMatrixReportData,
} from '@/lib/mind-matrix/report-payload';

interface UseTestSessionProps {
    userId?: string;
    age?: number;
}

export interface MindMatrixSessionConfig {
    totalQuestions: number;
    timeLimitSeconds: number;
    selectionMode: string;
}

export interface FinishTestOptions {
    timeRemainingSeconds: number;
}

export function useTestSession({ userId, age }: UseTestSessionProps) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [status, setStatus] = useState<
        'IDLE' | 'LOADING' | 'RUNNING' | 'FINISHING' | 'COMPLETED' | 'ERROR'
    >('IDLE');
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<MindMatrixReportData | null>(null);
    const [sessionConfig, setSessionConfig] = useState<MindMatrixSessionConfig | null>(null);

    const finishTest = useCallback(async (opts: FinishTestOptions) => {
        if (!sessionId) return;
        setStatus('FINISHING');

        try {
            const res = await fetch('/api/test/finish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    timeRemainingSeconds: opts.timeRemainingSeconds,
                }),
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                setStatus('ERROR');
                return;
            }

            const reportRes = await fetch(`/api/test/report/${data.resultId}`);
            const reportJson = await reportRes.json();

            if (!reportRes.ok || reportJson.success !== true) {
                setStatus('ERROR');
                return;
            }

            const parsed = parseMindMatrixReportData(reportJson.data);
            if (!parsed) {
                setStatus('ERROR');
                return;
            }

            setResults(parsed);
            setStatus('COMPLETED');
        } catch {
            setStatus('ERROR');
        }
    }, [sessionId]);

    const startTest = useCallback(async (userData?: { name?: string; age?: number }) => {
        setStatus('LOADING');
        setSessionConfig(null);
        try {
            const body: Record<string, unknown> = {
                userId: userData?.name?.trim() || userId || "guest",
            };
            if (userData?.age !== undefined && userData.age !== null && !Number.isNaN(userData.age)) {
                body.age = userData.age;
            } else if (age !== undefined) {
                body.age = age;
            }

            const res = await fetch('/api/test/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (!res.ok || !data.sessionId || !Array.isArray(data.questions)) {
                setStatus('ERROR');
                return;
            }

            setSessionId(data.sessionId);
            setQuestions(data.questions);
            setCurrentQuestionIndex(0);
            if (data.config) {
                setSessionConfig({
                    totalQuestions: data.config.totalQuestions ?? data.questions.length,
                    timeLimitSeconds: data.config.timeLimitSeconds ?? 180,
                    selectionMode: data.config.selectionMode ?? 'random_balanced',
                });
            } else {
                setSessionConfig({
                    totalQuestions: data.questions.length,
                    timeLimitSeconds: 180,
                    selectionMode: 'random_balanced',
                });
            }
            setStatus('RUNNING');
        } catch {
            setStatus('ERROR');
        }
    }, [userId, age]);

    const submitAnswer = useCallback(async (answerData: { answer: string; timeRemainingSeconds?: number }) => {
        if (!sessionId) return;

        const currentQ = questions[currentQuestionIndex];

        try {
            const res = await fetch('/api/test/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    questionId: currentQ.questionId,
                    answer: answerData.answer,
                }),
            });

            if (!res.ok) {
                setStatus('ERROR');
                return;
            }

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                await finishTest({
                    timeRemainingSeconds: answerData.timeRemainingSeconds ?? 0,
                });
            }

        } catch {
            setStatus('ERROR');
        }
    }, [sessionId, questions, currentQuestionIndex, finishTest]);

    return {
        status,
        currentQuestion: questions[currentQuestionIndex],
        totalQuestions: questions.length,
        currentIndex: currentQuestionIndex,
        results,
        sessionConfig,
        timeLimitSeconds: sessionConfig?.timeLimitSeconds ?? 180,
        startTest,
        submitAnswer,
        finishTest,
    };
}
