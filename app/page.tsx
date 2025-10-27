"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

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
}

export default function Home() {
  const [featuredBlogs, setFeaturedBlogs] = useState<FeaturedBlog[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const quoteInterval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setTimeout(() => setIsAnimating(false), 600);
      }
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(quoteInterval);
  }, [isAnimating]);

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
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevQuoteFunc = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

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
            
            {/* Navigation - Centered */}
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

                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center"
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

                {/* Resources Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('resources')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center"
                  >
                    Resources
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'resources' && (
                    <div 
                      className="absolute top-full left-0 pt-1 w-52 z-50"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                        <Link href="/resources" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          All Resources
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/resources#self-help" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Self-Help Guides
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/resources#tools" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Mental Health Tools
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="/resources#worksheets" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Worksheets & Activities
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>
            
            {/* Special View Products Button */}
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

          {/* Quote Content */}
          <div className="flex items-center flex-1 justify-center mx-4 overflow-hidden relative h-8">
            <p 
              key={currentQuote}
              className={`text-xs font-medium text-center absolute w-full ${isAnimating ? 'animate-train-slide' : ''}`}
            >
              "{quotes[currentQuote]}"
            </p>
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

      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[80vh] bg-gray-900">
  {/* Background Image */}
  <Image
    src="/images/src3.jpg"
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
    <div className="flex-1 flex flex-col justify-center px-8 md:px-16">
      <div className="max-w-xl space-y-4">
        {/* Main Heading with text shadow */}
        <h1
          className="text-white text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          A mental healthcare ecosystem for the way we live, feel, and connect
        </h1>
        
        {/* Description with better contrast */}
        <p
          className="text-white text-base md:text-lg leading-relaxed drop-shadow-md opacity-95"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          We follow the bio-psycho-social model because your body, mind, and
          environment all shape how you feel. Our care supports every part of your
          life, not just symptoms.
        </p>

        {/* CTA Button with improved styling */}
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          FIND THE RIGHT EXPERT
        </button>
      </div>
    </div>

    {/* Features List - Bottom Center in Line */}
    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pb-8 px-4">
      <div className="flex items-center text-white text-xs md:text-sm">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>For Every Age & Concern</span>
      </div>
      <div className="flex items-center text-white text-xs md:text-sm">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>In-person & Online</span>
      </div>
      <div className="flex items-center text-white text-xs md:text-sm">
        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 flex-shrink-0"></div>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>For Individuals, Families and Organisations</span>
      </div>
    </div>
  </div>
