/**
 * Copy for Mind Check retake / cadence messaging.
 * Pass `daysUntilNext` when you have a server-computed or client-derived countdown.
 */
export type MindCheckRetakeOptions = {
    /** Whole days until the user is encouraged to take another Mind Check (future use). */
    daysUntilNext?: number | null;
};

const DEFAULT_RETAKE_INTERVAL_DAYS = 7;

/**
 * User-facing retake line. Today: fixed "Retake in 7 days".
 * Later: e.g. `getMindCheckRetakeLine({ daysUntilNext: 3 })` → "Next Mind Check in 3 days".
 */
export function getMindCheckRetakeLine(options?: MindCheckRetakeOptions): string {
    const n = options?.daysUntilNext;
    if (n != null && Number.isFinite(n) && n > 0) {
        const d = Math.max(1, Math.ceil(n));
        return `Next Mind Check in ${d} day${d === 1 ? "" : "s"}`;
    }
    return `Retake in ${DEFAULT_RETAKE_INTERVAL_DAYS} days`;
}
