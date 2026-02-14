"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const P5Task = dynamic(() => import("../../components/P5Task"), {
    ssr: false
});

export default function MemorabilityPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-lg">
                    &larr; Back to Menu
                </Link>
                <h1 className="text-xl font-bold">Memorability</h1>
            </div>

            <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
                <P5Task
                    sketch="/tasks/memorability/js/memorability.js"
                    extraScripts={[
                        "/tasks/memorability/js/utils.js",
                        "/tasks/memorability/js/list_imgs1.js",
                        "/tasks/memorability/js/config1.js",
                        "/tasks/memorability/js/config_tutorial.js",
                        "/tasks/memorability/js/timemanager.js",
                        "/tasks/memorability/js/parametermanager.js",
                        "/tasks/memorability/js/scene_tutorials.js",
                        "/tasks/memorability/js/scene_testtrial.js"
                    ]}
                />
            </div>
        </div>
    );
}
