"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Use a dynamic import for useSearchParams to avoid hydration mismatch if needed,
// but since this is a Next.js app router component, we can use it safely in client mode.
// We must wrap the component in a Suspense boundary when using useSearchParams in 'use client'
// But for simplicity, we'll just handle it directly.

type LegalSection = 'terms' | 'refund' | 'therapist' | 'privacy';

function LegalPageContent() {
    const searchParams = useSearchParams();
    const sectionParam = searchParams.get('section') as LegalSection | null;
    const [activeSection, setActiveSection] = useState<LegalSection>('terms');

    useEffect(() => {
        if (sectionParam && ['terms', 'refund', 'therapist', 'privacy'].includes(sectionParam)) {
            setActiveSection(sectionParam);
        }
    }, [sectionParam]);

    const renderContent = () => {
        switch (activeSection) {
            case 'terms':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn space-y-6">
                        <div className="mb-10 text-center md:text-left">
                            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">Legal Document</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a2b3c] tracking-tight">USER CONSENT, PRIVACY & PLATFORM POLICY</h1>
                        </div>

                        <p className="font-bold text-[#1a2b3c] text-xl border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50">
                            AATRANGI PRIVATE LIMITED
                        </p>

                        <p className="leading-relaxed">
                            This document outlines the user consent, privacy acknowledgment, and platform usage terms governing access to the Hey AATRANGI platform ("Platform"), operated by AATRANGI Technologies Private Limited ("AATRANGI", "Company", "We", "Us", or "Our").
                        </p>
                        <p className="leading-relaxed font-semibold">
                            By accessing or using the Platform, you acknowledge and agree to the terms set forth below.
                        </p>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">1</span>
                                Telemedicine and Digital Support Consent
                            </h2>
                            <div className="space-y-4">
                                <p>By accessing or using the Platform, I provide informed consent to receive mental-health support and related services through digital, online, and telemedicine-enabled modalities.</p>
                                <p>I understand that services offered may include remote consultations, emotional support, well-being assessments, supportive communication, AI-assisted responses, and, where applicable, human-facilitated interventions provided by qualified professionals.</p>
                                <p>I acknowledge that telemedicine services involve the delivery of care without physical presence and may be subject to limitations, including technical disruptions, network interruptions, or incomplete information.</p>
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 my-6">
                                    <p className="font-semibold text-orange-900 m-0">
                                        I understand that the Platform is not intended to replace emergency medical services or in-person clinical care where required. In situations involving imminent danger, severe distress, or medical emergency, I agree to contact appropriate local emergency services immediately.
                                    </p>
                                </div>
                                <p>My participation is voluntary, and I may discontinue use of the Platform at any time. Discontinuation of services does not automatically entitle me to a refund and shall be subject to the applicable Refund Policy.</p>
                                <p>Nothing in this section limits any rights available under applicable law.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">2</span>
                                Privacy Acknowledgement
                            </h2>
                            <div className="space-y-4">
                                <p>I confirm that I have reviewed and understood the Privacy Policy of AATRANGI and consent to the collection, processing, storage, and protection of my personal information as described therein.</p>
                                <p>My information may be used for:</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 bg-gray-50 p-6 rounded-2xl">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Delivery of services</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Platform functionality</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>User safety monitoring</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Internal quality assessments</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Regulatory compliance</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Service improvement</li>
                                </ul>
                                <p>AATRANGI implements reasonable administrative, technical, and organizational safeguards to protect personal data.</p>
                                <p>Personal information will not be sold, rented, or disclosed for commercial marketing purposes. Disclosure may occur where required by law, regulatory authority, or where necessary to address immediate safety concerns.</p>
                                <p>Nothing in this section limits statutory rights under applicable data protection laws.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">3</span>
                                Data Processing and Sharing
                            </h2>
                            <div className="space-y-4">
                                <p>By continuing to use the Platform, I understand that my information may be processed for:</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-gray-50 p-6 rounded-2xl">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Platform optimization</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Service improvement</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Statistical analysis</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Anonymized research insights</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>AI system refinement</li>
                                </ul>
                                <p>Where feasible, data used for analytics or system improvement will be anonymized or pseudonymized.</p>
                                <p>AATRANGI may engage trusted service providers, including cloud infrastructure providers, payment processors, analytics partners, and technical vendors, strictly for operational purposes. Such processing shall be governed by contractual safeguards and applicable law.</p>
                                <p>In the event of corporate restructuring, merger, acquisition, or reorganization, user data may be transferred in accordance with applicable law and subject to appropriate confidentiality protections.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">4</span>
                                Platform Terms and User Responsibilities
                            </h2>
                            <div className="space-y-4">
                                <p>By using the Platform, I agree to:</p>
                                <ul className="space-y-3 mb-6 bg-gray-50 p-6 rounded-2xl">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                                        <span>Use services ethically and in good faith</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div>
                                        <span>Refrain from transmitting unlawful, abusive, harmful, or fraudulent content</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div>
                                        <span>Avoid actions that compromise platform integrity or security</span>
                                    </li>
                                </ul>
                                <p>I understand that guidance provided through the Platform, whether AI-assisted or human-delivered, is intended for supportive and informational purposes. It does not constitute medical diagnosis, psychiatric prescription, or emergency intervention unless explicitly stated.</p>
                                <p>AATRANGI shall not be responsible for emergency situations beyond its reasonable operational control. Nothing in this clause excludes liability that cannot be limited under applicable law.</p>
                                <p>Misuse of the Platform may result in suspension or termination in accordance with applicable policies.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">5</span>
                                Declaration of Accuracy
                            </h2>
                            <div className="space-y-4">
                                <p>I declare that all personal information and responses submitted by me are truthful and accurate to the best of my knowledge.</p>
                                <p>I understand that the relevance and appropriateness of services may depend on the accuracy of the information provided.</p>
                                <p>Providing misleading or false information may affect service quality or eligibility for certain features.</p>
                                <p>Nothing in this declaration limits any statutory rights under applicable law.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'refund':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn space-y-6">
                        <div className="mb-10 text-center md:text-left">
                            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">Legal Document</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a2b3c] tracking-tight">REFUND POLICY</h1>
                        </div>

                        <p className="font-bold text-[#1a2b3c] text-xl border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50">
                            AATRANGI PRIVATE LIMITED
                        </p>

                        <p className="leading-relaxed">
                            This Refund Policy governs payments made for services provided through the AATRANGI platform.
                        </p>
                        <p className="leading-relaxed font-semibold">
                            By booking or purchasing services, you agree to this policy.
                        </p>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">1</span>
                                Nature of Services
                            </h2>
                            <div className="space-y-4">
                                <p>AATRANGI provides access to licensed therapists and digital mental-health support services.</p>
                                <p>Therapy sessions are professional, time-based services. Once a session has been conducted, the service is considered rendered.</p>
                                <p>Therapeutic outcomes vary individually and cannot be guaranteed.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">2</span>
                                General Refund Framework
                            </h2>
                            <div className="space-y-4">
                                <p>Refunds are evaluated based on:</p>
                                <ul className="space-y-3 mb-6 bg-gray-50 p-6 rounded-2xl">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Whether the service was delivered as scheduled</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Whether a failure occurred on the part of the Platform</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Applicable consumer protection laws</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>Fair allocation of professional time</li>
                                </ul>
                                <p>Refund approval does not constitute admission of fault, liability, or deficiency in service.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">3</span>
                                Non-Refundable Circumstances
                            </h2>
                            <div className="space-y-4">
                                <p>Refunds will generally not be granted where:</p>
                                <ul className="space-y-3 mb-6 bg-red-50/50 p-6 rounded-2xl">
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div><span>A session has been completed</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div><span>The user fails to attend without prior cancellation</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div><span>Dissatisfaction relates solely to subjective experience or outcome</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div><span>Cancellation occurs less than 24 hours before the scheduled session</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">✗</div><span>Technical issues arise from user-controlled systems</span></li>
                                </ul>
                                <p>This does not limit statutory rights under applicable law.</p>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 flex items-center border-b pb-4">
                                <span className="bg-orange-100 text-orange-600 rounded-lg w-8 h-8 flex items-center justify-center mr-3 text-lg">4</span>
                                Refund-Eligible Circumstances
                            </h2>
                            <div className="space-y-4">
                                <p>Refunds may be granted where:</p>
                                <ul className="space-y-3 mb-6 bg-green-50/50 p-6 rounded-2xl">
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div><span>A verified platform malfunction prevents meaningful session delivery</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div><span>Duplicate or erroneous billing occurs</span></li>
                                    <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">✓</div><span>A therapist cancels and rescheduling is not feasible</span></li>
                                </ul>
                                <p>In such cases, users may choose rescheduling or a refund for the affected session.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div>
                                <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">5. Accessibility Considerations</h2>
                                <p className="mb-4">AATRANGI recognizes that certain users may experience genuine accessibility-related barriers that affect session attendance.</p>
                                <p>Where reasonable circumstances directly prevented participation, AATRANGI may, at its discretion: offer a one-time reschedule; or provide a partial or full refund.</p>
                                <p className="text-sm text-gray-500 italic">This provision is evaluated individually and does not create automatic entitlement.</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">6. Subscription Services</h2>
                                <p className="mb-4">Subscription fees, where applicable, are billed in advance. Refunds for partially used billing cycles are generally not provided.</p>
                                <p>Users may cancel renewal prior to the next billing date. This does not limit statutory rights.</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-orange-50 rounded-2xl p-8 border border-orange-100">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-6 border-b border-orange-200 pb-4">Refund Procedure & Processing</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">7. Refund Procedure</h3>
                                    <p>Refund requests must be submitted within 7 days of the transaction to: <a href="mailto:contact@heyattrangi.com" className="text-orange-600 font-medium hover:underline">contact@heyattrangi.com</a></p>
                                    <p className="mt-2 text-sm">Requests must include identifying details and transaction reference information.</p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">8. Processing</h3>
                                    <p>Approved refunds will be processed through the original payment method. Processing timelines depend on financial institutions and payment providers.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">9. Abuse Prevention & 10. Statutory Rights</h2>
                            <p className="mb-4">AATRANGI reserves the right to deny refund requests involving fraud, repeated misuse, or deceptive claims. Repeated abuse may result in account suspension.</p>
                            <p>Nothing in this Refund Policy excludes or limits rights available under the Consumer Protection Act, 2019 or any other applicable law.</p>
                        </div>
                    </div>
                );
            case 'therapist':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn space-y-6">
                        <div className="mb-10 text-center md:text-left">
                            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">Legal Document</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a2b3c] tracking-tight">THERAPIST TERMS AND CONDITIONS</h1>
                        </div>

                        <p className="font-bold text-[#1a2b3c] text-xl border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50">
                            Welcome to AATRANGI PRIVATE LIMITED ("Aatrangi", "Company", "We", "Us", or "Our").
                        </p>

                        <p className="leading-relaxed">
                            This Therapist Terms and Conditions document ("Agreement") governs your onboarding, access to, and use of aatrangi's digital platform, including MediBot, therapist dashboard, scheduling systems, communication tools, and related services (collectively, the "Platform").
                        </p>
                        <p className="leading-relaxed font-semibold">
                            Please read this Agreement carefully before registering or providing services through the Platform. By accessing, registering with, or using the Platform, you agree to be bound by this Agreement.
                        </p>
                        <p className="text-sm text-gray-500">
                            If you are accepting this Agreement on behalf of a professional entity or clinic, you represent that you are authorized to bind such entity. aatrangi reserves the right to accept or reject any therapist applicant at its sole discretion.
                        </p>

                        <div className="space-y-12 mt-12">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">1. Scope of Engagement</h2>
                                <p>This Agreement applies solely to your participation as a licensed therapist on the Platform.</p>
                                <p>The Platform enables licensed mental health professionals to connect with patients, conduct virtual sessions, maintain session documentation, access clinical workflow tools, and manage professional services digitally.</p>
                                <p>Features, specifications, and functionalities of the Platform may be modified, enhanced, or discontinued at any time for operational, technical, regulatory, or business reasons. Where changes materially affect service delivery, reasonable notice will be provided.</p>
                                <p>As a condition of participation, you agree to comply with this Agreement and all applicable laws, professional standards, and regulatory requirements governing mental health practice in your jurisdiction.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">2. Eligibility and Professional Requirements</h2>
                                <p>To onboard as a Therapist, you represent and warrant that:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>You hold a valid, active, and legally recognized license or certification to practice in your jurisdiction.</li>
                                    <li>You are in good standing with the relevant regulatory authority.</li>
                                    <li>You maintain appropriate professional indemnity or malpractice insurance.</li>
                                    <li>All credentials, qualifications, and information provided to aatrangi are accurate, complete, and not misleading.</li>
                                </ul>
                                <p>You agree to promptly update any changes to your licensing status, disciplinary history, or professional eligibility. aatrangi reserves the right to verify credentials and may suspend or terminate access if information is found to be inaccurate or unverifiable.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-2xl">
                                <div>
                                    <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">3. Nature of Relationship</h2>
                                    <ul className="list-disc pl-6 space-y-2 mb-4">
                                        <li>You are engaged as an independent contractor.</li>
                                        <li>Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship.</li>
                                        <li>You retain full discretion and control over clinical decisions and therapeutic methods.</li>
                                    </ul>
                                    <p className="text-sm">You are solely responsible for all taxes, statutory obligations, and professional compliance obligations arising from your practice.</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">4. Clinical Responsibility</h2>
                                    <p>You retain sole and exclusive responsibility for clinical assessment, diagnosis, treatment planning, implementation, risk assessment, crisis management, and compliance with professional ethical standards.</p>
                                    <p className="text-sm mt-4">aatrangi does not provide medical or psychological treatment and does not interfere with clinical judgment. You acknowledge that patient outcomes are solely attributable to your professional decisions and conduct.</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">5. Account Registration and Platform Use</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="font-bold text-green-700 mb-3">You agree to:</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Provide accurate information during registration.</li>
                                            <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Maintain confidentiality of login credentials.</li>
                                            <li className="flex items-start gap-2"><span className="text-green-500">✓</span>Notify aatrangi immediately of unauthorized access.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                                        <h3 className="font-bold text-red-700 mb-3">You shall not:</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Share account credentials or allow unauthorized access.</li>
                                            <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Use the Platform for unlawful or unethical purposes.</li>
                                            <li className="flex items-start gap-2"><span className="text-red-500">✗</span>Circumvent the Platform to solicit patients offline.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">6. Professional Conduct</h2>
                                <p>You agree to uphold the highest standards of professional integrity. You shall not engage in discriminatory, abusive, harassing, or unethical conduct. You shall not practice outside the scope of your licensure, misrepresent qualifications, violate patient confidentiality, or engage in fraudulent billing.</p>
                                <p>aatrangi reserves the right to investigate complaints and take appropriate action, including suspension or termination.</p>
                            </div>

                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">7. Fees & Payment | 8. Data Protection</h2>
                                <p className="mb-4">Compensation structure, including revenue sharing and payment cycles, shall be governed by a separate commercial agreement. aatrangi may deduct applicable platform fees, processing charges, and taxes before disbursement.</p>
                                <p>You agree to maintain strict confidentiality of patient information. You shall not disclose patient data without authorization, download/transfer patient data outside approved systems, or use data for personal purposes.</p>
                                <p className="text-sm italic">Patient clinical data remains the property of the patient. aatrangi may use anonymized and aggregated data for operational enhancements.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">9. Platform Tools & 10. Intellectual Property</h2>
                                <p>Tools are provided to support workflow efficiency and do not replace professional judgment. All intellectual property rights in the Platform remain the exclusive property of aatrangi or its licensors. You are granted a limited license to use the Platform solely for providing services under this Agreement.</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">11. Disclaimer & 12. Indemnification</h2>
                                <p>The Platform is provided on an "as is" basis. aatrangi disclaims implied warranties and shall not be liable for indirect damages or clinical outcomes. You agree to indemnify aatrangi from any claims arising from professional negligence, breach of confidentiality, violation of laws, or breach of this Agreement.</p>
                            </div>

                            <div className="border-t pt-8">
                                <h2 className="text-xl font-bold text-[#1a2b3c] mb-4">13 - 16. Applicable Law, Jurisdiction, & Contact</h2>
                                <p>This Agreement is governed by the laws of India. You may terminate participation by written notice. aatrangi may suspend access for material breaches or license revocation.</p>
                                <p className="mt-4 font-bold">AATRANGI Private Limited</p>
                                <p>+91 9552324069 | Email: <a href="mailto:contact@heyattrangi.com" className="text-orange-600 hover:text-orange-700">contact@heyattrangi.com</a></p>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn space-y-6">
                        <div className="mb-10 text-center md:text-left">
                            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-3 block">Legal Document</span>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a2b3c] tracking-tight">Privacy Policy</h1>
                        </div>
                        <p className="mb-6 text-xl">
                            At <strong>Hey Attrangi</strong>, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information.
                        </p>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Information We Collect</h2>
                            <p className="mb-4">
                                We collect information you provide directly to us, such as when you create an account, purchase a service, or contact support. This may include your name, email address, payment information, and assessment responses.
                            </p>
                        </div>

                        <div className="mt-12 bg-gray-50 p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-3">
                                <li>To provide and maintain our services.</li>
                                <li>To process your transactions and manage your account.</li>
                                <li>To communicate with you about updates, offers, and support.</li>
                                <li>To improve our website and user experience.</li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Data Security</h2>
                                <p className="mb-4">
                                    We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Sharing of Information</h2>
                                <p className="mb-4">
                                    We do not sell or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 border-t pt-8">
                            <h2 className="text-2xl font-bold text-[#1a2b3c] mb-4">Your Rights</h2>
                            <p className="mb-4">
                                You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <a href="mailto:contact@heyattrangi.com" className="text-orange-600 font-medium hover:underline">contact@heyattrangi.com</a>.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-1/4">
                        <nav className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-32">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 px-4">Legal Directory</h3>
                            <div className="flex flex-col space-y-2">
                                <Link href="/" className="block px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium text-left">
                                    Home
                                </Link>
                                <button
                                    onClick={() => setActiveSection('terms')}
                                    className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left w-full border border-transparent ${activeSection === 'terms'
                                        ? 'bg-orange-50 text-orange-600 font-bold border-orange-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                                        : 'text-gray-600 hover:bg-orange-50/50 hover:text-orange-600'
                                        }`}
                                >
                                    Terms & Conditions
                                </button>
                                <button
                                    onClick={() => setActiveSection('refund')}
                                    className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left w-full border border-transparent ${activeSection === 'refund'
                                        ? 'bg-orange-50 text-orange-600 font-bold border-orange-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                                        : 'text-gray-600 hover:bg-orange-50/50 hover:text-orange-600'
                                        }`}
                                >
                                    Refund Policy
                                </button>
                                <button
                                    onClick={() => setActiveSection('therapist')}
                                    className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left w-full border border-transparent ${activeSection === 'therapist'
                                        ? 'bg-orange-50 text-orange-600 font-bold border-orange-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                                        : 'text-gray-600 hover:bg-orange-50/50 hover:text-orange-600'
                                        }`}
                                >
                                    Therapist Terms
                                </button>
                                <button
                                    onClick={() => setActiveSection('privacy')}
                                    className={`block px-4 py-3 rounded-xl transition-all duration-300 font-medium text-left w-full border border-transparent ${activeSection === 'privacy'
                                        ? 'bg-orange-50 text-orange-600 font-bold border-orange-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]'
                                        : 'text-gray-600 hover:bg-orange-50/50 hover:text-orange-600'
                                        }`}
                                >
                                    Privacy Policy
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-[32px] shadow-sm shadow-orange-500/5 border border-gray-100 p-8 md:p-12 lg:p-16 min-h-[600px] overflow-hidden">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LegalPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-gray-50 pt-32 flex justify-center items-start"><p className="text-xl text-gray-500 font-medium">Loading Legal Document...</p></div>}>
            <Navigation />
            <LegalPageContent />
            <Footer />
        </React.Suspense>
    );
}
