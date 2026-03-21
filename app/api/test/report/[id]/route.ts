import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mindBandMessage } from '@/lib/mind-matrix/scoring';
import { parseMindMatrixReportData } from '@/lib/mind-matrix/report-payload';

/**
 * Mind Matrix report contract (success):
 * { success: true, data: { score, band, message } }
 *
 * Prisma only maps current fields; legacy BSON keys (domainScores, metadata, etc.) are never read.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const resultId = resolvedParams.id;

        if (!resultId) {
            return NextResponse.json(
                { success: false, error: 'Result ID is required' },
                { status: 400 }
            );
        }

        const result = await prisma.testResult.findUnique({
            where: { id: resultId },
        });

        if (!result) {
            return NextResponse.json(
                { success: false, error: 'Result not found' },
                { status: 404 }
            );
        }

        if (typeof result.score !== 'number' || Number.isNaN(result.score)) {
            return NextResponse.json(
                { success: false, error: 'Mind Matrix result is invalid' },
                { status: 422 }
            );
        }

        const score = Math.max(0, Math.min(100, Math.round(result.score)));

        if (typeof result.band !== 'string' || !result.band.trim()) {
            return NextResponse.json(
                { success: false, error: 'Mind Matrix result is invalid' },
                { status: 422 }
            );
        }

        const message = mindBandMessage(score);
        const data = { score, band: result.band.trim(), message };

        if (!parseMindMatrixReportData(data)) {
            return NextResponse.json(
                { success: false, error: 'Mind Matrix result is invalid' },
                { status: 422 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });

    } catch (error) {
        console.error('Error fetching report:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
