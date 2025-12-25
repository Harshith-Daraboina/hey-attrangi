"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const conditions = [
    { id: "pcos", label: "PCOS" },
    { id: "pmdd", label: "PMDD" },
    { id: "birth-control", label: "Birth Control/Hormonal Contraceptives" },
    { id: "sexual-functioning", label: "Sexual Functioning" },
    { id: "fertility", label: "Fertility" },
    { id: "conception-post-partum", label: "Conception To Post Partum" },
];

export default function WomensHealthPage() {
    const [activeCondition, setActiveCondition] = useState("sexual-functioning");

    return (
        <div className="min-h-screen bg-white font-poppins">
            <Navigation currentPath="/conditions/womens-health" />

            {/* Hero Section */}
            <div className="bg-[#fff3e7] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Women's Health - Mental Health Care Women's Therapist
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Your mental well-being is tied in closely with physical, emotional, and hormonal health—Imbalances in one aspect will affect others.
                        </p>
                        <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-md">
                            EXPLORE CARE OPTIONS
                        </button>
                    </div>
                    <div className="relative h-[400px] w-full">
                        {/* Placeholder for the illustration from the image */}
                        <Image
                            src="/images/src4.png" // Reusing an existing image as placeholder
                            alt="Women's Health Illustration"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Conditions Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            What Affects A Women's Body, Affects Her Mind
                        </h2>
                        <p className="text-gray-600">
                            Whether you are experiencing natural shifts due to age, or facing challenging imbalances, hormones define how you feel, function and interact with the world.
                        </p>
                    </div>

                    {/* Condition Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {conditions.map((condition) => (
                            <button
                                key={condition.id}
                                onClick={() => setActiveCondition(condition.id)}
                                className={`px-6 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${activeCondition === condition.id
                                        ? "bg-gray-700 text-white border-gray-700"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-500"
                                    }`}
                            >
                                {condition.label}
                            </button>
                        ))}
                    </div>

                    {/* Condition Detail Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 mb-20 animate-fade-in">
                        {activeCondition === "sexual-functioning" && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-3xl text-orange-500">🎒</span> {/* Placeholder icon */}
                                    <h3 className="text-2xl font-bold text-orange-500">Sexual Functioning</h3>
                                </div>

                                <p className="text-gray-700 mb-8">
                                    At least 43% women report some sort of challenges with sexual functioning, including but not limited to vaginismus (painful penetration) and anorgasmia (difficulty reaching orgasm)
                                </p>

                                <div className="grid md:grid-cols-3 gap-8">
                                    {/* Column 1 */}
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-4">Causes Symptoms Like</h4>
                                        <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
                                            <li>Involuntary painful vaginal or pelvic spasms/contractions</li>
                                            <li>Decrease in or lack of sex drive</li>
                                            <li>Delay or absence of orgasm</li>
                                        </ul>
                                    </div>

                                    {/* Column 2 */}
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-4">Making You Feel</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Anxious or overly cautious about engaging in sexual acts; depressed, or hopeless; body dysmorphia, or shame/anxiety/disconnect with your physical appearance
                                        </p>
                                    </div>

                                    {/* Column 3 */}
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h4 className="font-semibold text-gray-900 mb-4">Leading To Social Challenges Like</h4>
                                        <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
                                            <li>Trouble maintaining and building personal relationships</li>
                                            <li>Attempts at self-isolation due to lowered self-esteem/confidence</li>
                                            <li>Decreased motivation to engage in previously enjoyable activities</li>
                                            <li>Inability to fulfill professional demands/expectations</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeCondition !== "sexual-functioning" && (
                            <div className="text-center py-20 text-gray-500">
                                Content for {conditions.find(c => c.id === activeCondition)?.label} coming soon.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
