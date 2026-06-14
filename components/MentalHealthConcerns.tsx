"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    CloudRain,
    Brain,
    Zap,
    Users,
    Sparkles,
    Wine,
    Cigarette,
    Flower2,
    ArrowRight,
    LayoutGrid,
    Search
} from 'lucide-react';

type ConcernTheme = {
    bg: string;
    hoverBg: string;
    title: string;
    btnBg: string;
    btnText: string;
    border: string;
};

type Concern = {
    title: string;
    description: string;
    slug: string;
    icon: React.ReactNode;
    theme: ConcernTheme;
};

type Category = {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    concerns: Concern[];
};

const MentalHealthConcerns = () => {
    const categories: Category[] = [
        {
            id: "mood",
            name: "Mood Disorders",
            description: "Understand and manage your emotional highs and lows with professional support.",
            icon: <Brain className="w-5 h-5" />,
            concerns: [
                {
                    title: "Depression",
                    description: "Feeling persistent sadness, hopelessness, or losing interest in things you once enjoyed?",
                    slug: "depression",
                    icon: <CloudRain className="w-12 h-12 text-purple-500" />,
                    theme: {
                        bg: "bg-purple-50/50",
                        hoverBg: "hover:bg-purple-50",
                        title: "text-purple-900",
                        btnBg: "bg-purple-100",
                        btnText: "text-purple-800",
                        border: "border-purple-100"
                    }
                },
                {
                    title: "Bipolar Disorder",
                    description: "Experiencing extreme mood swings between emotional highs (mania) and lows (depression)?",
                    slug: "bipolar-disorder",
                    icon: <Zap className="w-12 h-12 text-amber-500" />,
                    theme: {
                        bg: "bg-amber-50/50",
                        hoverBg: "hover:bg-amber-50",
                        title: "text-amber-900",
                        btnBg: "bg-amber-100",
                        btnText: "text-amber-800",
                        border: "border-amber-100"
                    }
                },
            ]
        },
        {
            id: "anxiety",
            name: "Anxiety & OCD",
            description: "Overcome excessive worry, fear, and intrusive thoughts.",
            icon: <Sparkles className="w-5 h-5" />,
            concerns: [
                {
                    title: "Anxiety & OCD",
                    description: "Constant worries, racing thoughts, or repetitive behaviors interfering with daily life?",
                    slug: "anxiety",
                    icon: <Brain className="w-12 h-12 text-emerald-500" />,
                    theme: {
                        bg: "bg-emerald-50/50",
                        hoverBg: "hover:bg-emerald-50",
                        title: "text-emerald-900",
                        btnBg: "bg-emerald-100",
                        btnText: "text-emerald-800",
                        border: "border-emerald-100"
                    }
                },
                {
                    title: "Social Anxiety",
                    description: "Do social settings make you anxious and fearful? We can help you cope better.",
                    slug: "social-anxiety",
                    icon: <Users className="w-12 h-12 text-blue-500" />,
                    theme: {
                        bg: "bg-blue-50/50",
                        hoverBg: "hover:bg-blue-50",
                        title: "text-blue-900",
                        btnBg: "bg-blue-100",
                        btnText: "text-blue-800",
                        border: "border-blue-100"
                    }
                },
                {
                    title: "Burnout",
                    description: "Feeling emotionally drained, physically exhausted, or unable to keep up?",
                    slug: "burnout",
                    icon: <LayoutGrid className="w-12 h-12 text-red-500" />,
                    theme: {
                        bg: "bg-red-50/50",
                        hoverBg: "hover:bg-red-50",
                        title: "text-red-900",
                        btnBg: "bg-red-100",
                        btnText: "text-red-800",
                        border: "border-red-100"
                    }
                },
            ]
        },
        {
            id: "habits",
            name: "Addiction & Habits",
            description: "Break free from dependencies and build healthier habits.",
            icon: <Wine className="w-5 h-5" />,
            concerns: [
                {
                    title: "Alcohol Addiction",
                    description: "Is alcohol interfering with your ability to lead a fulfilling life? Find the right support.",
                    slug: "alcohol-addiction",
                    icon: <Wine className="w-12 h-12 text-rose-500" />,
                    theme: {
                        bg: "bg-rose-50/50",
                        hoverBg: "hover:bg-rose-50",
                        title: "text-rose-900",
                        btnBg: "bg-rose-100",
                        btnText: "text-rose-800",
                        border: "border-rose-100"
                    }
                },
                {
                    title: "Tobacco Addiction",
                    description: "Tried quitting tobacco but finding it difficult? It is possible to be tobacco free.",
                    slug: "tobacco-addiction",
                    icon: <Cigarette className="w-12 h-12 text-slate-500" />,
                    theme: {
                        bg: "bg-slate-50/50",
                        hoverBg: "hover:bg-slate-50",
                        title: "text-slate-900",
                        btnBg: "bg-slate-100",
                        btnText: "text-slate-800",
                        border: "border-slate-100"
                    }
                },
            ]
        },
        {
            id: "specialized",
            name: "Specialized Care",
            description: "Targeted support for specific health and life stages.",
            icon: <Flower2 className="w-5 h-5" />,
            concerns: [
                {
                    title: "Women’s Health",
                    description: "Hormonal, sexual or fertility concerns affecting your mental health? We can help.",
                    slug: "womens-health",
                    icon: <Flower2 className="w-12 h-12 text-pink-500" />,
                    theme: {
                        bg: "bg-pink-50/50",
                        hoverBg: "hover:bg-pink-50",
                        title: "text-pink-900",
                        btnBg: "bg-pink-100",
                        btnText: "text-pink-800",
                        border: "border-pink-100"
                    }
                },
            ]
        }
    ];

    const allConcerns = categories.flatMap(c => c.concerns);

    return (
        <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 text-xs font-bold text-orange-600 uppercase tracking-wide mb-4">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Discover Support
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-3">
                            Conditions we support
                        </h2>
                        <p className="text-gray-600 font-medium max-w-2xl">
                            Find specialized care, understanding, and tailored approaches for your mental health journey.
                        </p>
                    </div>
                    <Link href="/conditions" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1a2b3c] px-6 py-2.5 rounded-full font-bold transition-all shadow-sm hover:shadow border border-gray-200 whitespace-nowrap text-sm">
                        <Search className="w-4 h-4 text-orange-500" />
                        View all conditions
                    </Link>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    {allConcerns.map((concern, index) => (
                        <Link
                            key={index}
                            href={`/conditions/${concern.slug}`}
                            className={`snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[350px] group relative ${concern.theme.bg} ${concern.theme.hoverBg} rounded-[2rem] p-6 sm:p-8 transition-all duration-300 border ${concern.theme.border} hover:shadow-lg flex flex-col items-start overflow-hidden`}
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm mb-6">
                                {concern.icon}
                            </div>

                            <div className="flex-1 relative z-10 flex flex-col items-start text-left w-full h-full">
                                <h3 className={`${concern.theme.title} font-bold text-xl sm:text-2xl mb-3 transition-colors`}>
                                    {concern.title}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-8 flex-grow">
                                    {concern.description}
                                </p>
                                <div className={`mt-auto inline-flex items-center px-5 py-2.5 rounded-full ${concern.theme.btnBg} ${concern.theme.btnText} text-sm font-bold transition-transform duration-300 group-hover:-translate-y-0.5`}>
                                    Learn More <ArrowRight className="w-4 h-4 ml-1.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MentalHealthConcerns;
