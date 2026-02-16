"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import FAQ from "@/components/FAQ";
import HowWeCanHelp from "@/components/HowWeCanHelp";
import ScrollingTextMarqueeComponent from "@/components/ScrollingTextMarquee";
import MentalHealthConcerns from "@/components/MentalHealthConcerns";

interface FeaturedBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  author: string | null;
  likes: number;
  views: number;
  createdAt: string;
  isPlaceholder?: boolean;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

const fallbackInsights: FeaturedBlog[] = [
  {
    id: "placeholder-1",
    title: "Navigating Neurodivergence: First Steps for Families",
    slug: "",
    excerpt: "Practical guidance for parents and caregivers who want to create supportive home environments for neurodivergent loved ones.",
    image: "/images/src12.jpg",
    author: "Hey Attrangi Team",
    likes: 0,
    views: 1200,
    createdAt: "2025-01-01T00:00:00.000Z",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Building Daily Routines That Reduce Overwhelm",
    slug: "",
    excerpt: "Small, science-backed habits that improve focus, emotional regulation, and energy for adults with ADHD and autism.",
    image: "/images/src6-3.jpeg",
    author: "Clinical Psychology Desk",
    likes: 0,
    views: 980,
    createdAt: "2025-01-02T00:00:00.000Z",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    title: "How Therapy & Community Support Work Together",
    slug: "",
    excerpt: "Why combining professional therapy with peer-led spaces accelerates healing for neurodivergent individuals.",
    image: "/images/src6-2.png",
    author: "Hey Attrangi Experts",
    likes: 0,
    views: 860,
    createdAt: "2025-01-03T00:00:00.000Z",
    isPlaceholder: true,
  },
];

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState<FeaturedBlog[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const quotes = [
    "We've just launched our new mental health platform",
    "Supporting neurodivergent individuals with comprehensive care",
    "Evidence-based therapy for better mental health outcomes",
    "Your mental health journey starts with understanding"
  ];

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const quoteInterval = setInterval(() => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        setIsAnimating(true);
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          isAnimatingRef.current = false;
          setIsAnimating(false);
        }, 600);
      }
    }, 4000); // Change quote every 4 seconds
    return () => {
      clearInterval(quoteInterval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (featuredBlogs.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [featuredBlogs]);

  const fetchFeaturedBlogs = async () => {
    try {
      // First try to get featured blogs
      const featuredResponse = await fetch("/api/blogs/featured");
      if (featuredResponse.ok) {
        const featuredData = await featuredResponse.json();
        console.log("Fetched featured blogs:", featuredData);
        if (featuredData.length > 0) {
          setFeaturedBlogs(featuredData);
          return;
        }
      }

      // If no featured blogs, try public blogs
      const publicResponse = await fetch("/api/blogs/public");
      if (publicResponse.ok) {
        const publicData = await publicResponse.json();
        console.log("Fetched public blogs:", publicData);
        if (publicData.length > 0) {
          setFeaturedBlogs(publicData.slice(0, 4));
          return;
        }
      }

      // If still no blogs, try the main blogs route
      const allBlogsResponse = await fetch("/api/blogs");
      if (allBlogsResponse.ok) {
        const allBlogs = await allBlogsResponse.json();
        console.log("Fetched all blogs:", allBlogs);
        if (allBlogs.length > 0) {
          setFeaturedBlogs(allBlogs.slice(0, 4));
          return;
        }
      }

      console.log("No blogs found in any route");
      setFeaturedBlogs([]);

    } catch (error) {
      console.error("Error fetching blogs:", error);
      setFeaturedBlogs([]);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  const nextQuote = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 600);
  };

  const prevQuoteFunc = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 600);
  };

  const insightsToShow = useMemo(() => {
    if (featuredBlogs.length >= 3) {
      return featuredBlogs.slice(0, 3);
    }

    if (featuredBlogs.length === 0) {
      return fallbackInsights;
    }

    const needed = 3 - featuredBlogs.length;
    const additional = fallbackInsights.slice(0, needed);
    return [...featuredBlogs, ...additional];
  }, [featuredBlogs]);

  return (
    <>
      <div className="min-h-screen bg-orange-50">
        {/* Moving Quote Bar */}
        <div className="bg-gray-800 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevQuoteFunc}
              className="flex items-center justify-center w-6 h-6 hover:bg-gray-700 rounded transition-all duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrolling Content */}
            <div className="flex-1 overflow-hidden mx-4 h-6 relative">
              <div
                className={`flex items-center justify-center h-full transition-all duration-500 ease-in-out ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
              >
                <p className="text-sm font-medium tracking-wide whitespace-nowrap">
                  {quotes[currentQuote]}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextQuote}
              className="flex items-center justify-center w-6 h-6 hover:bg-gray-700 rounded transition-all duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Component */}
        <Navigation currentPath="/" />

        {/* Hero Section with Background Image */}
        <div className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] bg-gray-900">
          {/* Background Image */}
          <Image
            src="/images/src6-7.png"
            alt="Modern mental health facility with calming, professional environment"
            fill
            className="object-cover z-0"
          />

          {/* Enhanced Gradient Overlay for better text readability */}
          <div
            className="absolute inset-0 z-5"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%)'
            }}
          ></div>

          {/* Text Overlay with improved positioning and spacing */}
          <div className="absolute inset-0 flex flex-col justify-between z-10">
            {/* Main Content - Centered Vertically */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16">
              <div className="max-w-xl w-full space-y-6 text-left md:-translate-x-64">
                {/* Main Heading with text shadow */}
                <h1
                  className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg"

                >
                  A mental healthcare ecosystem for the way we live, feel, and connect
                </h1>

                {/* Description with better contrast */}
                <p
                  className="text-white text-base md:text-lg leading-relaxed drop-shadow-md opacity-95"

                >
                  We follow the bio-psycho-social model because your body, mind, and
                  environment all shape how you feel. Our care supports every part of your
                  life, not just symptoms.
                </p>

                {/* CTA Button with improved styling */}
                <button
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl"

                >
                  FIND THE RIGHT EXPERT
                </button>
              </div>
            </div>

            {/* Features List - Bottom Center in Line */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pb-8 px-4">
              <div className="flex items-center text-white text-xs md:text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
                <span>For Every Age & Concern</span>
              </div>
              <div className="flex items-center text-white text-xs md:text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
                <span>In-person & Online</span>
              </div>
              <div className="flex items-center text-white text-xs md:text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
                <span>For Individuals, Families and Organisations</span>
              </div>
            </div>
          </div>
        </div>





        <div className="bg-[#fff3e7]">

          {/* Floating Stats Box */}
          <div className="relative -mt-16 mb-20 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-orange-100 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                  {/* Stat 1 */}
                  <div className="p-4">
                    <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                      200+
                    </div>
                    <p className="text-gray-600 text-xs font-medium leading-relaxed">
                      Peers and professionals actively supporting and guiding your mental health journey
                    </p>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-4">
                    <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                      24/7
                    </div>
                    <p className="text-gray-600 text-xs font-medium leading-relaxed">
                      Access to AI-powered support, tools, and resources — even between therapy sessions
                    </p>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-4">
                    <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                      Personalised Care
                    </div>
                    <p className="text-gray-600 text-xs font-medium leading-relaxed">
                      Structured therapy plans designed by licensed psychiatrists and enhanced with guided exercises
                    </p>
                  </div>
                </div>

                {/* Footer text */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <p className="text-gray-500 text-xs md:text-sm">
                    Committed to providing accessible, quality mental healthcare for everyone
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement Section */}
          {/* <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <span className="text-lg">💪</span>
              Our Bold Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" style={{fontFamily: 'Poppins, sans-serif'}}>
              We Won't Take 'OK' as an Answer
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-orange-100">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                  Attrangi started as a small mental health support initiative, aiming to help neurodivergent individuals navigate the challenges of traditional mental health services. It soon became obvious that it would make sense to help our clients see beyond their diagnoses and limitations, and be there with them from the very beginning of their mental health journey.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6 font-medium">
                  Currently, we offer therapy services, mental health resources, and community support in order to help our clients find their path to mental wellness as seamlessly and effectively as possible. We value our clients above everything else, meaning that we won't take 'OK' as an answer when it comes to their mental health and wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}



          {/* Hero Section */}
          <main className="relative pt-20 pb-40 overflow-hidden">
            <ScrollingTextMarqueeComponent />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* WHO IT'S FOR Section - Redesigned with specific images */}
              <div className="mb-20 relative">

                <div className="bg-white rounded-[40px] shadow-sm border border-orange-100 p-8 md:p-16 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-4">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 text-orange-600 text-xs font-semibold mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        Who it's for
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-[#1a2b3c] leading-tight mb-4 tracking-tight">
                        Hey Attrangi supports <br className="hidden md:block" />
                        everyone on their journey
                      </h2>
                    </div>

                    <Link
                      href="/app"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase flex items-center gap-2 group whitespace-nowrap"
                    >
                      get onboarded now
                      <span className="text-2xl leading-none transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>

                  <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12">
                    Get comprehensive mental health support anytime, anywhere — with the Attrangi platform.
                  </p>

                  {/* Divider Line */}
                  <div className="h-px bg-gray-100 w-full mb-16"></div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* For Students */}
                    <div className="flex flex-col group">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                        <Image
                          src="/images/student.png"
                          alt="Student support"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">For Students</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                          Manage academic stress, track emotions, and find peer support circles with personalized tools designed for your educational journey.
                        </p>
                      </div>
                    </div>

                    {/* For Caregivers */}
                    <div className="flex flex-col group">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                        <Image
                          src="/images/caregiver.jpg"
                          alt="Caregiver support"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">For Caregivers</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                          Monitor progress, understand patterns, and support your loved ones with compassion through dedicated tracking and communication tools.
                        </p>
                      </div>
                    </div>

                    {/* For Therapists */}
                    <div className="flex flex-col group">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                        <Image
                          src="/images/therapist.jpg"
                          alt="Therapist support"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">For Therapists</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                          Streamline sessions, access AI summaries, and personalize care effortlessly with professional tools designed for mental health practitioners.
                        </p>
                      </div>
                    </div>

                    {/* For Professionals */}
                    <div className="flex flex-col group">
                      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                        <Image
                          src="/images/founder2.png"
                          alt="Professional support"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">For Professionals</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">
                          De-stress with quick mindfulness sessions and habit trackers for work-life balance, designed for busy working professionals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 lg:h-40 text-white pointer-events-none">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
              >
                <path
                  fill="currentColor"
                  d="M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,170.7C672,192,768,192,864,176C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
            </div>
          </main>
        </div>



        {/* Personalized Care Section */}
        <section className="bg-white py-20 pb-32 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Main Image with Cards */}
              <div className="relative min-h-[500px] flex justify-center items-center overflow-visible">
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <Image
                    src="/images/src4-2.png"
                    alt="Mental healthcare platform interface"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    Real care adapts to your life, your people, your pace.
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-6">
                    Care rooted in your everyday life that feels natural, not clinical.
                  </p>
                </div>

                {/* Simple Feature Points */}
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="font-medium">Support shaped around you</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="font-medium">Supporting those who support you</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="font-medium">Care in your language, and for your context</span>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Find support that fits you
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get personalized suggestions for finding the right therapist or psychiatrist for your needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                      FIND A THERAPIST
                    </button>
                    <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                      FIND A PSYCHIATRIST
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-orange-50 py-16 relative">
          {/* Founder Message Section - Floating Card */}
          <div className="relative -mt-32 mb-20 z-40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-orange-200">
                {/* Grid Layout: Photo Left, Content Right */}
                <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
                  {/* Left Side - Founder Image */}
                  <div className="flex flex-col items-center md:items-start">
                    <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-xl border-4 border-orange-500 mb-4">
                      <Image
                        src="/images/founder2.png"
                        alt="Dr.Sandesh Palhke"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-3">
                        Dr Sandesh Sanjeev Phalke
                      </h2>
                      <p
                        className="text-base md:text-lg text-gray-700 font-medium"

                      >
                        Founder | Researcher
                      </p>

                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="space-y-8">
                    {/* Main Quote */}
                    <div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 italic leading-tight mb-4">
                        "Mental health is not a destination, but a journey of understanding, growth, and self-compassion."
                      </p>
                    </div>

                    {/* Vision Description */}
                    <div className="border-l-4 border-orange-500 pl-6">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        We believe everyone deserves compassionate, evidence-based care that honors their unique journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Blogs Section */}
          {insightsToShow.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1a2b3c] mb-4 font-poppins">Latest Insights</h2>
                  <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                    Discover evidence-based articles, personal stories, and expert guidance
                    from our mental health professionals
                  </p>
                </div>

                {/* Featured Blog Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {insightsToShow.map((blog, index) => {
                    const isPlaceholder = blog.isPlaceholder;
                    const href = blog.slug ? `/blogs/${blog.slug}` : "/blogs";
                    return (
                      <Link key={`${blog.id}-${index}`} href={href} className="group h-full">
                        <article className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-52 w-full overflow-hidden">
                            {blog.image ? (
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full bg-gray-100">
                                <span className="text-4xl">📝</span>
                              </div>
                            )}

                            {/* Tags */}
                            <div className="absolute top-4 left-4 z-10">
                              <span className={`inline-block px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-sm ${isPlaceholder ? 'bg-orange-500' : 'bg-blue-600'
                                }`}>
                                {isPlaceholder ? "Coming Soon" : "Featured"}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-[#1a2b3c] mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                              {blog.title}
                            </h3>

                            {blog.excerpt && (
                              <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
                                {blog.excerpt}
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span>{blog.views || 0}</span>
                                </div>
                                <span>{formatDate(blog.createdAt)}</span>
                              </div>

                              {blog.author && (
                                <span className="text-gray-500">By {blog.author}</span>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                {/* View All Blogs Button */}
                <div className="text-center">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    View All Insights
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        <MentalHealthConcerns />





        <section className="bg-white py-24 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block">Testimonials</span>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-[#1a2b3c] mb-6 tracking-tight leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Trusted by Experts in <br className="hidden md:block" /> Mental Health & Tech
              </h2>
            </div>

            {/* Peer Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Card 1 - Ram Subramanyam */}
              <div className="relative bg-white rounded-[32px] p-8 shadow-[0_2px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)]">
                {/* Decorative Quote */}
                <div className="absolute top-6 right-8 text-9xl leading-none text-orange-50/50 font-serif select-none pointer-events-none group-hover:text-orange-100/50 transition-colors">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-[#1a2b3c] text-lg font-medium leading-relaxed mb-8 flex-grow">
                    “The fusion of AI with mental health expertise at Attrangi is truly innovative. They've built a platform that scales empathy without losing the personal touch.”
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-600 font-bold text-sm shadow-inner">
                      RS
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2b3c] text-sm">Ram Subramanyam</h4>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Tech & Strategy Advisor</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Dr. Abhisheik */}
              <div className="relative bg-white rounded-[32px] p-8 shadow-[0_2px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)]">
                {/* Decorative Quote */}
                <div className="absolute top-6 right-8 text-9xl leading-none text-blue-50/50 font-serif select-none pointer-events-none group-hover:text-blue-100/50 transition-colors">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-[#1a2b3c] text-lg font-medium leading-relaxed mb-8 flex-grow">
                    “Attrangi’s commitment to evidence-based care and neurodiversity is exemplary. It’s a vital resource for anyone seeking comprehensive, modern support.”
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shadow-inner">
                      DA
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2b3c] text-sm">Dr. Abhisheik</h4>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Clinical Psychiatrist</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Dr. Sandesh */}
              <div className="relative bg-white rounded-[32px] p-8 shadow-[0_2px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)]">
                {/* Decorative Quote */}
                <div className="absolute top-6 right-8 text-9xl leading-none text-purple-50/50 font-serif select-none pointer-events-none group-hover:text-purple-100/50 transition-colors">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-[#1a2b3c] text-lg font-medium leading-relaxed mb-8 flex-grow">
                    “Building this ecosystem has been a journey of passion. Our goal is to ensure that technology serves the human spirit, making care accessible to all.”
                  </blockquote>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative shadow-inner">
                      <Image src="/images/founder2.png" alt="Dr. Sandesh" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2b3c] text-sm">Dr. Sandesh</h4>
                      <p className="text-xs text-gray-500 font-medium tracking-wide">Founder & Researcher</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* How We Can Help Section */}
        <HowWeCanHelp />

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}