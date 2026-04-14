"use client";

import Link from "next/link";
import TestCard from "@/components/mind-matrix/TestCard";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  const otherTests = [
    /* {
      id: "adhd",
      title: "ADHD Assessment",
      description: "Assess attention and focus levels to understand potential ADHD tendencies using standard clinical scales.",
      icon: "🧠",
      href: "/mind-matrix/tests/adhd",
      color: "blue"
    },
    {
      id: "personality",
      title: "Personality Test",
      description: "Discover key traits that define your behavior and interactions with the Big Five personality model.",
      icon: "🎭",
      href: "/mind-matrix/tests/personality",
      color: "purple"
    }, */
    {
      id: "depression",
      title: "Depression Screening",
      description: "Evaluate your mood and emotional well-being to identify signs of depression.",
      icon: "🌧️",
      href: "/mind-matrix/tests/depression",
      color: "teal"
    },
    {
      id: "anxiety",
      title: "Anxiety Test",
      description: "Evaluate anxiety levels and gain insights into your stress management and emotional resilience.",
      icon: "😰",
      href: "/mind-matrix/tests/anxiety",
      color: "pink"
    },
    /* {
      id: "autism",
      title: "Autism Spectrum",
      description: "Screen for traits associated with the Autism Spectrum to better understand your social processing.",
      icon: "🧩",
      href: "/mind-matrix/tests/autism",
      color: "green"
    } */
  ];

  return (
    <>
      <Navigation currentPath="/mind-matrix" />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left Content */}
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                  Mind Matrix
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-600 mt-3 tracking-normal">
                    Take a Mind Check
                  </span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  A calm, private pause to notice how you feel mentally today. Not a test, ranking, or diagnosis. Use it to reflect over time, without comparing yourself to anyone else.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/mind-matrix/check-in"
                    className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 text-lg"
                  >
                    Start Mind Check →
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
                      <span className="text-slate-900 font-bold">200+</span> people have taken a Mind Check
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: calm visual (no charts, curves, or peer comparisons) */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] opacity-60 hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 540 260" className="w-full h-auto drop-shadow-sm">
                    {/* Grid Lines */}
                    <line x1="135" y1="50" x2="135" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="202.5" y1="50" x2="202.5" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="270" y1="20" x2="270" y2="210" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="337.5" y1="50" x2="337.5" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="405" y1="50" x2="405" y2="210" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Baseline */}
                    <line x1="50" y1="210" x2="490" y2="210" stroke="#94A3B8" strokeWidth="2" />

                    {/* Curve */}
                    <path d="M50 210 C 150 210, 180 40, 270 40 C 360 40, 390 210, 490 210" fill="none" stroke="#3B82F6" strokeWidth="3" />

                    {/* Percentages */}
                    <text x="80" y="190" fontSize="14" fill="#475569" fontWeight="bold">0.1%</text>
                    <text x="145" y="170" fontSize="14" fill="#475569" fontWeight="bold">2.1%</text>
                    <text x="210" y="110" fontSize="14" fill="#475569" fontWeight="bold">13.6%</text>
                    <text x="270" y="32" fontSize="16" fill="#1E293B" fontWeight="bold" textAnchor="middle">34.1%</text>
                    <text x="330" y="110" fontSize="14" fill="#475569" fontWeight="bold">13.6%</text>
                    <text x="390" y="170" fontSize="14" fill="#475569" fontWeight="bold">2.1%</text>
                    <text x="450" y="190" fontSize="14" fill="#475569" fontWeight="bold">0.1%</text>

                    {/* Values */}
                    <text x="135" y="235" fontSize="14" fill="#64748B" textAnchor="middle">70</text>
                    <text x="202.5" y="235" fontSize="14" fill="#64748B" textAnchor="middle">85</text>
                    <text x="270" y="235" fontSize="16" fill="#1E293B" fontWeight="bold" textAnchor="middle">100</text>
                    <text x="337.5" y="235" fontSize="14" fill="#64748B" textAnchor="middle">115</text>
                    <text x="405" y="235" fontSize="14" fill="#64748B" textAnchor="middle">130</text>
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
