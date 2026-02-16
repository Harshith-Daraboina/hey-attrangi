"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

type LegalSection = 'refund' | 'terms' | 'privacy';

export default function LegalPage() {
    const [activeSection, setActiveSection] = useState<LegalSection>('refund');

    const renderContent = () => {
        switch (activeSection) {
            case 'refund':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-8 font-poppins">Refund Policy</h1>
                        <p className="mb-6">
                            At <strong>Hey Attrangi</strong>, we strive to provide a seamless and valuable experience to all our users. Please review our refund policy carefully before making a purchase.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Digital Products</h2>
                        <p className="mb-6">
                            Due to the nature of digital products and services, all sales are final. Refunds are not provided once an IQ test or assessment has been purchased and accessed, as the service is considered fully rendered at the time of purchase.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Exceptions</h2>
                        <p className="mb-4">Refunds may be considered under the following circumstances:</p>
                        <ul className="list-disc pl-6 space-y-3 mb-6">
                            <li>
                                <strong>Technical Issues:</strong> If you are unable to access the test due to a technical issue on our platform, and the issue cannot be resolved within a reasonable time.
                            </li>
                            <li>
                                <strong>Duplicate Payment:</strong> If you have been charged multiple times for the same test, we will issue a refund for the duplicate transaction(s).
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Refund Request Process</h2>
                        <p className="mb-4">
                            To request a refund, please contact our support team at <a href="mailto:support@attrangi.com" className="text-orange-600 font-medium hover:underline">support@attrangi.com</a> with the following details:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 mb-6">
                            <li>Proof of purchase (e.g., receipt or transaction ID).</li>
                            <li>A detailed description of the issue.</li>
                        </ul>
                        <p className="mb-6">
                            Our team will review your request and respond within 3–5 business days.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Non-Refundable Circumstances</h2>
                        <ul className="list-disc pl-6 space-y-3 mb-6">
                            <li>Dissatisfaction with the test results.</li>
                            <li>Failure to complete the test after purchase.</li>
                            <li>Misunderstanding of the product description or features.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Contact Us</h2>
                        <p className="mb-6">
                            If you have any questions or concerns about this policy, feel free to reach out to us at <a href="mailto:support@attrangi.com" className="text-orange-600 font-medium hover:underline">support@attrangi.com</a>.
                        </p>
                    </div>
                );
            case 'terms':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-8 font-poppins">Terms & Conditions</h1>
                        <p className="mb-6">
                            Welcome to <strong>Hey Attrangi</strong>. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">1. Use of Services</h2>
                        <p className="mb-4">
                            Our services are intended for personal, non-commercial use. You agree to use our platform only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of our services.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">2. Medical Disclaimer</h2>
                        <p className="mb-4">
                            Hey Attrangi provides psychological resources and cognitive assessments for informational and educational purposes only. Our content and assessments are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions regarding a medical condition.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">3. User Accounts</h2>
                        <p className="mb-4">
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized use.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">4. Intellectual Property</h2>
                        <p className="mb-4">
                            All content on this website, including text, graphics, logos, and software, is the property of Hey Attrangi or its content suppliers and is protected by copyright laws.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">5. Limitation of Liability</h2>
                        <p className="mb-4">
                            Hey Attrangi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of our services.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">6. Changes to Terms</h2>
                        <p className="mb-4">
                            We reserve the right to modify these terms at any time. Your continued use of the site after changes are posted constitutes your acceptance of the new terms.
                        </p>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="prose prose-lg max-w-none text-gray-600 animate-fadeIn">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1a2b3c] mb-8 font-poppins">Privacy Policy</h1>
                        <p className="mb-6">
                            At <strong>Hey Attrangi</strong>, your privacy is our priority. This Privacy Policy outlines how we collect, use, and protect your personal information.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Information We Collect</h2>
                        <p className="mb-4">
                            We collect information you provide directly to us, such as when you create an account, purchase a service, or contact support. This may include your name, email address, payment information, and assessment responses.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-3 mb-6">
                            <li>To provide and maintain our services.</li>
                            <li>To process your transactions and manage your account.</li>
                            <li>To communicate with you about updates, offers, and support.</li>
                            <li>To improve our website and user experience.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Data Security</h2>
                        <p className="mb-4">
                            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet is 100% secure.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Sharing of Information</h2>
                        <p className="mb-4">
                            We do not sell or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
                        </p>

                        <h2 className="text-2xl font-bold text-[#1a2b3c] mt-10 mb-4">Your Rights</h2>
                        <p className="mb-4">
                            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <a href="mailto:support@attrangi.com" className="text-orange-600 font-medium hover:underline">support@attrangi.com</a>.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gray-50 pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-1/4">
                            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 px-4">Legal & Support</h3>
                                <div className="flex flex-col space-y-2">
                                    <Link href="/" className="block px-4 py-2.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors font-medium text-left">
                                        Home
                                    </Link>
                                    <button
                                        onClick={() => setActiveSection('terms')}
                                        className={`block px-4 py-2.5 rounded-xl transition-colors font-medium text-left w-full ${activeSection === 'terms'
                                                ? 'bg-orange-50 text-orange-600 font-bold'
                                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        Terms & Conditions
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('privacy')}
                                        className={`block px-4 py-2.5 rounded-xl transition-colors font-medium text-left w-full ${activeSection === 'privacy'
                                                ? 'bg-orange-50 text-orange-600 font-bold'
                                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        Privacy Policy
                                    </button>
                                    <button
                                        onClick={() => setActiveSection('refund')}
                                        className={`block px-4 py-2.5 rounded-xl transition-colors font-medium text-left w-full ${activeSection === 'refund'
                                                ? 'bg-orange-50 text-orange-600 font-bold'
                                                : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        Refund Policy
                                    </button>
                                </div>
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[600px]">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
