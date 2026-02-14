import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const resultId = resolvedParams.id;

        if (!resultId) {
            return NextResponse.json({ error: 'Result ID is required' }, { status: 400 });
        }

        const result = await prisma.testResult.findUnique({
            where: { id: resultId },
        });

        if (!result) {
            return NextResponse.json({ error: 'Result not found' }, { status: 404 });
        }

        // Fetch session details for age/context if needed
        const session = await prisma.testSession.findUnique({
            where: { id: result.sessionId }
        });

        return NextResponse.json({
            success: true,
            data: {
                totalScore: result.totalScore,
                domainScores: result.domainScores,
                cognitiveProfile: result.cognitiveProfile,
                percentile: result.percentile,
                completedAt: result.createdAt,
                age: session?.age
            }
        });

    } catch (error) {
        console.error('Error fetching report:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
