export interface ScoringInput {
    isCorrect: boolean;
    reactionTime: number;
    expectedTime: number;
    weight: number;
    difficulty: string;
}

export function calculateQuestionScore(input: ScoringInput): number {
    const { isCorrect, reactionTime, expectedTime, weight } = input;

    // Base Score: 10 * weight
    const basePoints = 10 * weight;

    if (!isCorrect) {
        return 0;
    }

    const accuracyScore = basePoints;

    // Speed Bonus: max(0, (expected - actual) / expected) * 5
    // Note: Ensuring reactionTime doesn't exceed expectedTime for bonus purposes (capped at 0)
    let speedBonus = 0;
    if (reactionTime < expectedTime) {
        speedBonus = Math.max(0, (expectedTime - reactionTime) / expectedTime) * 5;
    }

    // Final Question Score
    return Math.round(accuracyScore + speedBonus);
}

export function calculateDomainScore(earnedPoints: number, maxPossiblePoints: number): number {
    if (maxPossiblePoints === 0) return 0;
    return (earnedPoints / maxPossiblePoints) * 100;
}

export function calculateOverallCognitiveIndex(domainScores: Record<string, number>): number {
    // Weights: Memory (0.2), Speed (0.2), Reaction (0.15), Concentration (0.2), Logic (0.25)
    // Note: 'reaction' usually maps to 'processing_speed' or specific reaction tasks.
    // 'concentration' might map to 'attention'.
    // We map internal domain names to these categories.

    const scores = {
        memory: domainScores['working_memory'] || domainScores['memory'] || 0,
        speed: domainScores['processing_speed'] || 0,
        reaction: domainScores['reaction_time'] || domainScores['processing_speed'] || 0, // Fallback if no specific reaction domain
        concentration: domainScores['attention'] || 0,
        logic: domainScores['logic'] || domainScores['reasoning'] || 0
    };

    const weightedScore =
        (scores.memory * 0.20) +
        (scores.speed * 0.20) +
        (scores.reaction * 0.15) +
        (scores.concentration * 0.20) +
        (scores.logic * 0.25);

    return Math.round(weightedScore);
}

export function calculateStandardizedIQ(overallScore: number): number {
    // IQ = 100 + ((user_score - mean) / std_dev) * 15
    // Placeholder Mean and StdDev for standardization
    const MEAN_SCORE = 60; // Assumed average overall score out of 100
    const STD_DEV = 15;    // Assumed standard deviation

    const zScore = (overallScore - MEAN_SCORE) / STD_DEV;
    const iq = 100 + (zScore * 15);

    return Math.round(iq);
}

export function calculateConsistencyScore(reactionTimes: number[]): number {
    if (reactionTimes.length < 2) return 100;

    const mean = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    const variance = reactionTimes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / reactionTimes.length;
    const stdDev = Math.sqrt(variance);

    // Normalize: Lower stdDev is better.
    // Let's say stdDev of 500ms is "okay" (Score 80), 2000ms is "bad" (Score 20).
    const score = Math.max(0, 100 - (stdDev / 10));
    return Math.round(score);
}

export function classifyIQ(iq: number): string {
    if (iq >= 160) return "Exceptionally Gifted";
    if (iq >= 145) return "Highly Gifted";
    if (iq >= 130) return "Very Superior";
    if (iq >= 120) return "Superior";
    if (iq >= 110) return "High Average";
    if (iq >= 100) return "Average (High)";
    if (iq >= 90) return "Average";
    if (iq >= 80) return "Low Average";
    if (iq >= 70) return "Borderline";
    if (iq >= 55) return "Extremely Low";
    if (iq >= 40) return "Moderately Impaired";
    return "Severely Impaired";
}
