"use client";

import Link from "next/link";
import TestCard from "@/components/iq-test/TestCard";
import Footer from "@/components/Footer";

import Navigation from "@/components/Navigation";

export default function Home() {
  const otherTests = [
    {
      id: "adhd",
      title: "ADHD Assessment",
      description: "Assess attention and focus levels to understand potential ADHD tendencies using standard clinical scales.",
      icon: "🧠",
      href: "/test-your-iq/tests/adhd",
      color: "blue"
    },
    {
      id: "personality",
      title: "Personality Test",
      description: "Discover key traits that define your behavior and interactions with the Big Five personality model.",
      icon: "🎭",
      href: "/test-your-iq/tests/personality",
      color: "purple"
    },
    {
      id: "depression",
      title: "Depression Screening",
      description: "Evaluate your mood and emotional well-being to identify signs of depression.",
      icon: "🌧️",
      href: "/test-your-iq/tests/depression",
      color: "teal"
    },
    {
      id: "anxiety",
      title: "Anxiety Test",
      description: "Evaluate anxiety levels and gain insights into your stress management and emotional resilience.",
      icon: "😰",
      href: "/test-your-iq/tests/anxiety",
      color: "pink"
    },
    {
      id: "autism",
      title: "Autism Spectrum",
      description: "Screen for traits associated with the Autism Spectrum to better understand your social processing.",
      icon: "🧩",
      href: "/test-your-iq/tests/autism",
      color: "green"
    }
  ];

  return (
    <>
      <Navigation currentPath="/test-your-iq" />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  Want to Know Your <br />
                  <span className="text-slate-900">Real MindMetric Score?</span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Take our MindMetric Test and unlock your path to self-discovery and development.
                  Scientifically designed to measure your cognitive potential.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/test-your-iq/tests/iq"
                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 text-lg"
                  >
                    Start MindMetric Test Now →
                  </Link>
                  <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors text-lg">
                    How It Works
                  </button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                        U{i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <p className="text-sm text-slate-500 font-medium">
                      <span className="text-slate-900 font-bold">200+</span> peers tested this out
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content - Graph Visualization */}
              <div className="relative">
                {/* Simple CSS/SVG Bell Curve Representation */}
                <div className="bg-white p-2">
                  <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-sm">
                    {/* Grid Lines */}
                    <line x1="50" y1="180" x2="350" y2="180" stroke="#e2e8f0" strokeWidth="2" />
                    <line x1="200" y1="20" x2="200" y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="200" y="195" textAnchor="middle" className="text-xs fill-slate-500 font-bold">100</text>

                    <line x1="140" y1="80" x2="140" y2="180" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="140" y="195" textAnchor="middle" className="text-xs fill-slate-400">85</text>

                    <line x1="260" y1="80" x2="260" y2="180" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="260" y="195" textAnchor="middle" className="text-xs fill-slate-400">115</text>

                    {/* Bell Curve Path */}
                    <path
                      d="M50 180 C 100 180, 140 150, 200 20 C 260 150, 300 180, 350 180"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                    {/* Area under curve */}
                    <path
                      d="M50 180 C 100 180, 140 150, 200 20 C 260 150, 300 180, 350 180 L 350 180 L 50 180 Z"
                      fill="url(#gradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Labels */}
                    <text x="200" y="15" textAnchor="middle" className="text-xs fill-slate-500 font-bold">34.1%</text>
                    <text x="140" y="100" textAnchor="middle" className="text-xs fill-slate-400">13.6%</text>
                    <text x="260" y="100" textAnchor="middle" className="text-xs fill-slate-400">13.6%</text>
                    <text x="55" y="170" textAnchor="middle" className="text-xs fill-slate-400 font-bold">0.1%</text>
                    <text x="345" y="170" textAnchor="middle" className="text-xs fill-slate-400 font-bold">0.1%</text>
                  </svg>
                </div>
              </div>

            </div>

            {/* Logos Strip */}
            {/* Logos Strip with Marquee Effect */}
            <div className="mt-16 pt-8 border-t border-slate-100 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

              <div className="flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap py-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 mx-8">
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">IIIT Dharwad</span>
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">Dharwad Institute Of Mental Health And Neurosciences</span>
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">IIT Guwahati</span>
                    </div>
                  ))}
                </div>
                <div className="flex animate-marquee whitespace-nowrap py-4" aria-hidden="true">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 mx-8">
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">IIIT Dharwad</span>
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">Dharwad Institute Of Mental Health And Neurosciences</span>
                      <span className="text-xl font-bold font-sans text-slate-400 opacity-70">IIT Guwahati</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Tests Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-slate-500 uppercase border border-slate-300 rounded-full">
                We are different
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Learn more <br />
                about yourself
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {otherTests.map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  description={test.description}
                  icon={test.icon}
                  href={test.href}
                  color={test.color}
                />
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
