import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-[#fff8f0] to-[#fcebd5] pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-stretch mb-16">
          
          {/* Left Column: Logo & Socials & Details */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center text-center lg:text-left pr-0 lg:pr-8">
            <div className="flex justify-center lg:justify-start items-center gap-3 mb-6">
              <Image
                src="/images/logo.png"
                alt="Hey Attrangi logo"
                width={56}
                height={56}
                className="w-14 h-14 rounded-xl object-contain bg-white p-1 shadow-md"
              />
              <h2 className="text-3xl font-extrabold text-[#1a2b3c] tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                Hey Attrangi!
              </h2>
            </div>
            
            <p className="text-[#1a2b3c]/70 text-sm md:text-base mb-6 max-w-sm mx-auto lg:mx-0 leading-relaxed font-medium">
              Supporting individuals with comprehensive psychological resources and community support in one shared place.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              {/* Instagram */}
              <a href="https://www.instagram.com/hey_attrangi" target="_blank" rel="noopener noreferrer" className="text-[#1a2b3c] hover:text-[#ea7e3b] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm0 2A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9a3.5 3.5 0 003.5-3.5v-9A3.5 3.5 0 0016.5 4h-9zm9.75 1.5a1 1 0 11-.002 2 1 1 0 01.002-2zM12 7a5 5 0 015 5 5 5 0 11-5-5zm0 2a3 3 0 100 6 3 3 0 000-6z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/heyattrangi/" target="_blank" rel="noopener noreferrer" className="text-[#1a2b3c] hover:text-[#ea7e3b] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.238 0 0 2.238 0 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5V5c0-2.762-2.238-5-5-5zM7.119 20.452H3.56V9h3.559v11.452zM5.34 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM20.452 20.452h-3.558v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.047c.476-.902 1.636-1.852 3.369-1.852 3.603 0 4.271 2.37 4.271 5.456v6.287z" /></svg>
              </a>
            </div>

            {/* Contact Details */}
            <div className="text-sm text-[#1a2b3c]/60 space-y-1.5 font-medium">
              <p><a href="mailto:contact@heyattrangi.com" className="hover:text-[#ea7e3b] transition-colors">contact@heyattrangi.com</a></p>
              <p><a href="tel:+919552324069" className="hover:text-[#ea7e3b] transition-colors">+91 95523 24069</a></p>
              <p className="mt-3 leading-relaxed text-xs">
                Jai Jinendra Banglow, 580009<br />
                Hubli - Dharwad Rd, KHB Colony<br />
                Narayanpura, Dharwad, Karnataka
              </p>
            </div>
          </div>

          {/* Right Column: Orange Banner */}
          <div className="w-full lg:w-2/3 bg-[#ea7e3b] rounded-[32px] overflow-hidden relative flex flex-col sm:flex-row items-center sm:items-stretch shadow-lg">
            
            {/* Banner Text Content */}
            <div className="p-8 sm:p-12 z-10 w-full sm:w-3/5 lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Your Mental Health Manager
              </h3>
              <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed">
                Send a text, join a session, or request support. Hey Attrangi turns it into clear paths to wellness, resources, and care.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button disabled className="bg-white/90 text-[#ea7e3b] px-5 py-2 rounded-full font-bold flex items-center justify-center sm:justify-start gap-3 shadow-sm cursor-not-allowed whitespace-nowrap">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.82 3.59-.8 1.48.06 2.65.62 3.4 1.54-3.01 1.63-2.51 5.37.44 6.64-1.01 2.39-1.92 4.19-2.51 4.79zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm">Download for iOS</span>
                    <span className="text-[10px] opacity-70 font-medium">Coming Soon</span>
                  </div>
                </button>
                <button disabled className="bg-transparent border border-white/70 text-white/90 px-5 py-2 rounded-full font-bold flex items-center justify-center sm:justify-start gap-3 cursor-not-allowed whitespace-nowrap">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341l1.834-3.176a.2.2 0 0 0-.072-.27.195.195 0 0 0-.265.07l-1.875 3.248a8.318 8.318 0 0 0-10.29 0L5.05 11.965a.195.195 0 0 0-.265-.07.2.2 0 0 0-.072.27l1.834 3.176C3.992 16.737 2.193 19.345 2 22.428h20c-.193-3.083-1.992-5.691-4.477-7.087zM8.196 19.043c-.496 0-.898-.401-.898-.898s.402-.898.898-.898.898.401.898.898-.402.898-.898.898zm7.608 0c-.496 0-.898-.401-.898-.898s.402-.898.898-.898.898.401.898.898-.402.898-.898.898z"/></svg>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-sm">Download for Android</span>
                    <span className="text-[10px] opacity-70 font-medium">Coming Soon</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Banner Mockup Image */}
            <div className="w-full sm:w-2/5 lg:w-1/2 relative h-64 sm:h-auto overflow-hidden sm:absolute sm:right-0 sm:top-0 sm:bottom-0 mt-8 sm:mt-0 flex justify-center sm:justify-end items-end sm:items-center px-8 sm:px-0 sm:pr-8 lg:pr-12">
              {/* CSS Phone Mockup representing the app */}
              <div className="w-[200px] h-[400px] bg-[#fdfaf6] rounded-t-[40px] sm:rounded-[40px] shadow-2xl relative border-[7px] border-black overflow-hidden translate-y-12 sm:translate-y-0 sm:rotate-[8deg] sm:translate-x-4">
                {/* Dynamic island notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[70px] h-5 bg-black rounded-full z-20"></div>
                
                {/* App Header */}
                <div className="bg-transparent pt-12 pb-4 px-4 h-full relative flex flex-col">
                  {/* Top user/action row */}
                  <div className="flex justify-between items-center mb-5 px-0.5">
                    <div className="w-9 h-9 rounded-full bg-[#ffd4a8]"></div>
                    <div className="w-16 h-3.5 bg-[#e2e8f0] rounded-full"></div>
                  </div>
                  
                  {/* Dark Banner */}
                  <div className="w-full h-10 bg-[#212b36] rounded-[14px] mb-5"></div>
                  
                  {/* Cards */}
                  <div className="flex flex-col gap-3.5 flex-1">
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 flex flex-col gap-2.5">
                      <div className="w-12 h-2.5 bg-[#e2e8f0] rounded-full"></div>
                      <div className="w-full h-2 bg-[#f1f5f9] rounded-full"></div>
                      <div className="w-5/6 h-2 bg-[#f1f5f9] rounded-full"></div>
                    </div>
                    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5 flex flex-col gap-2.5">
                      <div className="w-12 h-2.5 bg-[#ffd4a8] rounded-full"></div>
                      <div className="w-full h-2 bg-[#f1f5f9] rounded-full"></div>
                      <div className="w-2/3 h-2 bg-[#f1f5f9] rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-white border-t border-gray-100 flex justify-center items-center gap-5 px-4 rounded-b-[33px]">
                    <div className="w-8 h-8 bg-[#FF6B00] rounded-full"></div>
                    <div className="w-8 h-8 bg-[#e2e8f0] rounded-full"></div>
                    <div className="w-8 h-8 bg-[#e2e8f0] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom Links Area */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center border-t border-[#1a2b3c]/5">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-[#1a2b3c]/80 text-sm font-medium mb-6 md:mb-0">
            <Link href="/#services" className="hover:text-[#ea7e3b] transition-colors">Features</Link>
            <Link href="/about" className="hover:text-[#ea7e3b] transition-colors">How it works</Link>
            <Link href="/about" className="hover:text-[#ea7e3b] transition-colors">About us</Link>
            <Link href="/blogs" className="hover:text-[#ea7e3b] transition-colors">Explore</Link>
            <Link href="/blogs" className="hover:text-[#ea7e3b] transition-colors">Blog</Link>
            <Link href="/terms?section=privacy" className="hover:text-[#ea7e3b] transition-colors">Cookies</Link>
            <Link href="/terms?section=privacy" className="hover:text-[#ea7e3b] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#ea7e3b] transition-colors">Terms</Link>
            <Link href="/terms?section=refund" className="hover:text-[#ea7e3b] transition-colors">Refund</Link>
          </div>
          
          <p className="text-[#1a2b3c]/50 text-sm font-medium whitespace-nowrap">
            © {new Date().getFullYear()}, All Rights Reserved
          </p>
        </div>
        
      </div>
    </footer>
  );
}

