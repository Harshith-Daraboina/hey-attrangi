"use client";

import { lazy, Suspense, useMemo } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
// Lazy load DomeGallery to reduce initial memory usage
const DomeGallery = lazy(() => import("@/components/DomeGallery"));

export default function Services() {

  // Custom images for therapy services - memoized to prevent recreation
  const therapyImages = useMemo(() => [
    {
      src: "/images/founder2.png",
      alt: "Cognitive Behavioral Therapy Session"
    },
    {
      src: "/images/src4.png", 
      alt: "Individual Counseling"
    },
    {
      src: "/images/service1.jpg",
      alt: "Family Therapy"
    },
    {
      src: "/images/team2.png",
      alt: "Couples Therapy"
    },
    {
      src: "/images/src12.jpg",
      alt: "Psychological Assessment"
    },
    {
      src: "/images/founder2.png",
      alt: "Online Consultations"
    },
    {
      src: "/images/founder2.png",
      alt: "Group Therapy Session"
    }
  ], []); // Empty dependency array means this is created only once

  return (
    <div className="min-h-screen bg-orange-50" suppressHydrationWarning>
      {/* Navigation Component */}
      <Navigation currentPath="/services" />

      {/* Mobile Mockup Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[500px] sm:min-h-[600px]">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Accessible Anywhere
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
                Your Mental Health Journey in Your <span className="text-orange-600">Pocket</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Experience seamless access to therapy services, resources, and support through our intuitive platform. Book sessions, track progress, and access tools - all from your mobile device.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Book Sessions Instantly</h3>
                    <p className="text-sm sm:text-base text-gray-600">Schedule therapy sessions with certified professionals at your convenience</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Track Your Progress</h3>
                    <p className="text-sm sm:text-base text-gray-600">Monitor your mental health journey with interactive tools and insights</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Access Resources 24/7</h3>
                    <p className="text-sm sm:text-base text-gray-600">Browse articles, worksheets, and self-help guides anytime, anywhere</p>
                  </div>
                </div>
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

            {/* Right Side - Mobile Mockup */}
            <div className="relative flex justify-center items-center py-4 sm:py-8">
              {/* Mobile Phone Frame */}
              <div className="relative w-[240px] h-[480px] sm:w-[280px] sm:h-[560px] md:w-[320px] md:h-[640px] bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 shadow-2xl mx-auto">
                {/* Phone Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10"></div>
                
                {/* Screen Content */}
                <div className="bg-white rounded-[2.5rem] h-full overflow-hidden relative">
                  {/* Image inside the phone frame */}
                  <Image
                    src="/images/service1.jpg"
                    alt="Attrangi Mental Health Services"
                    width={320}
                    height={640}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 280px, 320px"
                    loading="lazy"
                    quality={60}
                    unoptimized={false}
                  />
                </div>
                
                {/* Home Indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Therapy Services Gallery */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              Explore Our Therapy Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Interact with our 3D gallery to discover the comprehensive mental health services we offer
            </p>
          </div>
          
          {/* DomeGallery Component - Lazy loaded */}
          <div className="h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Suspense fallback={
              <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading gallery...</p>
                </div>
              </div>
            }>
              <DomeGallery 
                images={therapyImages}
                fit={0.8}
                minRadius={400}
                maxRadius={800}
                dragSensitivity={25}
                enlargeTransitionMs={400}
                openedImageWidth="300px"
                openedImageHeight="400px"
                imageBorderRadius="15px"
                openedImageBorderRadius="20px"
                grayscale={false}
                overlayBlurColor="#ffedd5"
              />
            </Suspense>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}