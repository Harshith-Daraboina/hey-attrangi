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
                        <Link href="/resources" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Resources
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

      {/* Hero Section - Two Column Layout (50vh) */}
      <section className="relative overflow-hidden h-[50vh]">
        <div className="flex h-full">
          {/* Left Section - Book Appointments */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center px-8 lg:px-12 relative">
            <div className="max-w-lg text-white">
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
                Your Mental Health, Our Expertise. Trusted Therapists at Your Fingertips.
              </h1>
              
              <p className="text-base lg:text-lg mb-8 leading-relaxed opacity-95" style={{fontFamily: 'Poppins, sans-serif'}}>
                Whether in person or online, Attrangi connects you with certified, compassionate mental health professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-white hover:text-orange-600 transition-colors flex items-center justify-center gap-2">
                  See How It Works
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Section - Video Call Interface */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center relative p-8 lg:p-12">
            {/* Video Call Window */}
            <div className="relative w-full max-w-lg">
              {/* Doctor Profiles Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Dr. Smith Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    {/* Photo Placeholder */}
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center shadow-md overflow-hidden">
                      <span className="text-7xl">👨‍⚕️</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Dr. Smith</h3>
                    <p className="text-sm text-gray-600">Psychologist</p>
                  </div>
                </div>
                
                {/* Dr. Johnson Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    {/* Photo Placeholder */}
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center shadow-md overflow-hidden">
                      <span className="text-7xl">👩‍⚕️</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>Dr. Johnson</h3>
                    <p className="text-sm text-gray-600">Therapist</p>
                  </div>
                </div>
              </div>
              
              {/* Video Call Controls */}
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-6">
                <div className="flex justify-center gap-4 mb-4">
                  {/* Video Button */}
                  <button className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110">
                    <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                    </svg>
                  </button>
                  
                  {/* Call Button */}
                  <button className="w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110">
                    <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </button>
                  
                  {/* Microphone Button */}
                  <button className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-50 transition-all hover:scale-110">
                    <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  </button>
                </div>
                
                <p className="text-center text-white text-sm font-medium">Connect with Professional Therapists</p>
              </div>
            </div>
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

      {/* Educational Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Poppins, sans-serif'}}>
              Mental Health Education & Awareness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding mental health is the first step towards wellness. Learn about common conditions, self-care tips, and ways to support others.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Understanding Mental Health */}
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg p-8 border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Understanding Mental Health
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also determines how we handle stress, relate to others, and make choices.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Mental health is important at every stage of life, from childhood and adolescence through adulthood.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Over the course of your life, if you experience mental health problems, your thinking, mood, and behavior could be affected.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600">Many factors contribute to mental health problems, including biological factors, life experiences, and family history.</p>
                </div>
              </div>
            </div>

            {/* Common Conditions */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Common Mental Health Conditions
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Anxiety Disorders</h4>
                  <p className="text-sm text-gray-600">Excessive worry, fear, or nervousness that interferes with daily activities.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Depression</h4>
                  <p className="text-sm text-gray-600">Persistent feelings of sadness, hopelessness, and loss of interest in activities.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">PTSD</h4>
                  <p className="text-sm text-gray-600">Post-traumatic stress disorder from experiencing or witnessing traumatic events.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">OCD</h4>
                  <p className="text-sm text-gray-600">Obsessive-compulsive disorder characterized by recurring thoughts and repetitive behaviors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mental Health Tips */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-8 mb-12 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                Tips for Better Mental Health
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">🏃‍♀️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Stay Active</h4>
                <p className="text-sm text-gray-600">Regular physical activity can help reduce anxiety and improve mood. Aim for at least 30 minutes of exercise most days.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">🧘‍♂️</div>
                <h4 className="font-semibold text-gray-900 mb-2">Practice Mindfulness</h4>
                <p className="text-sm text-gray-600">Meditation, deep breathing, and yoga can help reduce stress and increase awareness of the present moment.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">😴</div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Quality Sleep</h4>
                <p className="text-sm text-gray-600">Aim for 7-9 hours of sleep per night. Good sleep hygiene supports mental and physical health.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                <h4 className="font-semibold text-gray-900 mb-2">Connect with Others</h4>
                <p className="text-sm text-gray-600">Build and maintain strong relationships. Social connections are vital for mental well-being.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">🍎</div>
                <h4 className="font-semibold text-gray-900 mb-2">Eat Well</h4>
                <p className="text-sm text-gray-600">A balanced diet with plenty of fruits, vegetables, and whole grains supports brain health.</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-green-100">
                <div className="text-3xl mb-3">🙏</div>
                <h4 className="font-semibold text-gray-900 mb-2">Seek Help When Needed</h4>
                <p className="text-sm text-gray-600">Don't hesitate to reach out to mental health professionals. Asking for help is a sign of strength.</p>
              </div>
            </div>
          </div>

          {/* Warning Signs */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Poppins, sans-serif'}}>
                Warning Signs to Watch For
              </h3>
            </div>
            <p className="text-gray-700 mb-6">
              If you or someone you know experiences any of the following for more than two weeks, consider seeking professional help:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Persistent sad, anxious, or "empty" mood</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Loss of interest in activities once enjoyed</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Significant changes in appetite or weight</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Difficulty sleeping or oversleeping</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Decreased energy or fatigue</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Feelings of worthlessness or excessive guilt</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Difficulty thinking, concentrating, or making decisions</p>
              </div>
              <div className="flex items-start space-x-3 bg-white rounded-lg p-4 border border-purple-100">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Thoughts of death or suicide</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-sm text-red-800 font-semibold">
                <strong>Emergency Help:</strong> If you or someone you know is in crisis, please call emergency services or contact a crisis hotline immediately.
              </p>
            </div>
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

