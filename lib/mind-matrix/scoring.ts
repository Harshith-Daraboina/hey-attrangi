/** Mind Matrix fixed session shape (matches API config). */
export const MIND_MATRIX_TOTAL_QUESTIONS = 12;
export const MIND_MATRIX_TOTAL_TIME_SECONDS = 180;

/**
 * Mind Matrix score: accuracy (70%) + global time left (30%).
 *
 * Accuracy always uses the full session length as the denominator (default 12).
 * `correctAnswers` must be the count of trials marked correct only. Unanswered
 * items are not stored as correct, so they contribute 0 to the numerator (same
 * as incorrect). Never divide by “attempted” count; that would game incomplete
 * sessions and break comparability across runs.
 */
export function computeMindMatrixScore(
    correctAnswers: number,
    timeRemainingSeconds: number,
    totalQuestions: number = MIND_MATRIX_TOTAL_QUESTIONS,
    totalTimeSeconds: number = MIND_MATRIX_TOTAL_TIME_SECONDS
): number {
    const tq = Math.max(1, totalQuestions);
    const tt = Math.max(1, totalTimeSeconds);
    const tr = Math.max(0, Math.min(tt, Math.floor(timeRemainingSeconds)));

    const accuracyScore = (correctAnswers / tq) * 70;
    const speedScore = (tr / tt) * 30;
    const finalScore = Math.round(accuracyScore + speedScore);

    return Math.max(0, Math.min(100, finalScore));
}

export type MindBand = "Sharp" | "Focused" | "Steady" | "Drifting" | "Foggy";

export function mindBandLabel(score: number): MindBand {
    if (score >= 85) return "Sharp";
    if (score >= 70) return "Focused";
    if (score >= 55) return "Steady";
    if (score >= 40) return "Drifting";
    return "Foggy";
}

/** One short line per band (supportive, not clinical). */
export function mindBandMessage(score: number): string {
    const band = mindBandLabel(score);
    const messages: Record<MindBand, string> = {
        Sharp: "Your mind is firing on all cylinders today.",
        Focused: "You're thinking clearly and processing well.",
        Steady: "A solid baseline. Consistent and reliable.",
        Drifting: "Your focus may be scattered. Rest could help.",
        Foggy: "Your mind seems tired today. That's okay.",
    };
    return messages[band];
}
