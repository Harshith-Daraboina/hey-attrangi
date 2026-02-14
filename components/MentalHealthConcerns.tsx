"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import VariableProximity from './VariableProximity';

const MentalHealthConcerns = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10); // buffer of 10px
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons(); // Initial check
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', checkScrollButtons);
            }
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Approximate card width
            const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };
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

    return (
        <div className="relative">


            <div className="absolute top-0 left-0 w-full -mt-12 md:-mt-24 pointer-events-none text-[#FFF7ED]">
                <svg
                    className="w-full h-24 md:h-48"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="1"
                        d="M0,320L0,160C480,0,960,0,1440,160L1440,320Z"
                    ></path>
                </svg>
            </div>

            <div className="bg-[#FFF7ED] py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* HayatEngi Vision Card - Floating over wave */}
                    <div className="relative -mt-32 md:-mt-48 mb-24 z-20">

                        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-orange-100">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                        Our Vision
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        Beyond Traditional Care
                                    </h3>
                                    <div className="prose prose-orange text-gray-600 text-sm leading-relaxed space-y-3">
                                        <p>
                                            "We are building a web-based mental health platform designed to go beyond what traditional mental health applications offer.
                                            You may have already seen many mental health platforms in the market today. What makes Hey Attrangi unique is our integrated and personalized approach.
                                        </p>
                                        <p>
                                            Our platform enables one-on-one sessions with professional therapists, combined with an AI-powered assistant that works alongside them. The therapist doesn’t just treat you—they also monitor and mentor your treatment journey continuously.
                                        </p>
                                        <p>
                                            We focus on accurate diagnosis of mental health conditions, while simultaneously providing specialized, personalized care plans and resources tailored exclusively to each individual.
                                            Our goal is to ensure that every user receives holistic, consistent, and personalized mental healthcare, all in one place.
                                        </p>
                                        <div className="pt-4 border-t border-gray-100 mt-4">
                                            <p className="font-medium text-gray-900 mb-2">
                                                We invite you to be a part of this journey.
                                            </p>
                                            <a
                                                href="https://heyattrangi.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors"
                                            >
                                                Is now live at heyattrangi.com
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Element or Small Image if needed - kept simple for now */}
                                <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-orange-200 to-transparent"></div>

                                <div className="flex-shrink-0 text-center md:text-left md:w-1/3">
                                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                                        <p className="text-gray-800 font-medium italic mb-4">
                                            "Holistic, consistent, and personalized mental healthcare, all in one place."
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            —  Hey Attrangi Team
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mb-16" ref={containerRef}>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            <VariableProximity
                                label="We’re here for whatever you’re going through"
                                className="cursor-pointer"
                                fromFontVariationSettings="'wght' 700"
                                toFontVariationSettings="'wght' 900"
                                containerRef={containerRef}
                                radius={100}
                                falloff="linear"
                            />
                        </h2>
                        <div className="max-w-3xl mx-auto text-gray-700 space-y-2">
                            <p className="text-lg">
                                <VariableProximity
                                    label="Hey Attrangi offers specialized support for a wide range of mental health needs."
                                    className="cursor-pointer"
                                    fromFontVariationSettings="'wght' 400"
                                    toFontVariationSettings="'wght' 700"
                                    containerRef={containerRef}
                                    radius={80}
                                    falloff="linear"
                                />
                            </p>
                            <p>
                                <VariableProximity
                                    label="You don't have to figure it out alone. Explore common concerns we help with below."
                                    className="cursor-pointer"
                                    fromFontVariationSettings="'wght' 400"
                                    toFontVariationSettings="'wght' 700"
                                    containerRef={containerRef}
                                    radius={80}
                                    falloff="linear"
                                />
                            </p>
                        </div>
                    </div>

                    <div className="relative group/slider">
                        {/* Scroll Buttons - Visible only on mobile/tablet when scrollable */}
                        {showLeftScroll && (
                            <button
                                onClick={() => scroll('left')}
                                className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white/90 backdrop-blur shadow-lg border border-orange-100 rounded-full p-2 text-orange-600 hover:bg-orange-50 transition-all"
                                aria-label="Scroll left"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {showRightScroll && (
                            <button
                                onClick={() => scroll('right')}
                                className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white/90 backdrop-blur shadow-lg border border-orange-100 rounded-full p-2 text-orange-600 hover:bg-orange-50 transition-all"
                                aria-label="Scroll right"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}

                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto pb-6 gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        >
                            {concerns.map((concern, index) => (
                                <Link
                                    key={index}
                                    href={`/conditions/${concern.slug}`}
                                    className="group block bg-white rounded-2xl p-6 min-h-[350px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col justify-between min-w-[85vw] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center"
                                >
                                    <div>
                                        <div className="mb-6 bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                                            {concern.icon}
                                        </div>

                                        <h3 className="text-2xl font-semibold text-orange-600 mb-2 group-hover:text-orange-700 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            {concern.title}
                                        </h3>

                                        <p className="text-gray-600 text-base leading-relaxed">
                                            {concern.description}
                                        </p>
                                    </div>

                                    {/* Arrow moved to left as per design */}
                                    <div className="mt-4">
                                        <span className="text-orange-500 text-3xl group-hover:translate-x-2 transition-transform duration-300 inline-block">
                                            →
                                        </span>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentalHealthConcerns;
