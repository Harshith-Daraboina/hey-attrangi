import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateQuestionScore, calculateDomainScore, calculateOverallCognitiveIndex, calculateStandardizedIQ } from '@/lib/iq-test/scoring';
import { analyzePerformance } from '@/lib/iq-test/analysis';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
        }

        // 1. Update Session Status
        const session = await prisma.testSession.update({
            where: { id: sessionId },
            data: {
                status: 'completed',
                endedAt: new Date()
            }
        });

        // 2. Calculate Advanced Scores
        // Fetch all trials
        const trials = await prisma.rawTrialData.findMany({
            where: { sessionId }
        });

        // Fetch questions to get weights/difficulty/domain if not in trials (trials have limited data)
        // Optimization: We might need to join or fetch questions. 
        // For now, let's assume we need to fetch the question details for each trial to get domain/weight.
        // Or better, we can just fetch all visualQuestions and map them.
        const questionIds = trials.map(t => t.questionId);
        const questions = await prisma.visualQuestion.findMany({
            where: { questionId: { in: questionIds } }
        });

        const questionMap = new Map(questions.map(q => [q.questionId, q]));

        let totalEarnedPoints = 0;
        let totalPossiblePoints = 0;
        const domainPoints: Record<string, { earned: number, possible: number }> = {};
        const reactionTimes: number[] = [];
        let correctCount = 0;

        for (const trial of trials) {
            const question = questionMap.get(trial.questionId);
            if (!question) continue;

            const weight = question.weight || 1;
            const domain = question.domain;
            const expectedTime = question.expectedTimeMs || 10000;

            const score = calculateQuestionScore({
                isCorrect: trial.correct,
                reactionTime: trial.reactionTime,
                expectedTime,
                weight,
                difficulty: question.difficulty
            });

            const maxScore = 10 * weight + 5 * weight; // Base + Max Bonus (Assuming max bonus matches logic)
            // Wait, logic in scoring.ts for max bonus was just `5 * weight` (or just 5 if I followed user strictly, but I implemented `* weight` to be safe/consistent with base).
            // Let's re-verify scoring.ts logic I just wrote.
            // I wrote: `speedBonus = Math.max(0, ...) * 5;` -> NO WEIGHT in my implementation of speed bonus!
            // CONSTANT 5 points max bonus.
            // So Max Possible = (10 * weight) + 5.

            const maxPossibleForQuestion = (10 * weight) + 5;

            totalEarnedPoints += score;
            totalPossiblePoints += maxPossibleForQuestion;

            if (trial.correct) correctCount++;
            reactionTimes.push(trial.reactionTime);

            // Domain aggregation
            if (!domainPoints[domain]) {
                domainPoints[domain] = { earned: 0, possible: 0 };
            }
            domainPoints[domain].earned += score;
            domainPoints[domain].possible += maxPossibleForQuestion;
        }

        // Calculate Domain Scores (0-100)
        const finalDomainScores: Record<string, number> = {};
        for (const [domain, data] of Object.entries(domainPoints)) {
            finalDomainScores[domain] = calculateDomainScore(data.earned, data.possible);
        }

        // Calculate Overall Index
        const overallScore = calculateOverallCognitiveIndex(finalDomainScores);

        // Calculate IQ
        const iqScore = calculateStandardizedIQ(overallScore);

        // Analyze Performance
        const accuracy = (correctCount / (trials.length || 1)) * 100;
        const analysis = analyzePerformance(finalDomainScores, reactionTimes, accuracy);

        // 3. Create Test Result
        const result = await prisma.testResult.create({
            data: {
                sessionId,
                totalScore: overallScore, // Storing Overall Index as total score
                domainScores: finalDomainScores,
                percentile: analysis.percentile,
                cognitiveProfile: analysis.cognitiveProfile,
                metadata: {
                    iq: iqScore,
                    analysis: analysis
                } as any,
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
