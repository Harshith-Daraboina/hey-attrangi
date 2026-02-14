"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const P5Task = dynamic(() => import("../../components/P5Task"), {
    ssr: false
});

export default function TaskSwitchPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-6xl flex justify-between items-center mb-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors bg-gray-800 px-4 py-2 rounded-lg">
                    &larr; Back to Menu
                </Link>
                <h1 className="text-xl font-bold">Task Switching</h1>
            </div>

            <div className="border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
                <P5Task
                    sketch="/tasks/taskswitch/js/taskswitch.js"
                    extraScripts={[
                        "/tasks/taskswitch/js/utils.js",
                        "/tasks/taskswitch/js/config.js",
                        "/tasks/taskswitch/js/config_tutorial.js",
                        "/tasks/taskswitch/js/timemanager.js",
                        "/tasks/taskswitch/js/parametermanager.js",
                        "/tasks/taskswitch/js/scene_tutorials.js",
                        "/tasks/taskswitch/js/scene_testtrial.js"
                    ]}
                />
            </div>
        </div>
    );
}
