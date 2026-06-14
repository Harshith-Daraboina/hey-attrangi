"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const faqs = [
    {
        question: "What if I'm not satisfied with the support?",
        answer: <>We're committed to your mental wellness journey. If you feel your current specialist isn't the right fit, or if you're experiencing technical issues, please contact our support team. See our <Link href="/terms?section=refund" className="underline font-medium hover:text-orange-600 transition-colors">Refund Policy</Link> for more details.</>
    },
    {
        question: "How do I book a session with a therapist?",
        answer: "Booking is simple through our platform. You can browse our network of licensed professionals, view their availability, and schedule a session that fits your calendar. It all stays in your Hey Attrangi account."
    },
    {
        question: "How long does a Mind Check take?",
        answer: "In Mind Matrix, each Mind Check takes about three minutes. A quiet space helps you settle in without rushing."
    },
    {
        question: "Can I take a Mind Check more than once?",
        answer: "Yes. You can start another Mind Check in Mind Matrix whenever it feels helpful. If you’re noticing patterns over time, spacing visits by a few weeks can make shifts easier to see. That’s a personal rhythm, not a requirement."
    },
    {
        question: "Can I access Hey Attrangi on multiple devices?",
        answer: "Absolutely. Hey Attrangi is a web-based platform accessible from any modern browser on your computer, tablet, or smartphone. Your progress and session notes are securely synced across all your devices."
    },
    {
        question: "Is my mental health data private and secure?",
        answer: "Your privacy is our highest priority. Personal information, session notes, and anything you share in a check-in are protected with strong encryption. We never sell your individual data or share it without your clear consent."
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
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#fdfaf6] border border-orange-100/50 rounded-[32px] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 h-64 bg-orange-50 opacity-50 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-48 h-48 bg-orange-50 opacity-50 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10 md:w-[55%] text-center md:text-left mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b3c] mb-4 tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                                Join Our Community!
                            </h2>
                            <p className="text-[17px] text-[#1a2b3c]/70 max-w-md font-medium leading-relaxed mx-auto md:mx-0">
                                Connect with us on social media for daily mental health insights, supportive conversations, and resources to help you thrive.
                            </p>
                        </div>
                        
                        <div className="relative z-10 flex gap-4 md:w-[45%] justify-center md:justify-end">
                            {/* Social Buttons */}
                            <a href="https://www.instagram.com/hey_attrangi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white text-[#1a2b3c] hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm9.75 1.5a1 1 0 11-.002 2 1 1 0 01.002-2zM12 7a5 5 0 015 5 5 5 0 11-5-5zm0 2a3 3 0 100 6 3 3 0 000-6z" /></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/heyattrangi/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-14 h-14 bg-white text-[#1a2b3c] hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM7.119 20.452H3.56V9h3.559v11.452zM5.34 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM20.452 20.452h-3.558v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.047c.476-.902 1.636-1.852 3.369-1.852 3.603 0 4.271 2.37 4.271 5.456v6.287z" /></svg>
                            </a>
                            <a href="#" className="flex items-center justify-center w-14 h-14 bg-white text-[#1a2b3c] hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-300 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                            </a>
                        </div>
                    </div>
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
