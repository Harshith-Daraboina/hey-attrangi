"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Services() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const services = [
    {
      title: "Individual Therapy",
      description: "One-on-one sessions with licensed therapists tailored to your specific needs and goals.",
      icon: "🧠",
      features: ["Cognitive Behavioral Therapy", "Mindfulness-Based Therapy", "Trauma-Informed Care", "Anxiety & Depression Support"]
    },
    {
      title: "Family Therapy",
      description: "Strengthen family bonds and improve communication through guided family sessions.",
      icon: "👨‍👩‍👧‍👦",
      features: ["Family Systems Therapy", "Communication Skills", "Conflict Resolution", "Parenting Support"]
    },
    {
      title: "Group Therapy",
      description: "Connect with others facing similar challenges in a supportive group environment.",
      icon: "👥",
      features: ["Peer Support Groups", "Skill-Building Workshops", "Social Anxiety Groups", "Recovery Support"]
    },
    {
      title: "Online Consultations",
      description: "Access mental health support from the comfort of your home via secure video sessions.",
      icon: "💻",
      features: ["Video Therapy Sessions", "Phone Consultations", "Secure Messaging", "Flexible Scheduling"]
    },
    {
      title: "Assessment & Diagnosis",
      description: "Comprehensive evaluations to understand your mental health needs and create treatment plans.",
      icon: "📋",
      features: ["Psychological Assessments", "ADHD Evaluations", "Learning Disability Testing", "Treatment Planning"]
    },
    {
      title: "Crisis Intervention",
      description: "24/7 support for mental health emergencies and crisis situations.",
      icon: "🚨",
      features: ["Emergency Hotline", "Crisis Counseling", "Safety Planning", "Immediate Support"]
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header Navigation */}
      <header className={`sticky top-0 z-[60] bg-white border-b-2 border-transparent transition-all duration-300 ${isScrolled ? 'shadow-xl border-b-2 border-orange-200' : 'shadow-lg'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-orange-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Attrangi</h1>
                <p className="text-xs text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Mental Healthcare</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-1">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Home
                </Link>
                
                {/* About Us Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center"
                  >
                    About Us
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div 
                      className="absolute top-full left-0 pt-1 w-52 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                        <Link href="/about" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          About Attrangi
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/about#team" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Our Team
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/about#mission" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Our Mission
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/about#contact" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Contact Us
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="text-orange-600 bg-orange-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center"
                  >
                    Services
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'services' && (
                    <div 
                      className="absolute top-full left-0 pt-1 w-52 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                        <Link href="/services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Therapy Services
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Assessment & Diagnosis
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Online Consultations
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Group Sessions
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  href="/blogs" 
                  className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Insights
                </Link>
              </div>
            </nav>
            
            {/* View Products Button */}
            <Link 
              href="/aids" 
              className="hidden md:flex bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Products
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
              Comprehensive mental healthcare services designed to support you at every stage of your wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{service.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>
                    What's Included:
                  </h4>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-orange-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Take the first step towards better mental health. Our team of experienced professionals is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">
              Book a Consultation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-500 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
