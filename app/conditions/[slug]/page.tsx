"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

// Duplicate the concerns data here for now since we don't have a shared data file yet
const concerns = [
    {
        title: "Depression",
        description: "Does your life feel impossible & hopeless? You don’t have to manage it alone.",
        slug: "depression",
        icon: "🌧️",
    },
    {
        title: "Anxiety",
        description: "Chronic worry, mental fatigue, and feeling like your thoughts are always one step ahead of you?",
        slug: "anxiety",
        icon: "🧠",
    },
    {
        title: "Obsessive Compulsive Disorder (OCD)",
        description: "Are your thoughts out of control & making you feel overwhelmed? You can find ways to cope better.",
        slug: "ocd",
        icon: "🧼",
    },
    {
        title: "Bipolar Disorder",
        description: "Are you struggling with episodes of mania or depression? You can find the care you need with us.",
        slug: "bipolar-disorder",
        icon: "🎭",
    },
    {
        title: "Adult ADHD",
        description: "Have you always struggled with difficulty focussing, being restless, or impulsivity? There are ways to manage it better.",
        slug: "adult-adhd",
        icon: "⚡",
    },
    {
        title: "Social Anxiety",
        description: "Do social settings make you anxious and fearful? We can help you cope with social situations better.",
        slug: "social-anxiety",
        icon: "🚶",
    },
    {
        title: "Women’s Health",
        description: "Is your mental health taking a toll due to hormonal, sexual or fertility concerns? We can help improve your well-being.",
        slug: "womens-health",
        icon: "🌸",
    },
    {
        title: "Alcohol Addiction",
        description: "Is your use of alcohol interfering with your ability to lead a fulfilling life? You can find the right support.",
        slug: "alcohol-addiction",
        icon: "🍷",
    },
    {
        title: "Tobacco Addiction",
        description: "Have you tried multiple times to quit tobacco, but are finding it difficult? It is possible to be tobacco free, and recover completely.",
        slug: "tobacco-addiction",
        icon: "🚬",
    },
];

export default function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    const concern = concerns.find((c) => c.slug === slug);

    if (!concern) {
        return notFound();
    }

    // specific content based on slug - extending the basic data
    const content = {
        symptoms: [
            "Persistent feelings of sadness or hopelessness",
            "Loss of interest in daily activities",
            "Changes in sleep or appetite",
            "Difficulty concentrating",
        ],
        approach: "We use a combination of Cognitive Behavioral Therapy (CBT), interpersonal therapy, and medication management when necessary. Our goal is to help you understand the root causes and develop effective coping strategies.",
        ...concern
    };

    return (
        <div className="min-h-screen bg-white font-poppins">
            <Navigation currentPath={`/conditions/${slug}`} />

            {/* Hero Section */}
            <div className="bg-[#fff3e7] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-2">
                            Condition Overview
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {concern.title} Care & Support
                        </h1>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {concern.description} At Attrangi, we provide specialized care to help you navigate through these challenges with compassion and expertise.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                                Book a Consultation
                            </button>
                            <button className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative h-[400px] w-full flex items-center justify-center">
                        <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50 flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
                            <div className="text-[8rem] filter drop-shadow-xl animate-pulse">
                                {concern.icon}
                            </div>
                            {/* Decorative circles */}
                            <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Content Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-12">
                            {/* Understanding Section */}
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">ℹ️</span>
                                    Understanding {concern.title}
                                </h2>
                                <div className="prose prose-lg text-gray-600 leading-relaxed">
                                    <p>
                                        {concern.title} is a complex condition that affects many aspects of life. It's not just "in your head" — it involves biological, psychological, and social factors.
                                        Understanding your experience is the first step towards healing.
                                    </p>
                                    <p className="mt-4">
                                        Many people with {concern.title} feel isolated or misunderstood. Our approach validates your feelings and provides a structured path forward.
                                    </p>
                                </div>
                            </section>

                            {/* Symptoms Section */}
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">🔍</span>
                                    Common Signs & Symptoms
                                </h2>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {content.symptoms.map((symptom, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{symptom}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Approach Section */}
                            <section>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">🌱</span>
                                    How We Can Help
                                </h2>
                                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 p-8">
                                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                        {content.approach}
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-6 mt-8">
                                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                            <div className="text-2xl mb-2">🗣️</div>
                                            <div className="font-semibold text-gray-900">Therapy</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                            <div className="text-2xl mb-2">💊</div>
                                            <div className="font-semibold text-gray-900">Medication</div>
                                        </div>
                                        <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                                            <div className="text-2xl mb-2">🧘</div>
                                            <div className="font-semibold text-gray-900">Lifestyle</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-orange-50 rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Start Your Journey</h3>
                                <p className="text-gray-600 mb-6 text-sm">
                                    Take the first step towards better mental health today. Our specialists are here to listen.
                                </p>
                                <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-md mb-4">
                                    Book Appointment
                                </button>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-2">Need immediate help?</p>
                                    <a href="tel:1234567890" className="text-orange-600 font-bold hover:underline">
                                        Call Helpline
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
