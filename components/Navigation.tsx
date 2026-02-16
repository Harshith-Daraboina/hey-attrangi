"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath = "/" }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/Show logic
      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActivePath = (path: string) => currentPath === path;

  return (
    <>
      <header
        className={`sticky top-0 w-full z-[60] bg-white shadow-md border-b border-gray-100 transition-transform duration-300 ease-in-out will-change-transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative h-12 w-auto">
                  <img
                    src="/images/logo-vertical.png"
                    alt="Attrangi Private Limited"
                    className="h-full w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Split Layout */}
            <div className="hidden md:flex items-center flex-grow mx-6">
              {/* Left Group */}
              <nav className="flex items-center space-x-6">
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors duration-200 ${isActivePath('/') ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-orange-600'}`}
                >
                  Home
                </Link>

                {/* Services Dropdown */}
                <div className="relative group" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`text-sm font-medium transition-colors duration-200 flex items-center ${isActivePath('/services') || activeDropdown === 'services' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>
                    Services
                    <svg className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Therapy Services</Link>
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Assessment & Diagnosis</Link>
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Online Consultations</Link>
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Group Sessions</Link>
                        <Link href="/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Resources</Link>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/test-your-iq"
                  className={`text-sm font-medium transition-colors duration-200 ${isActivePath('/test-your-iq') ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-orange-600'}`}
                >
                  MindMetric Test
                </Link>
              </nav>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Right Group */}
              <nav className="flex items-center space-x-6">
                <Link
                  href="/blogs"
                  className={`text-sm font-medium transition-colors duration-200 ${isActivePath('/blogs') ? 'text-orange-600 font-bold' : 'text-gray-600 hover:text-orange-600'}`}
                >
                  Insights
                </Link>

                {/* Resources Dropdown */}
                <div className="relative group" onMouseEnter={() => setActiveDropdown('resources')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`text-sm font-medium transition-colors duration-200 flex items-center ${activeDropdown === 'resources' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>
                    Resources
                    <svg className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'resources' && (
                    <div className="absolute top-full left-0 pt-2 w-52 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                        <Link href="/resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">All Resources</Link>
                        <Link href="/resources#self-help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Self-Help Guides</Link>
                        <Link href="/resources#tools" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Mental Health Tools</Link>
                        <Link href="/resources#worksheets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Worksheets & Activities</Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* About Us Dropdown */}
                <div className="relative group" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`text-sm font-medium transition-colors duration-200 flex items-center ${activeDropdown === 'about' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'}`}>
                    About Us
                    <svg className={`w-4 h-4 ml-0.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full right-0 pt-2 w-52 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                        <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">About Attrangi</Link>
                        <Link href="/about#team" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Our Team</Link>
                        <Link href="/about#mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Our Mission</Link>
                        <Link href="/about#contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Contact Us</Link>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Get Started Button */}
              <Link href="/app" className="bg-orange-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-orange-600 transition-colors whitespace-nowrap">
                Get Started
              </Link>
            </div>

            {/* Hamburger Menu Button - Mobile Only */}
            <div className="flex-shrink-0 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[70] top-20 bg-white border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* About Us Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                  className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  About Us
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'about' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>About Attrangi</Link>
                    <Link href="/about#team" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Our Team</Link>
                    <Link href="/about#mission" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Our Mission</Link>
                    <Link href="/about#contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Contact Us</Link>
                  </div>
                )}
              </div>

              {/* Services Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'services' ? null : 'services')}
                  className="w-full px-4 py-3 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'services' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Therapy Services</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Assessment & Diagnosis</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Online Consultations</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Group Sessions</Link>
                    <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Resources</Link>
                  </div>
                )}
              </div>

              <Link
                href="/blogs"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>

              {/* Resources Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'resources' ? null : 'resources')}
                  className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  Resources
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'resources' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>All Resources</Link>
                    <Link href="/resources#self-help" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Self-Help Guides</Link>
                    <Link href="/resources#tools" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Mental Health Tools</Link>
                    <Link href="/resources#worksheets" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Worksheets & Activities</Link>
                  </div>
                )}
              </div>

              <Link
                href="/test-your-iq"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MindMetric Test
              </Link>


              {/* About Us Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'about' ? null : 'about')}
                  className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  About Us
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'about' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>About Attrangi</Link>
                    <Link href="/about#team" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Our Team</Link>
                    <Link href="/about#mission" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Our Mission</Link>
                    <Link href="/about#contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Contact Us</Link>
                  </div>
                )}
              </div>

              {/* Services Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'services' ? null : 'services')}
                  className="w-full px-4 py-3 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  Services
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'services' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Therapy Services</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Assessment & Diagnosis</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Online Consultations</Link>
                    <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Group Sessions</Link>
                    <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Resources</Link>
                  </div>
                )}
              </div>

              <Link
                href="/blogs"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>

              {/* Resources Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === 'resources' ? null : 'resources')}
                  className="w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors flex items-center justify-between"
                >
                  Resources
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileDropdown === 'resources' && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>All Resources</Link>
                    <Link href="/resources#self-help" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Self-Help Guides</Link>
                    <Link href="/resources#tools" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Mental Health Tools</Link>
                    <Link href="/resources#worksheets" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}>Worksheets & Activities</Link>
                  </div>
                )}
              </div>

              <Link
                href="/test-your-iq"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MindMetric Test
              </Link>

              <Link
                href="/app"
                className="block bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div >
        )
      }
    </>
  );
}

