/** Shape of `data` in GET /api/test/report/:id success responses. */
export type MindMatrixReportData = {
    score: number;
    band: string;
    message: string;
};

/**
 * Validates the report `data` object. Ignores any extra keys on old API payloads.
 * Returns null if required fields are missing or invalid.
 */
export function parseMindMatrixReportData(data: unknown): MindMatrixReportData | null {
    if (!data || typeof data !== "object") return null;
    const o = data as Record<string, unknown>;
    if (typeof o.score !== "number" || !Number.isFinite(o.score)) return null;
    const score = Math.max(0, Math.min(100, Math.round(o.score)));
    if (typeof o.band !== "string" || !o.band.trim()) return null;
    if (typeof o.message !== "string" || !o.message.trim()) return null;
    return {
        score,
        band: o.band.trim(),
        message: o.message.trim(),
    };
}
