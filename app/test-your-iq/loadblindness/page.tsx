"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const P5Task = dynamic(() => import("@/components/iq-test/P5Task"), {
    ssr: false
});

export default function LoadBlindnessPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-lg">
                    &larr; Back to Menu
                </Link>
                <h1 className="text-xl font-bold">Load Induced Blindness</h1>
            </div>

            <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
                <P5Task
                    sketch="/tasks/loadblindness/js/loadblindness.js"
                    extraScripts={[
                        "/tasks/loadblindness/js/utils.js",
                        "/tasks/loadblindness/js/config.js",
                        "/tasks/loadblindness/js/config_tutorial.js",
                        "/tasks/loadblindness/js/timemanager.js",
                        "/tasks/loadblindness/js/parametermanager.js",
                        "/tasks/loadblindness/js/scene_tutorials.js",
                        "/tasks/loadblindness/js/scene_testtrial.js"
                    ]}
                />
            </div>
        </div>
    );
}
