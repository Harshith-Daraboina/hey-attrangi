"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { APP_SIGNIN_URL } from "@/lib/app-urls";
import {
  MessageSquare,
  LayoutDashboard,
  BookOpen,
  Video,
  PieChart,
  Building2,
  CheckCircle2,
  ArrowRight,
  Mic,
  Smile,
  Activity,
  Calendar,
  Clock,
  TrendingUp,
  Brain,
  Zap,
  Users,
  AlertTriangle,
  Play
} from "lucide-react";

const features = [
  {
    id: "ai-companion",
    icon: MessageSquare,
    title: "Virtual Companion",
    shortTitle: "Pragya AI",
    description: "Your personal, 24/7 mental health companion that listens, reflects, and helps you navigate your daily emotional landscape.",
    buttonText: "Meet Pragya",
    buttonLink: "/try-pragya",
    capabilities: [
      "Conversational AI chat",
      "Voice mode interactions",
      "Live mood indicators",
      "AI memory for context",
      "Suggested daily prompts",
      "Quick action check-ins"
    ]
  },
  {
    id: "student-dashboard",
    icon: LayoutDashboard,
    title: "Student Dashboard",
    shortTitle: "Dashboard",
    description: "A centralized hub to track your wellness journey, celebrate your progress, and stay on top of your mental health goals.",
    buttonText: "View Dashboard",
    buttonLink: APP_SIGNIN_URL,
    capabilities: [
      "Personalized greetings",
      "Today's mood snapshot",
      "Overall wellness score",
      "Weekly progress rings",
      "Journaling streaks",
      "Upcoming sessions"
    ]
  },
  {
    id: "ai-journal",
    icon: BookOpen,
    title: "AI Journal + Mood Tracking",
    shortTitle: "Journal",
    description: "Express yourself freely in a safe space. Our AI analyzes your entries to provide actionable insights and emotional tracking over time.",
    buttonText: "Start Journaling",
    buttonLink: APP_SIGNIN_URL,
    capabilities: [
      "Rich text journal editor",
      "Interactive mood wheel",
      "Detailed emotion timeline",
      "Stress trend graphs",
      "Gratitude reflections",
      "AI-generated insights"
    ]
  },
  {
    id: "therapy-session",
    icon: Video,
    title: "Therapy Session + AI Summary",
    shortTitle: "Therapy",
    description: "Seamlessly connect with professionals through our secure video platform, enhanced with AI-driven notes and insights.",
    buttonText: "Book Session",
    buttonLink: APP_SIGNIN_URL,
    capabilities: [
      "Secure video call interface",
      "Live emotion timeline",
      "Real-time transcriptions",
      "AI-generated session notes",
      "Key actionable takeaways",
      "Automated follow-ups"
    ]
  },
  {
    id: "personalized-insights",
    icon: PieChart,
    title: "Personalized Insights",
    shortTitle: "Insights",
    description: "Transform your data into clarity. Understand the correlation between your habits, stress levels, and academic performance.",
    buttonText: "View Insights",
    buttonLink: APP_SIGNIN_URL,
    capabilities: [
      "Mood trend analysis",
      "Burnout risk scoring",
      "Focus & sleep correlation",
      "Academic stress metrics",
      "Wellness timeline",
      "Predictive recommendations"
    ]
  },
  {
    id: "counselor-dashboard",
    icon: Building2,
    title: "University / Counselor Dashboard",
    shortTitle: "For Institutions",
    description: "Empower your counseling department with population-level insights, early risk detection, and seamless student management.",
    buttonText: "Partner with us",
    buttonLink: APP_SIGNIN_URL,
    capabilities: [
      "Total students supported",
      "High-risk student alerts",
      "Campus wellness distribution",
      "Department level analytics",
      "Engagement metrics",
      "Intervention tracking"
    ]
  }
];

// --- Mockup Components ---

const AICompanionMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-rose-100 p-6 sm:p-10">
    <div className="w-full max-w-[280px] aspect-[9/19] bg-white rounded-[40px] shadow-2xl border-8 border-gray-900 overflow-hidden flex flex-col relative">
      {/* Top Bar */}
      <div className="bg-orange-50 px-4 py-5 flex items-center justify-between border-b border-orange-100 shrink-0 pt-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
            <span className="text-orange-600 font-bold text-sm">P</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 leading-tight">Pragya AI</h4>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-gray-500">Online • Feeling calm</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 p-4 flex flex-col gap-4 bg-[#faf9f6] overflow-hidden">
        <div className="self-start max-w-[85%] bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm">
          <p className="text-[11px] text-gray-700">Hi there! I noticed you were feeling a bit stressed about exams yesterday. How are you holding up today?</p>
        </div>
        <div className="self-end max-w-[85%] bg-orange-500 p-3 rounded-2xl rounded-tr-sm shadow-sm">
          <p className="text-[11px] text-white">Still a bit overwhelmed, to be honest. There's just so much to read.</p>
        </div>
        <div className="self-start max-w-[85%] bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm relative">
          <p className="text-[11px] text-gray-700">It's completely normal to feel that way. Let's break it down. Would you like to try a quick 2-minute breathing exercise first?</p>
          <div className="absolute -bottom-3 -right-2 bg-rose-100 rounded-full p-1 border border-white shadow-sm">
             <Smile className="w-3 h-3 text-rose-500" />
          </div>
        </div>
        
        {/* Suggested Prompts */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-2 text-center text-[10px] font-medium text-orange-700 cursor-pointer">Yes, let's breathe.</div>
          <div className="bg-orange-50 border border-orange-100 rounded-xl p-2 text-center text-[10px] font-medium text-orange-700 cursor-pointer">Help me make a study plan.</div>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-100 flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
        </div>
        <div className="flex-1 bg-gray-100 rounded-full h-8 flex items-center px-3">
          <span className="text-[11px] text-gray-400">Message Pragya...</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
          <Mic className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  </div>
);

const DashboardMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10">
    <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="bg-[#1a2b3c] p-6 text-white shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <h3 className="text-xl font-bold mb-1">Good morning, Alex! 👋</h3>
        <p className="text-sm text-blue-200">You're on a 5-day wellness streak.</p>
      </div>
      
      <div className="p-5 flex flex-col gap-4 flex-1 bg-[#f8f9fc]">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-4 border-green-400 flex items-center justify-center mb-2">
              <span className="font-bold text-gray-800 text-sm">85</span>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">Wellness Score</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="text-2xl mb-2">😌</div>
             <span className="text-[10px] font-bold text-gray-500 uppercase">Today's Mood</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-gray-800">Today's Plan</h4>
            <span className="text-[10px] text-blue-500 font-bold">View all</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                 <Video className="w-4 h-4 text-blue-600" />
               </div>
               <div className="flex-1">
                 <h5 className="text-[11px] font-bold text-gray-800">Session with Dr. Smith</h5>
                 <p className="text-[9px] text-gray-500">2:00 PM • Video Call</p>
               </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                 <BookOpen className="w-4 h-4 text-orange-600" />
               </div>
               <div className="flex-1">
                 <h5 className="text-[11px] font-bold text-gray-800">Evening Reflection</h5>
                 <p className="text-[9px] text-gray-500">Pending • 5 mins</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JournalMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6 sm:p-10">
     <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[400px]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
           <h3 className="text-sm font-bold text-gray-800">New Journal Entry</h3>
           <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">Today, 8:45 PM</span>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">How are you feeling?</label>
            <div className="flex gap-2">
               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200">😢</div>
               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200">😐</div>
               <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-sm cursor-pointer">🙂</div>
               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200">😁</div>
            </div>
          </div>
          
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-3 relative">
             <p className="text-[11px] text-gray-600 leading-relaxed font-serif">
               Today was surprisingly productive. I managed to finish my project ahead of time, which took a huge weight off my shoulders. I still feel a little anxious about the presentation tomorrow, but definitely more prepared than before...
             </p>
             <div className="absolute bottom-3 right-3 text-[9px] text-gray-400">42 words</div>
          </div>
          
          <div className="mt-4 bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-start gap-2">
             <Zap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
             <div>
               <h4 className="text-[10px] font-bold text-emerald-800">AI Insight</h4>
               <p className="text-[9px] text-emerald-600 mt-1">Your language shows a shift from 'stress' to 'preparedness' compared to yesterday. Keep up the positive framing!</p>
             </div>
          </div>
        </div>
     </div>
  </div>
);

const TherapyMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-fuchsia-100 p-6 sm:p-10">
    <div className="w-full max-w-[420px] bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[380px] relative">
       {/* Main Video (Therapist) */}
       <div className="absolute inset-0 bg-gray-800">
         {/* Abstract Therapist representation */}
         <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
            <div className="w-32 h-32 rounded-full bg-gray-700 mb-4"></div>
            <div className="w-48 h-32 bg-gray-700 rounded-t-full"></div>
         </div>
       </div>
       
       {/* Header */}
       <div className="relative z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
             <span className="text-white text-xs font-bold">45:12</span>
          </div>
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-medium">Dr. Sarah Jenkins</span>
       </div>
       
       {/* Self View PIP */}
       <div className="absolute top-16 right-4 w-24 h-32 bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden shadow-lg z-10">
          <div className="w-full h-full flex flex-col items-center justify-end opacity-50 pb-2">
            <div className="w-10 h-10 rounded-full bg-gray-600 mb-1"></div>
            <div className="w-16 h-12 bg-gray-600 rounded-t-full"></div>
         </div>
       </div>
       
       {/* Bottom Controls & AI Notes */}
       <div className="mt-auto relative z-10">
         {/* AI Floating Card */}
         <div className="mx-4 mb-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-3 h-3 text-purple-300" />
              <span className="text-[10px] text-purple-200 font-bold uppercase tracking-wider">Live AI Notes</span>
            </div>
            <p className="text-[11px] text-white/90">Discussing coping mechanisms for social anxiety. Patient identified deep breathing as effective during last week's event.</p>
         </div>
         
         <div className="bg-gray-900/90 backdrop-blur-md p-4 flex justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white"><Mic className="w-4 h-4"/></div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 text-white"><Video className="w-4 h-4"/></div>
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg></div>
         </div>
       </div>
    </div>
  </div>
);

const InsightsMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-100 p-6 sm:p-10">
     <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[400px]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
           <h3 className="text-sm font-bold text-gray-800">Your Insights</h3>
           <select className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none text-gray-600">
             <option>Last 30 Days</option>
           </select>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto">
           {/* Burnout Score */}
           <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex items-center justify-between">
              <div>
                <h4 className="text-[11px] font-bold text-orange-900 mb-1">Burnout Risk</h4>
                <p className="text-[9px] text-orange-700">Currently low. Good job maintaining boundaries.</p>
              </div>
              <div className="w-12 h-12 rounded-full border-[4px] border-orange-200 border-t-orange-500 flex items-center justify-center transform -rotate-45">
                 <span className="text-[10px] font-bold text-orange-600 transform rotate-45">24%</span>
              </div>
           </div>
           
           {/* Mood Graph abstract */}
           <div className="border border-gray-100 rounded-xl p-4 shadow-sm">
              <h4 className="text-[11px] font-bold text-gray-800 mb-3">Mood vs Sleep</h4>
              <div className="h-24 flex items-end justify-between gap-1">
                 {[40, 60, 45, 70, 85, 65, 80].map((h, i) => (
                    <div key={i} className="w-full flex flex-col gap-1 items-center justify-end h-full">
                       <div className="w-full bg-blue-200 rounded-t-sm" style={{ height: `${h}%` }}></div>
                       <div className="w-full bg-orange-400 rounded-sm" style={{ height: `${(h * 0.8)}%` }}></div>
                    </div>
                 ))}
              </div>
              <div className="flex justify-between mt-2 text-[8px] text-gray-400 font-bold uppercase">
                <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
              </div>
           </div>
           
           {/* Key takeaway */}
           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-3">
              <TrendingUp className="w-4 h-4 text-blue-500 shrink-0" />
              <p className="text-[10px] text-gray-600 leading-tight">Your mood is consistently <span className="font-bold text-gray-800">15% higher</span> on days you sleep more than 7 hours.</p>
           </div>
        </div>
     </div>
  </div>
);

