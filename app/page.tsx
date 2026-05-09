"use client";

import { useEffect, useMemo, useState, useRef, memo } from "react";
import Link from "next/link";
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
  category?: string;
  type?: string;
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
    title: "The Role of Therapy in Managing Personality Disorders",
    slug: "",
    excerpt: "Personality disorders are characterized by persistent unhealthy patterns of thinking, feeling, and behaving. Understand the role of...",
    image: "/images/src12.jpg",
    author: "Hey Attrangi Team",
    likes: 0,
    views: 1200,
    createdAt: "2025-01-01T00:00:00.000Z",
    isPlaceholder: true,
    category: "Personality disorders",
    type: "Article",
  },
  {
    id: "placeholder-2",
    title: "Types of Panic Attacks and How To Cope With Them",
    slug: "",
    excerpt: "Learn about the types of panic attacks, common symptoms, and practical techniques to manage them effectively.",
    image: "/images/src6-3.jpeg",
    author: "Clinical Psychology Desk",
    likes: 0,
    views: 980,
    createdAt: "2025-01-02T00:00:00.000Z",
    isPlaceholder: true,
    category: "",
    type: "Article",
  },
  {
    id: "placeholder-3",
    title: "What To Expect From a Psychiatric Consultation",
    slug: "",
    excerpt: "De-mystifying the process of meeting with a psychiatrist, from diagnostic discussions to treatment planning.",
    image: "/images/src6-5.jpg",
    author: "Hey Attrangi Experts",
    likes: 0,
    views: 860,
    createdAt: "2025-01-03T00:00:00.000Z",
    isPlaceholder: true,
    category: "General well-being",
    type: "Article",
  },
  {
    id: "placeholder-4",
    title: "Are OCD And Anxiety Related?",
    slug: "",
    excerpt: "Understanding the overlap and key differences between OCD and generalized anxiety disorders.",
    image: "",
    author: "Clinical Desk",
    likes: 0,
    views: 1100,
    createdAt: "2025-01-04T00:00:00.000Z",
    isPlaceholder: true,
    category: "Anxiety disorders",
    type: "Video",
  },
  {
    id: "placeholder-5",
    title: "How Do You Relieve Symptoms Of Anxiety?",
    slug: "",
    excerpt: "Evidence-backed self-care techniques, grounding exercises, and professional treatments for anxiety.",
    image: "",
    author: "Clinical Desk",
    likes: 0,
    views: 1400,
    createdAt: "2025-01-05T00:00:00.000Z",
    isPlaceholder: true,
    category: "Anxiety disorders",
    type: "Video",
  }
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

  // Need these definitions for the bento layout
  const getCategories = (blog: any) => {
    if (blog.category) {
      return [blog.category];
    }
    if (blog.tumblineQuestion) {
      return ["Mental Health", "Wellness"];
    }
    return ["Mental Health", "Wellness"];
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Personality disorders":
        return "text-[#4e6b5a] bg-[#ecf4f0]";
      case "General well-being":
        return "text-[#6b654a] bg-[#f5f4ee]";
      case "Anxiety disorders":
        return "text-[#4a646b] bg-[#eef4f5]";
      default:
        return "text-orange-600 bg-orange-50";
    }
  };

  const calculateReadingTime = (content: string) => {
    if (!content) return "5 min read";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const FeaturedArticleCard = memo(({ blog }: { blog: any }) => (
    <Link href={`/blogs/${blog.slug || blog.id}`} className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 h-full flex flex-col">
      <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden bg-gray-50/50 shrink-0 p-4 sm:p-5">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100/50">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${blog.isPlaceholder ? 'bg-orange-100' : 'bg-orange-100/50'}`}>
              <span className="text-gray-400 text-5xl">📝</span>
            </div>
          )}
          {blog.isPlaceholder && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-sm bg-orange-500">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{blog.type || "Article"}</span>
          {blog.category && (
            <>
              <span className="text-gray-300">•</span>
              <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-md tracking-wide uppercase shadow-sm border border-transparent transition-all duration-300 hover:shadow-md get-category-styles-helper get-category-styles-color-badge ${getCategoryStyles(blog.category)}`} style={{ fontStyle: "normal" }}>{blog.category}</span>
            </>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-[#1a2b3c] mb-3 group-hover:text-orange-600 transition-colors leading-[1.25]">
          {blog.title}
        </h3>
        <p className="text-gray-500 text-base line-clamp-2 leading-relaxed">
          {blog.excerpt || "Explore insights and practical strategies to understand and manage mental health concerns effectively..."}
        </p>
      </div>
    </Link>
  ));

  FeaturedArticleCard.displayName = 'FeaturedArticleCard';

  const CompactHorizontalCard = memo(({ blog, showReadingTime = false }: { blog: any, showReadingTime?: boolean }) => (
    <Link href={`/blogs/${blog.slug || blog.id}`} className="group relative flex bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 p-4 sm:p-5 items-center gap-5">
      <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl overflow-hidden bg-gray-50/50 shrink-0 border border-gray-100/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="150px"
          />
        ) : (
          <div className={`absolute inset-0 flex items-center justify-center ${blog.isPlaceholder ? 'bg-orange-100' : ''}`}>
            <span className="text-gray-400 text-3xl">📝</span>
          </div>
        )}
        {blog.isPlaceholder && (
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-block px-2 py-0.5 text-white text-[9px] font-bold rounded-full shadow-sm bg-orange-500">
              Soon
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 py-1">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{blog.type || "Article"}</span>
          {blog.category && (
            <>
              <span className="text-gray-300">•</span>
              <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md tracking-wide uppercase get-category-styles-helper get-category-styles-color-badge ${getCategoryStyles(blog.category)}`}>{blog.category}</span>
            </>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-[#1a2b3c] group-hover:text-orange-600 transition-colors leading-snug line-clamp-3 pb-1">
          {blog.title}
        </h3>
      </div>
    </Link>
  ));

  CompactHorizontalCard.displayName = 'CompactHorizontalCard';

  const TextOnlyCard = memo(({ blog, type = "Video" }: { blog: any; type?: string }) => (
    <Link href={`/blogs/${blog.slug || blog.id}`} className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 py-4 px-6 md:py-5 md:px-8 flex flex-col justify-center shrink-0">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{blog.type || "Video"}</span>
        {blog.category && (
          <>
            <span className="text-gray-300">•</span>
            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md tracking-wide uppercase get-category-styles-helper get-category-styles-color-badge ${getCategoryStyles(blog.category)}`}>{blog.category}</span>
          </>
        )}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-[#1a2b3c] group-hover:text-orange-600 transition-colors leading-snug">
        {blog.title}
      </h3>
    </Link>
  ));

  TextOnlyCard.displayName = 'TextOnlyCard';

  const quotes = [
    "We've just launched our new mental health platform",
    "Supporting individuals with their mental health companion",
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
    if (featuredBlogs.length >= 5) {
      return featuredBlogs.slice(0, 5);
    }

    if (featuredBlogs.length === 0) {
      return fallbackInsights;
    }

    const needed = 5 - featuredBlogs.length;
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

        {/* Hero Section */}
        <div className="relative w-full bg-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Content */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 bg-[#E9ECEF] text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                  Continuous Mental Health Infrastructure
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] leading-[1.12] tracking-tight mb-6">
                  Mental health support
                  <br />
                  shouldn't start in{" "}
                  <span className="text-[#FF6B00]">crisis.</span>
                  <br />
                  It should start with{" "}
                  <span className="text-[#FF6B00]">continuity.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl font-medium mb-6">
                  Attrangi is your continuous mental health infrastructure — designed to help you
                  understand concerns, make safe decisions, find the right care, and
                  take control of your mental health journey.
                </p>

                {/* Feature List */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                    <span className="text-gray-300">✕</span> No guesswork.
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                    <span className="text-gray-300">✕</span> No endless searching.
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
                    <span className="text-gray-300">✕</span> No unnecessary steps.
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-bold text-sm pt-1">
                    <span>✓</span> Just the right support, at the right time.
                  </div>
                </div>

                {/* Call To Actions */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/mind-matrix"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-[#FF6B00] hover:bg-orange-600 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Start Mind Check
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/try-pragya"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Try Pragya
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Tailwind iPhone on the left, Mascot Bot on the right overlapping */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center mt-12 lg:mt-0 select-none">

                {/* Mobile Mockup (iPhone Container) */}
                <div className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/18.5] bg-[#0c111d] rounded-[44px] p-2.5 shadow-2xl border-4 border-[#1f2937] ring-1 ring-gray-900/10 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 z-10 mr-12 sm:mr-16">

                  {/* Screen Inside iPhone */}
                  <div className="relative w-full h-full bg-[#faf9f6] rounded-[36px] p-3.5 flex flex-col overflow-hidden">

                    {/* Dynamic Island Notch */}
                    <div className="w-20 h-5 bg-[#0c111d] rounded-full mx-auto mb-2 flex-shrink-0"></div>

                    {/* Top Custom App Grid Icon */}
                    <div className="grid grid-cols-2 gap-0.5 w-5 h-5 mb-3.5 select-none shrink-0">
                      <div className="bg-red-400 rounded-sm"></div>
                      <div className="bg-orange-400 rounded-sm"></div>
                      <div className="bg-yellow-400 rounded-sm"></div>
                      <div className="bg-orange-300 rounded-sm"></div>
                    </div>

                    {/* Header */}
                    <h3 className="text-sm sm:text-base font-extrabold text-[#111827] leading-[1.2] tracking-tight mb-3.5 select-none shrink-0">
                      How can I help you today?
                    </h3>

                    {/* Interactive Option Cards */}
                    <div className="flex-grow flex flex-col gap-2 overflow-y-auto pr-0.5 mb-3 scrollbar-none select-text">
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <h4 className="text-[11px] font-bold text-[#111827] leading-tight">Just Listen</h4>
                        <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">I'll hear you out and validate your feelings.</p>
                      </div>
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <h4 className="text-[11px] font-bold text-[#111827] leading-tight">Reflect</h4>
                        <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">I'll help you see patterns and clarify thoughts.</p>
                      </div>
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <h4 className="text-[11px] font-bold text-[#111827] leading-tight">Help Me Think</h4>
                        <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">We'll brainstorm or untangle a problem.</p>
                      </div>
                      <div className="bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <h4 className="text-[11px] font-bold text-[#111827] leading-tight">Answer Directly</h4>
                        <p className="text-[9px] text-gray-500 font-medium leading-tight mt-0.5">No fluff, just straight answers.</p>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <button className="w-full bg-[#f6a16c] hover:bg-[#f28a4b] text-[#111827] font-bold text-[11px] py-2.5 rounded-xl transition-all duration-300 shadow-sm shrink-0 flex items-center justify-center">
                      Start Chatting
                    </button>
                  </div>
                </div>

                {/* Robot/Mascot on the Right, Overlapping slightly */}
                <div className="absolute bottom-[-5%] -right-4 sm:-right-8 w-full max-w-[190px] sm:max-w-[220px] z-20 flex items-center justify-center transform hover:scale-[1.03] transition-all duration-300">
                  <Image
                    src="/images/header2.png"
                    alt="Attrangi Bot mascot"
                    width={220}
                    height={293}
                    className="w-full h-auto object-contain select-none"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom full-width features bar with dark borders matching exactly */}
        <div className="w-full bg-white border-t border-b border-gray-200 py-6 select-none relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center lg:justify-between items-center gap-6 md:gap-8">
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
              <svg className="w-5 h-5 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SAFETY-FIRST AI
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
              <svg className="w-5 h-5 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.255.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5-1.253" />
              </svg>
              GUIDED BY CLINICAL EXPERTISE
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
              <svg className="w-5 h-5 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              PRIVACY SAFE
            </div>
          </div>
        </div>

        {/* Ground Reality Section */}
        <div className="relative w-full bg-white pt-20 pb-20 border-b border-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            {/* Header text */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 inline-block">
                GROUND REALITY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] leading-[1.15] tracking-tight">
                When students face mental health challenges, institutions are forced into one of three gaps.
              </h2>
            </div>
            {/* Feature Cards Grid */}
            <div className="relative w-full mb-14 px-4 sm:px-6 lg:px-8">
              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-3 gap-8 max-w-[1200px] mx-auto">
                {/* Card 1: Reactive Counseling */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-10 text-left flex flex-col justify-center min-h-[220px] transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    Reactive Counseling
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-[280px] select-none">
                    Support begins only when students reach crisis points.
                  </p>
                </div>

                {/* Card 2: No Continuity */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-10 text-left flex flex-col justify-center min-h-[220px] transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    No Continuity
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-[280px] select-none">
                    No structured care between therapy sessions.
                  </p>
                </div>

                {/* Card 3: Limited Visibility */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-10 text-left flex flex-col justify-center min-h-[220px] transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    Limited Visibility
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-[280px] select-none">
                    Institutions lack data to act early or strategically.
                  </p>
                </div>
              </div>

              {/* Mobile View with Stacked Layout */}
              <div className="grid grid-cols-1 gap-6 md:hidden max-w-sm mx-auto">
                {/* Card 1: Reactive Counseling */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-8 text-left flex flex-col justify-center min-h-[180px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    Reactive Counseling
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed select-none">
                    Support begins only when students reach crisis points.
                  </p>
                </div>

                {/* Card 2: No Continuity */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-8 text-left flex flex-col justify-center min-h-[180px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    No Continuity
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed select-none">
                    No structured care between therapy sessions.
                  </p>
                </div>

                {/* Card 3: Limited Visibility */}
                <div className="bg-[#eceff1] border border-slate-200/40 rounded-[32px] p-8 text-left flex flex-col justify-center min-h-[180px]">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight select-none">
                    Limited Visibility
                  </h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed select-none">
                    Institutions lack data to act early or strategically.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <div className="flex items-center justify-center gap-2 mb-14 text-center">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-orange-200 text-orange-400 text-sm font-bold bg-orange-50">!</span>
              <p className="text-sm sm:text-base font-bold text-slate-500 tracking-wide">
                None of these lead to sustainable outcomes.
              </p>
            </div>

            {/* Continuous Care Banner Section */}
            <div className="max-w-5xl mx-auto text-center px-4 mb-8">
              <div className="inline-flex items-center justify-center gap-3 bg-[#fff7ed] border border-[#ffedd5] rounded-2xl px-6 py-4 md:px-10 md:py-5 mb-6 max-w-full">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-orange-300 bg-orange-50 text-orange-500 text-xl font-bold">✦</span>
                <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-extrabold text-[#111827] leading-tight select-none">
                  Attrangi replaces fragmented support with <span className="text-[#ff6000]">continuous care.</span>
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                Attrangi works alongside existing counseling systems to provide preventive, scalable, and structured mental health support.
              </p>
            </div>
          </div>
        </div>

        {/* How it works section with wavy/curved top */}
        <div className="relative w-full bg-[#fff5ea] pt-32 pb-36 overflow-hidden">
          {/* Background Waves */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Top Wave (White) */}
            <svg className="absolute top-[-1px] w-full h-[80px] sm:h-[150px] text-white z-10 -scale-x-100" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,60 C400,250 800,-50 1440,120 L1440,0 L0,0 Z"></path>
            </svg>

            {/* Bottom Wave (White) */}
            <svg className="absolute bottom-[-1px] w-full h-[80px] sm:h-[150px] text-white z-10 -scale-x-100" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="currentColor" d="M0,200 C480,350 960,50 1440,200 L1440,320 L0,320 Z"></path>
            </svg>
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#ff6000] mb-12 tracking-tight select-none">
              How it works?
            </h3>

            {/* 4 Steps / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20 max-w-6xl mx-auto px-2">
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white rounded-3xl shadow-sm mb-5 transition-transform duration-300 group-hover:-translate-y-1 flex items-center justify-center overflow-hidden border border-orange-50/50">
                  <Image src="/home/image%20copy.png" alt="Continuous Engagement" fill className="object-cover" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[#ff6000] mb-2 leading-tight">Continuous Engagement</h4>
                <p className="text-gray-800 text-sm md:text-[15px] font-medium leading-snug max-w-[250px]">
                  Students access a 24×7 AI-supported platform.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white rounded-3xl shadow-sm mb-5 transition-transform duration-300 group-hover:-translate-y-1 flex items-center justify-center overflow-hidden border border-orange-50/50">
                  <Image src="/home/image%20copy%203.png" alt="Structured Monitoring" fill className="object-cover" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[#ff6000] mb-2 leading-tight">Structured Monitoring</h4>
                <p className="text-gray-800 text-sm md:text-[15px] font-medium leading-snug max-w-[250px]">
                  Mood patterns, engagement trends, and early distress signals identified
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white rounded-3xl shadow-sm mb-5 transition-transform duration-300 group-hover:-translate-y-1 flex items-center justify-center overflow-hidden border border-orange-50/50">
                  <Image src="/home/image%20copy%204.png" alt="Therapist Access" fill className="object-cover" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[#ff6000] mb-2 leading-tight">Therapist Access</h4>
                <p className="text-gray-800 text-sm md:text-[15px] font-medium leading-snug max-w-[250px]">
                  Students connected to certified therapists across multiple specializations
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white rounded-3xl shadow-sm mb-5 transition-transform duration-300 group-hover:-translate-y-1 flex items-center justify-center overflow-hidden border border-orange-50/50">
                  <Image src="/home/image%20copy%205.png" alt="Institutional Dashboard" fill className="object-cover" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-[#ff6000] mb-2 leading-tight">Institutional Dashboard</h4>
                <p className="text-gray-800 text-sm md:text-[15px] font-medium leading-snug max-w-[250px]">
                  Institutions receive aggregate, privacy-safe insights without exposure to individual data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Care Section */}
        <section className="bg-white py-12 lg:py-16 overflow-hidden relative">
          {/* Far Left Decorative Gray Block */}
          {/* <div className="absolute top-1/2 -left-20 md:-left-10 -translate-y-1/2 w-[20%] sm:w-[15%] lg:w-[12%] h-[100%] bg-[#d9d9d9]/60 rounded-r-[50px] z-0 pointer-events-none hidden md:block"></div> */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Main Image with Background Ellipses */}
              <div className="relative min-h-[400px] flex justify-center lg:justify-start items-center overflow-visible lg:-ml-24 xl:-ml-32">
                <div className="relative w-full max-w-[500px] h-[500px] md:h-[600px] z-20">

                  {/* Background Ellipse 1 (Light Peach) */}
                  <div className="absolute top-[50%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] max-w-[650px] max-h-[650px] z-[-2] pointer-events-none">
                    <Image
                      src="/home/Ellipse.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Background Ellipse 2 (Dark Orange) */}
                  <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] max-w-[550px] max-h-[550px] z-[-1] pointer-events-none">
                    <Image
                      src="/home/Ellipse-2.png"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Foreground Image */}
                  <Image
                    src="/home/image.png"
                    alt="Student using mental healthcare platform"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8 lg:pl-8 relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#ff6000] leading-tight">
                  Continuous care that fits student life &<br />supports the systems around them.
                </h2>

                {/* Points Box */}
                <div className="bg-[#faeedd] rounded-[24px] p-8 md:p-10 shadow-sm border border-orange-50">
                  <ul className="space-y-3 list-disc pl-5 text-gray-800 text-base md:text-[17px] font-medium leading-relaxed marker:text-gray-800">
                    <li className="pl-2">Continuous emotional engagement and early risk detection</li>
                    <li className="pl-2">Structured support between therapy sessions</li>
                    <li className="pl-2">Therapist marketplace with scalable access</li>
                    <li className="pl-2">Guided wellness tasks and adherence tracking</li>
                    <li className="pl-2">Privacy-safe reporting aligned with institutional governance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurable Impact Section */}
        <section className="bg-white pb-24 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-800 mb-3 tracking-tight">
              Built for measurable <span className="text-[#ff6000]">impact</span> across your campus.
            </h2>
            <p className="text-[17px] text-gray-600 max-w-3xl mx-auto mb-14 font-medium">
              Attrangi doesn't just support students, it strengthens how institutions respond to mental health at scale.
            </p>

            {/* Cards Container */}
            <div className="flex flex-col gap-6 items-center">
              {/* Top Row (3 Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Card 1 */}
                <div className="bg-[#faeedd] rounded-[20px] p-8 text-left h-full transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-orange-50/50 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-[16px] leading-tight mb-1">Prevent crises before they escalate</h3>
                  <p className="text-gray-700 text-[15px] leading-snug">Early signals enable timely intervention, not reactive response</p>
                </div>
                {/* Card 2 */}
                <div className="bg-[#faeedd] rounded-[20px] p-8 text-left h-full transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-orange-50/50 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-[16px] leading-tight mb-1">Improve student stability and retention</h3>
                  <p className="text-gray-700 text-[15px] leading-snug">Consistent support leads to better academic and emotional outcomes</p>
                </div>
                {/* Card 3 */}
                <div className="bg-[#faeedd] rounded-[20px] p-8 text-left h-full transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-orange-50/50 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-[16px] leading-tight mb-1">Reduce burden on faculty and staff</h3>
                  <p className="text-gray-700 text-[15px] leading-snug">Structured systems replace informal emotional handling</p>
                </div>
              </div>

              {/* Bottom Row (2 Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Card 4 */}
                <div className="bg-[#faeedd] rounded-[20px] p-8 text-left h-full transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-orange-50/50 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-[16px] leading-tight mb-1">Enable data-informed decision making</h3>
                  <p className="text-gray-700 text-[15px] leading-snug">Privacy-safe insights help institutions act with clarity</p>
                </div>
                {/* Card 5 */}
                <div className="bg-[#faeedd] rounded-[20px] p-8 text-left h-full transition-transform duration-300 hover:-translate-y-1 shadow-sm border border-orange-50/50 flex flex-col justify-center">
                  <h3 className="font-bold text-gray-900 text-[16px] leading-tight mb-1">Strengthen compliance and accountability</h3>
                  <p className="text-gray-700 text-[15px] leading-snug">Aligned with evolving regulatory and accreditation expectations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-orange-50 py-16 relative z-0">

          {/* Featured Blogs Section */}
          {insightsToShow.length > 0 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2b3c] tracking-tight leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                    Your Go-To Student Well-being Library
                  </h2>
                  <div className="relative w-full md:w-80 shrink-0">
                    <input
                      type="text"
                      placeholder="Search resources"
                      className="w-full bg-white text-[#1a2b3c] placeholder-gray-400 pl-4 pr-10 py-3 rounded-xl border border-gray-100 shadow-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm font-medium"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bento Grid Layout (Amaha Style) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                  {/* Left Column */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    {insightsToShow.length > 0 && (
                      <FeaturedArticleCard blog={insightsToShow[0]} />
                    )}
                    {insightsToShow.length > 3 && (
                      <TextOnlyCard blog={insightsToShow[3]} />
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    {insightsToShow.length > 1 && (
                      <CompactHorizontalCard blog={insightsToShow[1]} />
                    )}
                    {insightsToShow.length > 2 && (
                      <CompactHorizontalCard blog={insightsToShow[2]} />
                    )}
                    {insightsToShow.length > 4 && (
                      <TextOnlyCard blog={insightsToShow[4]} />
                    )}
                  </div>
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

          {/* New Hero Image Section Below Insights */}
          <div className="relative w-full h-[50vh] md:h-[60vh] mt-20">
            <Image
              src="/images/src14.png"
              alt="Mental wellbeing professionals"
              fill
              className="object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Centered Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 text-center">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl tracking-tight leading-tight pt-32 pb-60 shadow-sm drop-shadow-md">
                200+ peers verified, one integrated team, all focused on your care
              </h2>
            </div>
          </div>
        </section>


        <MentalHealthConcerns />





        {/* Testimonials Section Commented Out */}
        {false && (
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
                      “Attrangi’s commitment to evidence-based care and modern mental health care is exemplary. It’s a vital resource for anyone seeking comprehensive, modern support.”
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
        )}

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