import { useState, useEffect, useCallback } from 'react';

interface UseTestSessionProps {
    userId?: string;
    age?: number;
}

export function useTestSession({ userId, age }: UseTestSessionProps) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'RUNNING' | 'COMPLETED' | 'ERROR'>('IDLE');
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [results, setResults] = useState<any>(null);

    // Anti-Cheat: Visibility Tracking
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && status === 'RUNNING') {
                console.warn("User switched tabs!");
                // We could flag this in the session log via API
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [status]);

    const startTest = useCallback(async (userData?: { name: string; age: number; confidence: number }) => {
        setStatus('LOADING');
        try {
            const body: any = { userId: userData?.name || userId || "guest", age: userData?.age || age || 25 };
            // Pass confidence if we want to store it (schema update needed? or just log)
            // For now, we just use it for "adaptive questionabilty" simulation on backend if we implemented it.

            const res = await fetch('/api/test/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (data.sessionId) {
                setSessionId(data.sessionId);
                setQuestions(data.questions);
                setStatus('RUNNING');
            } else {
                setStatus('ERROR');
            }
        } catch (e) {
            console.error(e);
            setStatus('ERROR');
        }
    }, [userId, age]);

    const submitAnswer = useCallback(async (answerData: any) => {
        if (!sessionId) return;

        // Optimistic update
        // Move to next question immediately? Or wait? 
        // Let's wait for confirmation to be safe, but show loading if needed.

        const currentQ = questions[currentQuestionIndex];

        try {
            await fetch('/api/test/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    questionId: currentQ.questionId,
                    answer: answerData.answer, // string
                    reactionTime: answerData.reactionTime
                }),
            });

            // Move to next
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
            } else {
                finishTest();
            }

        } catch (e) {
            console.error(e);
            // Handle retry?
        }
    }, [sessionId, questions, currentQuestionIndex]);

    const finishTest = useCallback(async () => {
        if (!sessionId) return;
        setStatus('LOADING');

        try {
            const res = await fetch('/api/test/finish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });
            const data = await res.json();

            if (data.success) {
                setStatus('COMPLETED');
                // Fetch report
                const reportRes = await fetch(`/api/test/report/${data.resultId}`);
                const reportData = await reportRes.json();
                setResults(reportData.data);
            }
        } catch (e) {
            console.error(e);
            setStatus('ERROR');
        }
    }, [sessionId]);

    return {
        status,
        currentQuestion: questions[currentQuestionIndex],
        totalQuestions: questions.length,
        currentIndex: currentQuestionIndex,
        results,
        startTest,
        submitAnswer
    };
}
