"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const P5Task = dynamic(() => import("@/components/iq-test/P5Task"), {
    ssr: false
});

export default function MotPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-lg">
                    &larr; Back to Menu
                </Link>
                <h1 className="text-xl font-bold">Multiple Object Tracking</h1>
            </div>

            <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
                <P5Task
                    sketch="/tasks/moteval/js/moteval.js"
                    extraScripts={[
                        "/tasks/moteval/js/utils.js",
                        "/tasks/moteval/js/config.js",
                        "/tasks/moteval/js/config_tutorial.js",
                        "/tasks/moteval/js/timemanager.js",
                        "/tasks/moteval/js/parametermanager.js",
                        "/tasks/moteval/js/scene_tutorials.js",
                        "/tasks/moteval/js/scene_testtrial.js"
                    ]}
                />
            </div>
        </div>
    );
}
