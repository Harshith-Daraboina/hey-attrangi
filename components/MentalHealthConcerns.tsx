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

type Concern = {
    title: string;
    description: string;
    slug: string;
    icon: React.ReactNode;
};

type Category = {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    concerns: Concern[];
};

const MentalHealthConcerns = () => {
    const [activeCategory, setActiveCategory] = useState<string>("mood");

    const categories: Category[] = [
        {
            id: "mood",
            name: "Mood Disorders",
            description: "Understand and manage your emotional highs and lows with professional support.",
            icon: <Brain className="w-5 h-5" />,
            concerns: [
                {
                    title: "Depression",
                    description: "Does your life feel impossible & hopeless? You don’t have to manage it alone.",
                    slug: "depression",
                    icon: <CloudRain className="w-8 h-8 text-blue-500" />,
                },
                {
                    title: "Bipolar Disorder",
                    description: "Are you struggling with episodes of mania or depression? You can find the care you need.",
                    slug: "bipolar-disorder",
                    icon: <Zap className="w-8 h-8 text-yellow-500" />,
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
                    title: "Anxiety",
                    description: "Chronic worry, mental fatigue, and feeling like your thoughts are always one step ahead?",
                    slug: "anxiety",
                    icon: <Brain className="w-8 h-8 text-purple-500" />,
                },
                {
                    title: "Social Anxiety",
                    description: "Do social settings make you anxious and fearful? We can help you cope better.",
                    slug: "social-anxiety",
                    icon: <Users className="w-8 h-8 text-green-500" />,
                },
                {
                    title: "Obsessive Compulsive Disorder",
                    description: "Are your thoughts out of control & making you feel overwhelmed? Find ways to cope.",
                    slug: "ocd",
                    icon: <LayoutGrid className="w-8 h-8 text-indigo-500" />,
                },
            ]
        },
        {
            id: "neuro",
            name: "Neurodevelopmental",
            description: "Support for unique brain wiring and developmental challenges.",
            icon: <Zap className="w-5 h-5" />,
            concerns: [
                {
                    title: "Adult ADHD",
                    description: "Struggling with focus, restlessness, or impulsivity? There are ways to manage it better.",
                    slug: "adult-adhd",
                    icon: <Zap className="w-8 h-8 text-orange-500" />,
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
                    icon: <Wine className="w-8 h-8 text-red-500" />,
                },
                {
                    title: "Tobacco Addiction",
                    description: "Tried quitting tobacco but finding it difficult? It is possible to be tobacco free.",
                    slug: "tobacco-addiction",
                    icon: <Cigarette className="w-8 h-8 text-gray-500" />,
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
                    icon: <Flower2 className="w-8 h-8 text-pink-500" />,
                },
            ]
        }
    ];

    const activeCategoryData = categories.find(c => c.id === activeCategory) || categories[0];

    return (
        <section className="bg-orange-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#fadcc4]/30 rounded-[2.5rem] p-6 md:p-8 flex flex-col lg:flex-row gap-8 shadow-sm ring-1 ring-orange-100/50 backdrop-blur-sm">

                    {/* Left Sidebar Navigation */}
                    <div className="w-full lg:w-80 flex-shrink-0 bg-white/80 backdrop-blur rounded-3xl p-6 shadow-sm border border-white/50 h-fit">
                        <div className="inline-flex items-center gap-2 bg-orange-100/50 rounded-full px-4 py-1.5 text-xs font-bold text-orange-600 uppercase tracking-wide mb-6">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Discover Support
                        </div>

                        <div className="space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group text-left ${activeCategory === category.id
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-100'
                                            : 'hover:bg-orange-50 text-gray-600 hover:scale-[1.02]'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl transition-colors ${activeCategory === category.id ? 'bg-white/20' : 'bg-orange-50 text-orange-500 group-hover:bg-orange-100'
                                            }`}>
                                            {category.icon}
                                        </div>
                                        <span className="font-bold text-sm md:text-base">{category.name}</span>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeCategory === category.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                        }`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 flex flex-col">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pl-2">
                            <div>
                                <h2 className="text-3xl font-bold text-[#1a2b3c] mb-2">{activeCategoryData.name}</h2>
                                <p className="text-gray-600 font-medium max-w-lg">
                                    {activeCategoryData.description}
                                </p>
                            </div>
                            <Link href="/conditions" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1a2b3c] px-6 py-2.5 rounded-full font-bold transition-all shadow-sm hover:shadow border border-gray-100 whitespace-nowrap text-sm">
                                <Search className="w-4 h-4" />
                                View all conditions
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeCategoryData.concerns.map((concern, index) => (
                                <Link
                                    key={index}
                                    href={`/conditions/${concern.slug}`}
                                    className="group relative bg-white hover:bg-orange-50/50 rounded-3xl p-6 transition-all duration-300 border border-gray-100 hover:border-orange-100 hover:shadow-lg hover:shadow-orange-500/5 flex flex-col md:flex-row gap-6 items-start overflow-hidden"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        {concern.icon}
                                    </div>

                                    <div className="flex-1 relative z-10">
                                        <h3 className="text-[#1a2b3c] font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                                            {concern.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            {concern.description}
                                        </p>
                                        <div className="flex items-center text-orange-500 text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            Learn more <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>

                                    {/* Decorative bento background element */}
                                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tl from-orange-100/20 to-transparent rounded-tl-[100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentalHealthConcerns;
