"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function BillingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcfd] font-sans text-gray-800">
      <div className="z-20 bg-white border-b border-gray-100 shadow-sm relative">
        <Navigation currentPath="/billing" />
      </div>

      <main className="flex-1 flex justify-center pt-16 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-[1000px] bg-white rounded-[32px] shadow-[0_4px_40px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="p-8 md:p-12 pb-8 border-b border-gray-50">
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[#0c1421] tracking-tight mb-2">
              Compare plans
            </h1>
            <p className="text-gray-500 font-medium">
              Need more details before choosing?{" "}
              <button className="text-[#0c1421] font-bold hover:underline">
                See feature breakdown ↓
              </button>
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Essential Plan */}
            <div className="p-8 md:p-10 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-[#0c1421] mb-4">Essential</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[2.5rem] font-bold text-[#0c1421] leading-none">₹49</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <p className="text-[#FF6B00] font-bold text-sm mb-6">Affordable start</p>
              
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1">
                Core self-care tools, AI interactions, and standard support.
              </p>

              <div className="space-y-4 mb-10 w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">CHATS</span>
                  <span className="text-[#0c1421] font-bold">Limited</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">ANALYTICS</span>
                  <span className="text-[#0c1421] font-bold">Basic</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">SUPPORT</span>
                  <span className="text-[#0c1421] font-bold">Standard</span>
                </div>
              </div>

              <button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold py-3.5 rounded-full transition-all shadow-sm">
                Current Plan
              </button>
            </div>

            {/* Premium Plan (Recommended) */}
            <div className="p-8 md:p-10 flex flex-col h-full relative">
              {/* Highlight Border and Badge */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF6B00] z-10"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <span className="bg-orange-50 text-[#FF6B00] border border-orange-200 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span> Recommended
                </span>
              </div>

              <h2 className="text-2xl font-bold text-[#0c1421] mb-4">Premium</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[2.5rem] font-bold text-[#0c1421] leading-none">₹299</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
              <p className="text-gray-500 font-medium text-sm mb-6">Billed monthly</p>
              
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1">
                Enhanced access, more credits, and premium support.
              </p>

              <div className="space-y-4 mb-10 w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">CHATS</span>
                  <span className="text-[#0c1421] font-bold">Unlimited</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">ANALYTICS</span>
                  <span className="text-[#0c1421] font-bold">Advanced</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">SUPPORT</span>
                  <span className="text-[#0c1421] font-bold">Priority</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button className="w-full bg-[#FF6B00] hover:bg-orange-600 text-white font-bold py-3.5 rounded-full transition-all shadow-md hover:-translate-y-0.5">
                  Upgrade to Premium
                </button>
                <button className="text-[#0c1421] font-bold text-sm hover:underline">
                  View Premium pricing ›
                </button>
              </div>
            </div>

            {/* Organization Plan */}
            <div className="p-8 md:p-10 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-[#0c1421] mb-4">Organization</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-[2.5rem] font-bold text-[#0c1421] leading-none">Custom</span>
              </div>
              <p className="text-gray-500 font-bold text-sm mb-6 mt-1">Billed by institution</p>
              
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1">
                College or corporate plan with organization-managed billing.
              </p>

              <div className="space-y-4 mb-10 w-full">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">USERS</span>
                  <span className="text-[#0c1421] font-bold">Managed</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">ADMIN</span>
                  <span className="text-[#0c1421] font-bold">Portal</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">BILLING</span>
                  <span className="text-[#0c1421] font-bold">Centralized</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <button className="w-full bg-[#0a192f] hover:bg-black text-white font-bold py-3.5 rounded-full transition-all shadow-sm">
                  Contact Sales
                </button>
                <button className="text-[#0c1421] font-bold text-sm hover:underline">
                  View Org pricing ›
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
