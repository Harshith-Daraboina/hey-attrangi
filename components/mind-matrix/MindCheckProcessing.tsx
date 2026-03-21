"use client";

import { useEffect, useState } from "react";

const FALLBACK_AFTER_MS = 3500;

/**
 * Screen 4: processing state with optional slow-network reassurance (no flicker if fast).
 */
export default function MindCheckProcessing() {
    const [showSlowHint, setShowSlowHint] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowSlowHint(true), FALLBACK_AFTER_MS);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 p-6 font-sans">
            <div className="w-full max-w-sm text-center space-y-8">
                <div className="space-y-3">
                    <p className="text-lg text-stone-600 leading-relaxed">Understanding your results…</p>
                    {showSlowHint ? (
                        <p
                            className="text-sm text-stone-500 leading-relaxed animate-in fade-in duration-500 fill-mode-both"
                            aria-live="polite"
                        >
                            Still working… almost there
                        </p>
                    ) : null}
                </div>
                <div className="flex justify-center" aria-hidden>
                    <div className="h-9 w-9 border-2 border-stone-200 border-t-stone-500 rounded-full animate-spin" />
                </div>
            </div>
        </div>
    );
}
