import { calculateConsistencyScore } from './scoring';

interface DomainScores {
    [domain: string]: number;
}

interface AnalysisResult {
    cognitiveProfile: string;
    strengths: string[];
    weaknesses: string[];
    consistencyScore: number;
    percentile: number; // Mocked for now
}

export function analyzePerformance(
    domainScores: DomainScores,
    reactionTimes: number[],
    accuracy: number
): AnalysisResult {

    const sortedDomains = Object.entries(domainScores).sort(([, a], [, b]) => b - a);
    const strengths = sortedDomains.slice(0, 2).map(([d]) => d);
    const weaknesses = sortedDomains.slice(-2).map(([d]) => d);

    const consistencyScore = calculateConsistencyScore(reactionTimes);

    let profile = "Balanced Thinker";

    // Heuristic Profiles based on User Request
    const speed = domainScores['processing_speed'] || 0;
    const logic = domainScores['logic'] || domainScores['matrix_reasoning'] || 0; // matrix_reasoning falls under logic
    const memory = domainScores['working_memory'] || domainScores['working_memory_visual'] || 0;

    // Calculate Variance for Consistency Check
    const meanRT = reactionTimes.reduce((a, b) => a + b, 0) / (reactionTimes.length || 1);
    const variance = reactionTimes.reduce((a, b) => a + Math.pow(b - meanRT, 2), 0) / (reactionTimes.length || 1);
    const stdDevRT = Math.sqrt(variance);

    // 1. Impulsivity: Fast reaction time (< avg) but low accuracy (< 60%)
    // Assuming "avg" refers to a benchmark. Let's say < 1000ms is "fast" for general tasks, or we use the user's own speed score.
    // User formula: if reaction_time < avg AND accuracy < 60%
    // Let's use the 'speed' score as a proxy for reaction time performance (higher score = faster/better).
    // If speed is high (> 70) and accuracy is low (< 60), it suggests impulsivity.
    if (speed > 70 && accuracy < 60) {
        profile = "Impulsive Responder";
    }
    // 2. Strong Logic Weak Memory: Logic > 80 AND Memory < 50
    else if (logic > 80 && memory < 50) {
        profile = "High Reasoning, Lower Retention";
    }
    // 3. Inconsistent Attention: High variance in reaction times
    // We can use the consistency score (which is derived from variance). Lower score = Higher variance.
    // If consistency score is low (< 50), it means high variance.
    else if (consistencyScore < 50) {
        profile = "Attention Instability";
    }
    // Default fallback logic from before
    else if (speed < 50 && accuracy > 90) {
        profile = "Deliberate Thinker";
    }

    return {
        cognitiveProfile: profile,
        strengths,
        weaknesses,
        consistencyScore,
        percentile: Math.min(99, Math.round(accuracy + (speed / 10))) // enhanced placeholder
    };
}
