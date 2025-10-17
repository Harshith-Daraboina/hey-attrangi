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
  const [isScrolled, setIsScrolled] = useState(false);
  const [randomVideo, setRandomVideo] = useState<string>('');

  const quotes = [
    "We've just launched our new mental health platform",
    "Supporting neurodivergent individuals with comprehensive care",
    "Evidence-based therapy for better mental health outcomes",
    "Your mental health journey starts with understanding"
  ];

  useEffect(() => {
    fetchFeaturedBlogs();
    // Randomly select between vid1 and vid2
    const videos = ['vid1.mp4', 'vid2.mp4'];
    const randomIndex = Math.floor(Math.random() * videos.length);
    const selectedVideo = videos[randomIndex];
    console.log('Selected video:', selectedVideo); // Debug log
    setRandomVideo(selectedVideo);
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

  // Handle video loading when randomVideo changes
  useEffect(() => {
    if (randomVideo) {
      console.log('Video changed to:', randomVideo);
    }
  }, [randomVideo]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(quoteInterval);
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
      const response = await fetch("/api/blogs/featured");
      if (response.ok) {
        const data = await response.json();
        setFeaturedBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
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
                        <Link href="#services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Therapy Services
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="#services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Assessment & Diagnosis
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="#services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
                          Online Consultations
                          <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link href="#services" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 flex items-center transition-colors block">
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
            onClick={prevQuote}
            className="flex items-center justify-center w-6 h-6 hover:bg-gray-700 rounded transition-all duration-200"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Quote Content */}
          <div className="flex items-center flex-1 justify-center mx-4">
            <p className="text-xs font-medium transition-all duration-500 fade-in text-center">
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
  <img
    src="/images/src3.jpg"
    alt="Modern mental health facility with calming, professional environment"
    className="absolute inset-0 w-full h-full object-cover z-0"
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
            <div className="relative flex justify-center">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-lg w-full">
                <div className="aspect-video">
                  {randomVideo && (
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      key={randomVideo}
                      onLoadStart={() => console.log('Video loading started:', randomVideo)}
                      onCanPlay={() => console.log('Video can play:', randomVideo)}
                      onError={(e) => console.error('Video error:', e)}
                    >
                      <source src={`/videos/${randomVideo}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-300 rounded-full opacity-15 blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Featured Blogs Section */}
        {featuredBlogs.length > 0 && (
          <div className="mb-20 fade-in">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Latest Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover evidence-based articles, personal stories, and expert guidance 
                from our mental health professionals
              </p>
            </div>
            
            {/* Featured Blog Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredBlogs.slice(0, 3).map((blog, index) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                      {blog.image ? (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl">📝</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {blog.views}
                        </div>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      {blog.author && (
                        <div className="mt-3 text-sm text-gray-600">
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
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg btn-primary breathe"
              >
                View All Insights
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
              
          </div>
        )}

      </main>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Hey Attrangi</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our mission, team, and commitment to supporting neurodivergent individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Agenda</h3>
              <p className="text-gray-600 leading-relaxed">
                Promoting awareness, accessibility, and inclusion for neurodivergent individuals 
                through evidence-based psychological support and community building.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Founder's Note</h3>
              <p className="text-gray-600 leading-relaxed">
                Created by individuals who understand the unique challenges faced by 
                neurodivergent people, with a vision to make psychological support accessible to all.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Info</h3>
              <p className="text-gray-600 leading-relaxed">
                Our diverse team includes licensed therapists, neurodivergent advocates, 
                and technology specialists committed to creating inclusive solutions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaborators</h3>
              <p className="text-gray-600 leading-relaxed">
                Partnering with leading psychological institutions, advocacy groups, 
                and technology companies to deliver comprehensive support services.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-700">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">LinkedIn</a>
                <a href="#" className="text-blue-600 hover:text-blue-700">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services designed specifically for neurodivergent individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Self-Help Library</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Access curated resources, articles, and tools designed specifically for 
                neurodivergent individuals. Evidence-based strategies for managing daily challenges.
              </p>
              <Link 
                href="#library" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Explore Library →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Therapy Connect</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Connect with licensed therapists who specialize in working with 
                neurodivergent individuals. Professional support tailored to your needs.
              </p>
              <Link 
                href="#therapy" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Find Therapist →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Join a supportive community of neurodivergent individuals and allies. 
                Share experiences, get peer support, and build meaningful connections.
              </p>
              <Link 
                href="#community" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Join Community →
              </Link>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Awareness Content</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Educational content about neurodivergence, mental health awareness, 
                and inclusive practices. Stay informed and help spread understanding.
              </p>
              <Link 
                href="#awareness" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}