import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
    computeMindMatrixScore,
    mindBandLabel,
    MIND_MATRIX_TOTAL_QUESTIONS,
    MIND_MATRIX_TOTAL_TIME_SECONDS,
} from '@/lib/mind-matrix/scoring';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId, timeRemainingSeconds: rawTimeRemaining } = body;

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        const timeRemainingSeconds = Math.max(
            0,
            Math.min(
                MIND_MATRIX_TOTAL_TIME_SECONDS,
                Math.floor(Number(rawTimeRemaining) || 0)
            )
        );

        const session = await prisma.testSession.update({
            where: { id: sessionId },
            data: {
                status: 'completed',
                endedAt: new Date()
            }
        });

        const trials = await prisma.rawTrialData.findMany({
            where: { sessionId }
        });

        const correctCount = trials.filter((t) => t.correct).length;

        const mindScore = computeMindMatrixScore(
            correctCount,
            timeRemainingSeconds,
            MIND_MATRIX_TOTAL_QUESTIONS,
            MIND_MATRIX_TOTAL_TIME_SECONDS
        );

        const band = mindBandLabel(mindScore);
        const timeTaken = Math.max(
            0,
            Math.min(
                MIND_MATRIX_TOTAL_TIME_SECONDS,
                MIND_MATRIX_TOTAL_TIME_SECONDS - timeRemainingSeconds
            )
        );

        // TestResult: only mapped fields (no domainScores, metadata, IQ, percentile).
        const result = await prisma.testResult.create({
            data: {
                sessionId,
                userId: session.userId ?? null,
                score: mindScore,
                band,
                correctAnswers: correctCount,
                timeTaken,
                createdAt: new Date()
            }
        });

        return NextResponse.json({
            success: true,
            resultId: result.id
        });

    } catch (error) {
        console.error('Error finishing test:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
