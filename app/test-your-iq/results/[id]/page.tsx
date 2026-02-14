"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { classifyIQ } from "@/lib/iq-test/scoring";

export default function ResultPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const id = resolvedParams.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch results
    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await fetch(`/api/test/report/${id}`);
                if (!res.ok) throw new Error("Failed to fetch results");
                const data = await res.json();
                setResult(data.data);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchResult();
    }, [id]);

    // Loading animation
    useEffect(() => {
        if (progress < 100) {
            const timer = setTimeout(() => {
                setProgress((prev) => Math.min(prev + 2, 100));
            }, 40);
            return () => clearTimeout(timer);
        } else if (result) {
            setTimeout(() => setLoading(false), 500);
        }
    }, [progress, result]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    // ---------------- Loading Screen ----------------
    if (loading) {
        const measures = [
            "Memory",
            "Processing Speed",
            "Attention",
            "Logic",
            "Reasoning",
        ];

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        Calculating your <span className="text-orange-500">IQ score</span>
                    </h1>

                    <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-8">
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="space-y-3">
                        {measures.map((m, i) => {
                            const isActive = progress > i * 20;
                            return (
                                <div
                                    key={m}
                                    className={`text-lg ${isActive ? "text-gray-800" : "text-gray-400"
                                        }`}
                                >
                                    {m}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (!result) return null;

    const { domainScores, cognitiveProfile, metadata } = result;
    const iq = metadata?.iq || 0;
    const analysis = metadata?.analysis || {};
    const iqClassification = classifyIQ(iq);

    const IQ_RANGES = [
        { range: "160+", label: "Exceptionally Gifted" },
        { range: "145 – 159", label: "Highly Gifted" },
        { range: "130 – 144", label: "Very Superior" },
        { range: "120 – 129", label: "Superior" },
        { range: "110 – 119", label: "High Average" },
        { range: "100 – 109", label: "Average (High)" },
        { range: "90 – 99", label: "Average" },
        { range: "80 – 89", label: "Low Average" },
        { range: "70 – 79", label: "Borderline" },
        { range: "55 – 69", label: "Extremely Low" },
        { range: "40 – 54", label: "Moderately Impaired" },
        { range: "Below 40", label: "Severely Impaired" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Assessment Complete
                    </h1>
                    <p className="text-gray-600 mt-3">
                        Your comprehensive cognitive analysis
                    </p>
                </div>

                {/* Score + Scale */}
                <div className="grid lg:grid-cols-3 gap-10">

                    {/* IQ Score Card */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-10 text-center shadow-xl border">
                            <h2 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">
                                IQ SCORE
                            </h2>
                            <div className="text-8xl font-extrabold text-gray-900">
                                {iq}
                            </div>
                            <div className="mt-4 text-lg font-semibold text-orange-600">
                                {iqClassification}
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-3xl p-8 text-center shadow-md border">
                            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">
                                Cognitive Profile
                            </h2>
                            <div className="text-2xl font-bold text-blue-900">
                                {cognitiveProfile}
                            </div>
                        </div>
                    </div>

                    {/* IQ Classification Scale */}
                    {/* IQ Classification Table */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-10 border border-gray-200">

                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            Official IQ Score Range Classification
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">

                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider border-b">
                                            IQ Score Range
                                        </th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider border-b">
                                            Classification
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {IQ_RANGES.map((row) => {
                                        const isActive = row.label === iqClassification;

                                        return (
                                            <tr
                                                key={row.range}
                                                className={`
                                          transition
                                          ${isActive
                                                        ? "bg-blue-50 border-l-4 border-blue-500"
                                                        : "hover:bg-gray-50"}
                                      `}
                                            >
                                                <td className={`px-6 py-4 font-medium ${isActive ? "text-blue-700 font-bold" : "text-gray-800"}`}>
                                                    {row.range}
                                                </td>
                                                <td className={`${isActive ? "text-blue-700 font-bold" : "text-gray-600"}`}>
                                                    {row.label}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* Domain Scores */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(domainScores as Record<string, number>).map(
                        ([domain, score]) => (
                            <div
                                key={domain}
                                className="bg-white rounded-3xl p-8 shadow-lg border"
                            >
                                <div className="flex justify-between mb-4">
                                    <h3 className="font-bold capitalize">
                                        {domain.replace(/_/g, " ")}
                                    </h3>
                                    <span className="text-xl font-bold text-blue-600">
                                        {score}
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full">
                                    <div
                                        className="h-full bg-blue-500 rounded-full transition-all duration-700"
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Detailed Analysis */}
                <div className="bg-white rounded-3xl shadow-xl p-10 border">
                    <h3 className="text-2xl font-bold text-center mb-8">
                        Detailed Cognitive Breakdown
                    </h3>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="font-bold text-green-600 mb-4">Strengths</h4>
                            <ul className="space-y-2">
                                {(analysis.strengths || []).map((s: string) => (
                                    <li key={s} className="capitalize">
                                        ✓ {s.replace(/_/g, " ")}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-orange-500 mb-4">
                                Areas for Growth
                            </h4>
                            <ul className="space-y-2">
                                {(analysis.weaknesses || []).map((w: string) => (
                                    <li key={w} className="capitalize">
                                        ⚠ {w.replace(/_/g, " ")}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
