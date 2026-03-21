"use client";

import { useEffect, useState, use } from "react";
import MindCheckProcessing from "@/components/mind-matrix/MindCheckProcessing";
import { getMindCheckRetakeLine } from "@/lib/mind-matrix/mind-check-retake";
import {
    parseMindMatrixReportData,
    type MindMatrixReportData,
} from "@/lib/mind-matrix/report-payload";

export default function ResultPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<MindMatrixReportData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await fetch(`/api/test/report/${id}`);
                const json = await res.json();
                if (!res.ok || json.success !== true) {
                    throw new Error(
                        typeof json.error === "string" ? json.error : "Failed to fetch results"
                    );
                }
                const parsed = parseMindMatrixReportData(json.data);
                if (!parsed) {
                    setError("Result data was incomplete.");
                    return;
                }
                setResult(parsed);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        void fetchResult();
    }, [id]);

    if (loading) {
        return <MindCheckProcessing />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-700 px-6">
                <div className="text-center max-w-md">
                    <h1 className="text-xl font-medium text-stone-900 mb-2">We couldn&apos;t load this result</h1>
                    <p className="text-stone-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    if (!result) return null;

    return (
        <div className="min-h-screen bg-stone-50 py-16 px-6 flex flex-col items-center justify-center">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-sm border border-stone-200/80 p-8 md:p-12 text-center">
                <p className="text-sm text-gray-500 mb-2">Your Mind Today</p>
                <p className="text-8xl font-light tabular-nums text-stone-900 leading-none tracking-tight">
                    {Math.round(result.score)}
                </p>
                <p className="mt-8 text-xl font-medium text-stone-700">{result.band}</p>
                {result.message ? (
                    <p className="mt-6 text-stone-600 text-base leading-relaxed">{result.message}</p>
                ) : null}
                <p className="mt-8 text-sm text-stone-500">{getMindCheckRetakeLine()}</p>
                <p className="mt-6 text-xs text-stone-400 leading-relaxed">
                    For reflection only, not medical advice.
                </p>
                <a
                    href="/mind-matrix"
                    className="mt-8 inline-block w-full py-3.5 bg-stone-800 text-white text-sm font-medium rounded-xl hover:bg-stone-900 transition-colors text-center"
                >
                    Back to Mind Matrix
                </a>
            </div>
        </div>
    );
}
