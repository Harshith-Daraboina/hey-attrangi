"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath = "/" }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
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

  const isActivePath = (path: string) => currentPath === path;

  return (
    <>
      <header className={`sticky top-0 z-[60] bg-white border-b-2 border-transparent transition-all duration-300 ${mounted && isScrolled ? 'shadow-xl border-b-2 border-orange-200' : 'shadow-lg'}`} suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <Image
                src="/images/logo-main.png"
                alt="Hey Attrangi logo"
                width={56}
                height={56}
                priority
                className="w-14 h-14 rounded-xl shadow-lg object-contain bg-white p-1"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-orange-600" style={{ fontFamily: 'Poppins, sans-serif' }}>Attrangi</h1>
                <p className="text-xs text-gray-600 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Mental Healthcare</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-1">
                <Link 
                  href="/" 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isActivePath('/') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:bg-gray-100 hover:bg-opacity-60'
                  }`}
                >
                  Home
                </Link>

                {/* About Us Dropdown */}
                <div className="relative" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center">
                    About Us
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'about' && (
                    <div className="absolute top-full left-0 pt-1 w-52 z-50">
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
                <div className="relative" onMouseEnter={() => setActiveDropdown('services')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center ${
                    isActivePath('/services') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:bg-gray-100 hover:bg-opacity-60'
                  }`}>
                    Services
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-0 pt-1 w-52 z-50">
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
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isActivePath('/blogs') ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:bg-gray-100 hover:bg-opacity-60'
                  }`}
                >
                  Insights
                </Link>

                {/* Resources Dropdown */}
                <div className="relative" onMouseEnter={() => setActiveDropdown('resources')} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className="text-gray-700 hover:bg-gray-100 hover:bg-opacity-60 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center">
                    Resources
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeDropdown === 'resources' && (
                    <div className="absolute top-full left-0 pt-1 w-52 z-50">
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

            {/* View Products Button */}
            <Link href="/aids" className="hidden md:flex bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Products
            </Link>

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
      {mobileMenuOpen && (
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
                  <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>About Attrangi</Link>
                  <Link href="/about#team" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Our Team</Link>
                  <Link href="/about#mission" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Our Mission</Link>
                  <Link href="/about#contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Contact Us</Link>
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
                  <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Therapy Services</Link>
                  <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Assessment & Diagnosis</Link>
                  <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Online Consultations</Link>
                  <Link href="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Group Sessions</Link>
                  <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Resources</Link>
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
                  <Link href="/resources" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>All Resources</Link>
                  <Link href="/resources#self-help" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Self-Help Guides</Link>
                  <Link href="/resources#tools" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Mental Health Tools</Link>
                  <Link href="/resources#worksheets" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => {setMobileMenuOpen(false); setMobileDropdown(null);}}>Worksheets & Activities</Link>
                </div>
              )}
            </div>

            <Link 
              href="/aids" 
              className="block bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

