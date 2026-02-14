import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, questionId, answer, reactionTime } = body;

        if (!sessionId || !questionId || answer === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Fetch Question to check answer
        const question = await prisma.visualQuestion.findUnique({
            where: { questionId: questionId }
        });

        if (!question) {
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        // Check correctness
        let isCorrect = false;

        // Handle explicit string/JSON matching
        if (question.answer) {
            const dbAnswer = String(question.answer);
            const userAnswer = String(answer);
            isCorrect = dbAnswer === userAnswer;
        } else {
            // Procedural/Client-side scored question (fallback)
            // If the DB answer is null, we assume the client sent "CORRECT" if they passed.
            // In a production app, we would verify the raw data stream here.
            isCorrect = answer === "CORRECT";
        }

        // 2. Record Raw Trial Data
        await prisma.rawTrialData.create({
            data: {
                sessionId,
                questionId,
                correct: isCorrect,
                reactionTime: reactionTime || 0,
                timestamp: new Date()
            }
        });

        // 3. Update Session Log (Optional, for quick access)
        // We could append to currentLog, but RawTrialData is better for analysis

        // 4. Get Next Question (Placeholder for Adaptive Engine)
        // For now, let's just find a random question that hasn't been answered?
        // Simplified: Just return success and let frontend request next or we return one here.
        // Let's return a simple success response for now, frontend will manage flow or call /api/test/question

        return NextResponse.json({
            success: true,
            correct: isCorrect,
            correctAnswer: question.answer // Optional: strictly for feedback if needed
        });

    } catch (error) {
        console.error('Error submitting answer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