</div>





      {/* Floating Statistics Box */}
      <div className="relative -mt-16 mb-20 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-orange-100">
            <div className="flex flex-col md:flex-row md:divide-x md:divide-gray-200 gap-8 md:gap-0">
              {/* Stat 1 */}
              <div className="text-center flex-1 md:px-6">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>500+</div>
                <p className="text-gray-600 text-sm leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Mental health professionals ready to support your journey to wellness
                </p>
              </div>
              
              {/* Stat 2 */}
              <div className="text-center flex-1 md:px-6">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>24/7</div>
                <p className="text-gray-600 text-sm leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Access to resources and support whenever you need it most
                </p>
              </div>
              
              {/* Stat 3 */}
              <div className="text-center flex-1 md:px-6">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-3" style={{fontFamily: 'Poppins, sans-serif'}}>10,000+</div>
                <p className="text-gray-600 text-sm leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Lives positively impacted through our comprehensive care programs
                </p>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500" style={{fontFamily: 'Poppins, sans-serif'}}>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* WHO IT'S FOR Section */}
        <div className="mb-20">
          {/* Centered Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              Hey Attrangi supports everyone on their journey
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Get comprehensive mental health support anytime, anywhere — with the Attrangi platform.
            </p>
          </div>

          {/* Content Grid - Features and Video Side by Side */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content - Feature List */}
            <div className="space-y-6">
              {/* For Students */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                    For Students
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Manage academic stress, track emotions, and find peer support circles with personalized tools designed for your educational journey.
                  </p>
                </div>
              </div>

              {/* For Caregivers */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                    For Caregivers
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Monitor progress, understand patterns, and support your loved ones with compassion through dedicated tracking and communication tools.
                  </p>
                </div>
              </div>

              {/* For Therapists */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                    For Therapists
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Streamline sessions, access AI summaries, and personalize care effortlessly with professional tools designed for mental health practitioners.
                  </p>
                </div>
              </div>

              {/* For Professionals */}
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                    For Professionals
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    De-stress with quick mindfulness sessions and habit trackers for work-life balance, designed for busy working professionals.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Content - Video */}
            <div className="relative flex justify-center items-center h-[400px]">
              {/* --- Image Blob Behind the Video --- */}
              <div className="absolute inset-0 flex justify-center items-center z-10">
                <Image
                  src="/images/assets2.png"
                  alt="Background blob"
                  width={900}
                  height={800}
                  className="object-contain opacity-85 translate-x-50 translate-y-12"
                />
              </div>
              
              {/* --- Video Card --- */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden w-[500px] h-[300px] border border-gray-200 relative z-20">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  style={{
                    filter: 'sepia(0.3) saturate(1.2) hue-rotate(15deg) brightness(0.9)'
                  }}
                >
                  <source src="/videos/vid2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              
              </div>
            </div>

          </div>
        </div>



      </main>

      {/* Personalized Care Section */}
      <section className="bg-white py-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Main Image with Cards */}
            <div className="relative min-h-[700px] flex justify-center items-center">
              {/* Main Image - src4.png */}
              <div className="relative w-[500px] h-[600px]">
                <Image
                  src="/images/src4.png"
                  alt="Mental healthcare platform interface"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Notification Cards positioned around the image */}
              {/* GLAD Journal Card - Top Left */}
              <div className="absolute -top-8 -left-16 bg-white rounded-xl shadow-xl p-4 w-64 border border-gray-100 z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-sm">📓</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">GLAD Journal</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">Assignment due: Tomorrow</p>
                <p className="text-xs text-gray-500 mb-3">Complete by: Oct 15, 2024</p>
                <button className="w-full bg-green-500 text-white text-xs py-2 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  OPEN
                </button>
              </div>

              {/* Therapy Session Card - Top Right */}
              <div className="absolute top-8 -right-16 bg-white rounded-xl shadow-xl p-4 w-64 border border-gray-100 z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📹</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">Therapy Session</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">Dr Pratistha Trivedi Mirza</p>
                <p className="text-xs text-gray-500 mb-1">14 Oct 2024, 10:00 AM</p>
                <p className="text-xs text-gray-500 mb-3">60 min • JOIN button appears 5 min before</p>
                <button className="w-full bg-blue-500 text-white text-xs py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  JOIN
                </button>
              </div>

              {/* Chat Message Card - Middle Left */}
              <div className="absolute top-64 -left-20 bg-white rounded-xl shadow-xl p-3 w-56 border border-gray-100 z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <span className="text-xs text-gray-500">10:14 AM</span>
                </div>
                <p className="text-xs text-gray-700">"Hi Gauri! Could you remind me the name of the journal you had recommended?"</p>
              </div>

              {/* Prescription Card - Bottom Left */}
              <div className="absolute -bottom-8 -left-12 bg-white rounded-xl shadow-xl p-4 w-64 border border-gray-100 z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">📋</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">Prescription</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1">Dr. Divya G Nallur</p>
                <p className="text-xs text-gray-500 mb-3">25 Apr 2024, 06:30 PM</p>
                <button className="w-full bg-purple-500 text-white text-xs py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                  VIEW
                </button>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
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

      {/* Services Section */}
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
                      alt="Dr. Attrangi Founder"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-xl md:text-2xl font-bold text-orange-600 mb-1" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Dr. Attrangi Founder
                    </div>
                    <div className="text-sm md:text-base text-gray-700 font-medium" style={{fontFamily: 'Poppins, sans-serif'}}>
                      Clinical Psychologist & Mental Health Advocate
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Content */}
                <div className="space-y-8">
                  {/* Main Quote */}
                  <div>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 italic leading-tight mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                      "Mental health is not a destination, but a journey of understanding, growth, and self-compassion."
                    </p>
                  </div>
                  
                  {/* Vision Description */}
                  <div className="border-l-4 border-orange-500 pl-6">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{fontFamily: 'Poppins, sans-serif'}}>
                      We believe everyone deserves compassionate, evidence-based care that honors their unique journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>Latest Insights</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={{fontFamily: 'Poppins, sans-serif'}}>
                  Discover evidence-based articles, personal stories, and expert guidance 
                  from our mental health professionals
                </p>
              </div>
              
              {/* Featured Blog Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {featuredBlogs.slice(0, 3).map((blog, index) => (
                  <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                    <article className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 h-full">
                      {/* Image */}
                      <div className="relative h-40 bg-gradient-to-br from-blue-100 to-purple-100">
                        {blog.image ? (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xl">📝</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                          {blog.title}
                        </h3>
                        {blog.excerpt && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{fontFamily: 'Poppins, sans-serif'}}>
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>{blog.views}</span>
                          </div>
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                        {blog.author && (
                          <div className="mt-2 text-xs text-gray-600 font-medium" style={{fontFamily: 'Poppins, sans-serif'}}>
                            By {blog.author}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* View All Blogs Button */}
              <div className="text-center">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-base hover:bg-orange-600 transition-colors shadow-lg"
                  style={{fontFamily: 'Poppins, sans-serif'}}
                >
                  View All Insights
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Neurodiversity Education Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="text-lg">🎯</span>
                Educational Content
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
                What Is Neurodiversity & Neurodivergence?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Someone who is <strong>neurodivergent</strong> means their brain works in a way that diverges from what is considered "typical." 
                  Examples include people diagnosed (or self-identifying) with autism, ADHD, dyslexia, dyspraxia, Tourette's, and others.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                  <p className="text-gray-700 italic">
                    <strong>Important Note:</strong> Neurodiversity and neurodivergence are not clinical diagnoses themselves — 
                    they're concepts used by communities, advocates, and scholars to shift how we talk about brain, learning, and behavioural differences.
                  </p>
            </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Neurodiversity</h3>
                    <p className="text-gray-600">
                      The natural variation in human brain function and behavioral traits. It recognizes that neurological differences 
                      are normal variations of the human genome.
                    </p>
              </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Neurodivergence</h3>
                    <p className="text-gray-600">
                      Refers to individuals whose neurological development and functioning differ from what is considered typical. 
                      This includes conditions like autism, ADHD, dyslexia, and more.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    <strong>Sources:</strong> St. Augustine University, AAHA, and neurodiversity advocacy communities
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Last updated: 10/17/2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}