import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, questionId, answer } = body;

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

        // RawTrialData.reactionTime is required by schema but unused in Mind Matrix (always 0; not read for scoring).
        await prisma.rawTrialData.create({
            data: {
                sessionId,
                questionId,
                correct: isCorrect,
                reactionTime: 0,
                timestamp: new Date()
            }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error submitting answer:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