const CounselorMockup = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200 p-6 sm:p-10">
     <div className="w-full max-w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[380px]">
        {/* Top Navbar */}
        <div className="bg-[#1e293b] p-3 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center"><Building2 className="w-3 h-3 text-white"/></div>
              <span className="text-[11px] font-bold text-white">University Portal</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                 <AlertTriangle className="w-2.5 h-2.5" /> 2 Alerts
              </div>
              <div className="w-6 h-6 rounded-full bg-gray-500"></div>
           </div>
        </div>
        
        <div className="p-4 bg-gray-50 flex-1 flex flex-col gap-4">
           {/* Stat Cards */}
           <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                 <span className="text-[9px] text-gray-500 font-bold uppercase">Active Students</span>
                 <h4 className="text-lg font-bold text-gray-800 mt-1">1,248</h4>
                 <span className="text-[9px] text-emerald-500 font-bold">+12% this month</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                 <span className="text-[9px] text-gray-500 font-bold uppercase">Avg Wait Time</span>
                 <h4 className="text-lg font-bold text-gray-800 mt-1">2.4 days</h4>
                 <span className="text-[9px] text-emerald-500 font-bold">-1.2 days</span>
              </div>
           </div>
           
           {/* Table */}
           <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <h4 className="text-[11px] font-bold text-gray-800">Recent Priority Alerts</h4>
              </div>
              <div className="flex-1 p-0 flex flex-col">
                 {[
                   { id: "STU-8492", risk: "High", dept: "Engineering" },
                   { id: "STU-1123", risk: "Medium", dept: "Arts" },
                   { id: "STU-9942", risk: "Medium", dept: "Business" },
                 ].map((row, i) => (
                   <div key={i} className="flex items-center justify-between p-3 border-b border-gray-50 text-[10px]">
                      <span className="font-bold text-blue-600">{row.id}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold ${row.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.risk}</span>
                      <span className="text-gray-500">{row.dept}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
     </div>
  </div>
);

// Map components to IDs
const MockupMap: Record<string, React.FC> = {
  "ai-companion": AICompanionMockup,
  "student-dashboard": DashboardMockup,
  "ai-journal": JournalMockup,
  "therapy-session": TherapyMockup,
  "personalized-insights": InsightsMockup,
  "counselor-dashboard": CounselorMockup,
};

export default function PlatformFeatures() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = features[activeTab];
  const MockupComponent = MockupMap[activeFeature.id];

  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden border-b border-gray-50">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-50/50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a2b3c] tracking-tight leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
             One place for everything.
           </h2>
           <p className="text-lg md:text-xl text-gray-500 font-medium">
             The complete mental health solution for modern students and institutions.
           </p>
        </div>

        {/* Custom Tabs Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-gray-50/80 backdrop-blur-md p-1.5 rounded-2xl sm:rounded-full border border-gray-100 shadow-sm max-w-full overflow-x-auto scrollbar-none">
            {features.map((feature, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(idx)}
                  className={`
                    relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap
                    ${isActive ? "text-[#1a2b3c]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-feature-tab"
                      className="absolute inset-0 bg-white rounded-xl sm:rounded-full shadow-sm border border-gray-200/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{feature.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] md:rounded-[48px] shadow-xl border border-gray-100 overflow-hidden relative">
           
           <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
             
             {/* Left side: Text Content */}
             <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white relative z-10">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeFeature.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col h-full"
                 >
                    <div className="inline-flex items-center gap-2 mb-6 w-fit bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                       <activeFeature.icon className="w-4 h-4" />
                       {activeFeature.shortTitle}
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1a2b3c] mb-4 leading-tight">
                       {activeFeature.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8">
                       {activeFeature.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 mt-auto">
                       {activeFeature.capabilities.map((cap, i) => (
                         <div key={i} className="flex items-start gap-2.5">
                           <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                           <span className="text-sm font-medium text-gray-700">{cap}</span>
                         </div>
                       ))}
                    </div>
                    
                    <div>
                      <Link 
                        href={activeFeature.buttonLink}
                        className="inline-flex items-center justify-center gap-2 bg-[#f6a16c] hover:bg-[#f28a4b] text-[#111827] px-8 py-3.5 rounded-full font-bold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 w-full sm:w-auto"
                      >
                         {activeFeature.buttonText}
                         <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                 </motion.div>
               </AnimatePresence>
             </div>
             
             {/* Right side: Mockup */}
             <div className="bg-gray-50 relative overflow-hidden flex items-center justify-center min-h-[400px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-gray-100">
                <AnimatePresence mode="wait">
                 <motion.div
                   key={activeFeature.id}
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.05 }}
                   transition={{ duration: 0.4 }}
                   className="absolute inset-0 w-full h-full"
                 >
                    <MockupComponent />
                 </motion.div>
               </AnimatePresence>
             </div>
             
           </div>
        </div>

      </div>
    </section>
  );
}
