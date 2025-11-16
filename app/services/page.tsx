"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";


const heroFeatures = [
  {
    title: "Book Sessions Instantly",
    desc: "Schedule therapy sessions with certified professionals at your convenience",
  },
  {
    title: "Track Your Progress",
    desc: "Monitor your mental health journey with interactive tools and insights",
  },
  {
    title: "Access Resources 24/7",
    desc: "Browse articles, worksheets, and self-help guides anytime, anywhere",
  },
];

const reflectionPrompts = [
  "Do I often ignore my own needs to keep others comfortable?",
  "Have I felt emotionally overwhelmed more than once this week?",
  "Do I find it hard to say ‘no’ even when I’m exhausted?",
  "Have I been avoiding a conversation I know I need to have?",
  "Do I judge myself more harshly than I judge others?",
  "Have I celebrated anything I accomplished recently?",
  "Do I feel like I’m living in alignment with my values?",
  "Have I taken time to rest intentionally this week?",
  "Do I feel understood by the people closest to me?",
  "Have I been holding onto something I need to let go of?",
  "Do I struggle to trust my own decisions?",
  "Have I been honest with myself about what I’m feeling?",
  "Do I tend to bottle up emotions instead of expressing them?",
  "Have I taken any step—big or small—toward personal growth lately?",
  "Do I feel disconnected from myself right now?",
];

export default function Services() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = reflectionPrompts.slice(0, 8);
  const totalQuestions = questions.length + 1; // +1 for the end suggestion

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const isEndSuggestion = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex] || '';

  return (
    <div className="min-h-screen bg-orange-50">
      <Navigation currentPath="/services" />

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[500px] sm:min-h-[600px]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Accessible Anywhere
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Your Mental Health Journey in Your {" "}
                <span className="text-orange-600">Pocket</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Experience seamless access to therapy services, resources, and support through our intuitive platform.
                Book sessions, track progress, and access tools – all from your mobile device.
              </p>

              <div className="space-y-4 pt-4">
                {heroFeatures.map((item) => (
                  <div key={item.title} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <button className="bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-orange-700 transition-colors shadow-lg inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative flex justify-center items-center py-4 sm:py-8">
              <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[640px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 shadow-xl mx-auto">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10" />
                <div className="bg-white rounded-[2.5rem] h-full overflow-hidden relative">
                  <Image
                    src="/images/service1.jpg"
                    alt="Attrangi Mental Health Services"
                    width={320}
                    height={640}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 280px, 320px"
                    loading="lazy"
                    quality={45}
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🌈 Thought Provoking Questions
            </p>
            <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              Pause with every question and try to answer it honestly(yes or no).
            </h3>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
             these questions are designed to help you reflect on your thoughts and feelings.
            </p>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            {/* Question Card */}
            <div className="relative bg-gradient-to-br from-white to-orange-50 border border-orange-100 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] p-12 mb-8 min-h-[400px] flex flex-col justify-center">
              {!isEndSuggestion ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm text-orange-600 font-medium italic">Take a deep breath and relax</span>
                  </div>
                  <span className="text-xs tracking-[0.35em] uppercase text-orange-500 font-semibold block mb-3">
                    Prompt {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <p
                    className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {currentQuestion}
                  </p>
                </>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span className="text-sm text-orange-700 font-semibold uppercase tracking-wide">End-of-Stack Reveal Suggestion</span>
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="bg-white/60 rounded-xl p-5 border border-orange-200">
                      <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                        For every <span className="text-orange-600 font-bold">'yes'</span> you answered:
                      </p>
                      <p className="text-base text-gray-700 leading-relaxed italic">
                        Pause and ask: <span className="font-semibold text-gray-900">What is this 'yes' trying to tell me?</span>
                      </p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-5 border border-orange-200">
                      <p className="text-base sm:text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                        For every <span className="text-orange-600 font-bold">'no'</span> you answered:
                      </p>
                      <p className="text-base text-gray-700 leading-relaxed italic">
                        Ask: <span className="font-semibold text-gray-900">What would need to change for this to become a 'yes'?</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentQuestionIndex === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="text-sm text-gray-600 font-medium">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>

              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentQuestionIndex === totalQuestions - 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg'
                }`}
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-base sm:text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards better mental health today. Our team of professionals is here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-orange-50 transition-colors shadow-lg">
              Book a Consultation
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
