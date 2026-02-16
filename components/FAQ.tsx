"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const faqs = [
    {
        question: "What if I'm not satisfied with the support?",
        answer: <>We're committed to your mental wellness journey. If you feel your current specialist isn't the right fit, or if you're experiencing technical issues, please contact our support team. See our <Link href="/refund-policy" className="underline font-medium hover:text-orange-600 transition-colors">Refund Policy</Link> for more details.</>
    },
    {
        question: "How do I book a session with a therapist?",
        answer: "Booking is simple through our platform. You can browse our network of licensed professionals, view their availability, and schedule a session that fits your calendar—all within your Hey Attrangi account."
    },
    {
        question: "How long does the MindMetric assessment take?",
        answer: "Our comprehensive cognitive assessment typically takes between 25 to 40 minutes. We recommend taking it in a quiet environment where you can focus without interruptions."
    },
    {
        question: "Can I retake the cognitive assessments?",
        answer: "Yes, you can retake assessments to track your progress over time. We generally recommend waiting at least 30 days between retakes to ensure the most accurate reflection of your cognitive profile."
    },
    {
        question: "Can I access Hey Attrangi on multiple devices?",
        answer: "Absolutely. Hey Attrangi is a web-based platform accessible from any modern browser on your computer, tablet, or smartphone. Your progress and session notes are securely synced across all your devices."
    },
    {
        question: "Is my mental health data private and secure?",
        answer: "Your privacy is our highest priority. All personal information, session notes, and assessment results are protected with enterprise-grade encryption. We never share your individual data with third parties without your explicit consent."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white">
            {/* Community Section */}
            <div className="bg-[#f8f9fb] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#3d4750] mb-4">
                        Community
                    </h2>
                    <p className="text-lg text-[#3d4750] max-w-2xl font-medium">
                        Join our community on social media for daily mental health insights, supportive conversations, and resources to help you thrive.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Left side: Heading */}
                        <div className="lg:w-1/3">
                            <h2
                                className="text-5xl font-bold text-orange-500 leading-tight"

                            >
                                Frequently<br />
                                Asked<br />
                                Questions
                            </h2>
                        </div>

                        {/* Right side: Questions */}
                        <div className="lg:w-2/3 border-t border-gray-100">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-100">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full py-6 flex items-center justify-between text-left group"
                                    >
                                        <span
                                            className={`text-lg font-medium transition-colors duration-200 ${openIndex === index ? 'text-orange-500' : 'text-gray-900 group-hover:text-orange-500'
                                                }`}

                                        >
                                            {faq.question}
                                        </span>
                                        <span className="ml-6 flex-shrink-0">
                                            <svg
                                                className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-orange-500' : 'text-gray-400'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="text-gray-600 leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
