"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    isError?: boolean;
}

interface ChatMode {
    id: string;
    title: string;
    description: string;
}

const CHAT_MODES: ChatMode[] = [
    { id: "listen", title: "Just Listen", description: "I'll hear you out and validate your feelings." },
    { id: "reflect", title: "Reflect", description: "I'll help you see patterns and clarify thoughts." },
    { id: "think", title: "Help Me Think", description: "We'll brainstorm or untangle a problem." },
    { id: "direct", title: "Answer Directly", description: "No fluff, just straight answers." },
];

const EXPRESSION_KEYWORDS: Record<string, string[]> = {
    "SAFETY": ["concerned", "helpline", "reach out", "trusted person", "please", "danger", "safe", "crisis", "emergency"],
    "COMFORTING": ["comfort", "here for you", "not alone", "support", "hug", "care", "by your side", "always here"],
    "EMPATHETIC": ["understand", "hear you", "feel", "must be", "sounds", "that's hard", "that must", "empathize"],
    "REFLECTIVE": ["wonder", "reflect", "think about", "perhaps", "maybe", "could it be", "it seems", "ponder"],
    "WARM": ["glad", "happy", "wonderful", "lovely", "beautiful", "warmth", "smile", "joy", "positive"],
    "STRESSED": ["overwhelm", "stress", "anxious", "anxiety", "pressure", "too much", "exhaust", "burden"],
    "TIRED": ["tired", "exhausted", "drained", "fatigue", "worn out", "sleep", "rest", "heavy"],
    "STEADY": ["okay", "alright", "stable", "steady", "manage", "cope", "going through"],
    "TALKING": ["tell me", "share", "want to talk", "what happened", "go on", "listening", "what's going on"],
    "NEUTRAL": ["noted", "sure", "okay", "right", "yes", "no"],
};

const getBotExpression = (text: string): string => {
    const textLower = text.toLowerCase();
    for (const [expression, keywords] of Object.entries(EXPRESSION_KEYWORDS)) {
        if (keywords.some(kw => textLower.includes(kw))) {
            return expression;
        }
    }
    return "DEFAULT";
};

export default function TryPragyaPage() {
    const [hasStarted, setHasStarted] = useState(false);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [botExpression, setBotExpression] = useState("NEUTRAL");
    const [lastUserMessage, setLastUserMessage] = useState("");
    const [isLimitReached, setIsLimitReached] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [visitorId, setVisitorId] = useState<string | null>(null);
    const [remainingChats, setRemainingChats] = useState<number | null>(null);

    useEffect(() => {
        let id = localStorage.getItem("visitor_id");
        if (!id) {
            id = `vis_${Math.random().toString(36).substring(2, 11)}`;
            localStorage.setItem("visitor_id", id);
        }
        setVisitorId(id);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleStartChat = () => {
        if (selectedMode) {
            setHasStarted(true);
            const modeDetails = CHAT_MODES.find(m => m.id === selectedMode);
            const initialMsg = `Hi! I'm setting my mode to: ${modeDetails?.title}. How can I help you today?`;
            setMessages([{ role: "assistant", content: initialMsg }]);
            setBotExpression("NEUTRAL");
        }
    };

    const sendMessage = async (e?: React.FormEvent, retryMsg?: string) => {
        e?.preventDefault();
        if ((!inputMessage.trim() && !retryMsg) || isLoading || !visitorId) return;

        const userMsg = retryMsg || inputMessage;
        if (!retryMsg) {
            setLastUserMessage(userMsg);
            setInputMessage("");
            setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        }
        
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitor_id: visitorId, message: userMsg }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error === "LIMIT_REACHED") {
                    setIsLimitReached(true);
                    setMessages((prev) => [
                        ...prev, 
                        { 
                            role: "assistant", 
                            content: "You've reached your daily limit of 5 chats. Please login to continue chatting and unlock more features!" as any,
                            isError: true 
                        }
                    ]);
                    return;
                }
                throw new Error(data.error || "Failed to connect to the assistant.");
            }

            setRemainingChats(data.remaining);
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "I didn't quite get that. Could you please rephrase?" }]);
            setBotExpression(data.expression || getBotExpression(data.reply || ""));
        } catch (error: any) {
            console.error("Chat error:", error);
            const errorMessage = error.message || "Sorry, I'm having trouble connecting to the backend right now.";
            setMessages((prev) => [
                ...prev,
                { 
                    role: "assistant", 
                    content: (
                        <div className="space-y-2">
                            <p>{errorMessage} Please wait a moment and try again.</p>
                        </div>
                    ) as any,
                    isError: true
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetChat = () => {
        setHasStarted(false);
        setSelectedMode(null);
        setMessages([]);
        setBotExpression("NEUTRAL");
    };

    const handleEndAndSummarize = async () => {
        if (!hasStarted || isLoading || messages.length === 0) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: visitorId }),
            });

            if (!res.ok) throw new Error("Failed to summarize");
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `**Conversation Summary:**\n\n${data.report || "No summary available."}\n\nThank you for sharing. Take care!` },
            ]);
            setBotExpression("WARM");
        } catch (error) {
            console.error("Summarize error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I couldn't generate a summary right now." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800 overflow-hidden font-sans">
            {/* Top Navigation matches site context */}
            <div className="z-20 bg-white border-b border-gray-100 shadow-sm relative">
                <Navigation currentPath="/try-pragya" />
            </div>

            <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto overflow-hidden relative">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="md:hidden w-full relative shrink-0 z-20 overflow-hidden" style={{ backgroundColor: '#eddfd3' }}>
                    <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                        <button
                            onClick={resetChat}
                            title="Reset Chat"
                            className="p-2 text-gray-500 hover:text-orange-500 rounded-full bg-white/40 backdrop-blur-md hover:bg-white transition-colors border border-white/40 shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        </button>
                        <button
                            onClick={handleEndAndSummarize}
                            disabled={isLoading || !hasStarted || messages.length === 0}
                            title="End & Summarize"
                            className={`p-2 rounded-full transition-colors border shadow-sm backdrop-blur-md ${isLoading || !hasStarted || messages.length === 0
                                ? "text-gray-400 bg-white/30 border-white/20 cursor-not-allowed"
                                : "text-white bg-orange-500 border-orange-400 hover:bg-orange-600"
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                        </button>
                    </div>

                    <div className="flex px-5 pt-10 pb-8 items-center justify-between relative z-10 max-w-lg mx-auto">
                        <div className="relative w-[150px] h-[150px] shrink-0 -ml-6 z-10">
                            <Image
                                src={`/bot_expressions/${botExpression}.jpg`}
                                alt="Pragya Avatar"
                                fill
                                className="object-cover scale-[1.15]"
                                sizes="150px"
                                priority
                                unoptimized
                                style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 80%)' }}
                            />
                        </div>
                        <div className="bg-white p-5 rounded-3xl rounded-tl-sm shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex-1 -ml-4 relative z-30 border border-white">
                             <h1 className="text-[17px] font-bold text-[#4a2e5d] mb-1.5 flex items-center gap-1.5">
                                Hey Attrangi! <span className="text-lg">👋</span>
                             </h1>
                             <p className="text-[13px] text-gray-600 leading-relaxed font-medium pr-2">I'm here to listen, support and help you feel better.</p>
                             <div className="absolute bottom-3 right-4 text-[#d9b8f2]">
                                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                             </div>
                        </div>
                    </div>
                    {/* Chat container top overlap */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-t-[24px] z-20"></div>
                </div>

                {/* Left Sidebar */}
                <div className="hidden md:flex w-[360px] md:w-[400px] bg-white/90 backdrop-blur-md border-r border-gray-200 flex-col items-center py-8 px-6 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
                    <h1 className="text-xl font-bold text-gray-800 tracking-wide mb-8">Hey Attrangi</h1>

                    {/* Bot Avatar Container */}
                    <div className="relative w-[320px] h-[320px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,107,19,0.15)] mb-8 overflow-hidden group border border-orange-50/50">
                        <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                            <Image
                                src={`/bot_expressions/${botExpression}.jpg`}
                                alt="Pragya Avatar"
                                fill
                                className="object-cover"
                                sizes="320px"
                                priority
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Mode Pill */}
                    <div className="bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full flex items-center gap-2 mb-10 shadow-inner group cursor-default transition-all duration-300 hover:border-orange-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-orange-400 transition-colors"></div>
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-600 transition-colors">{botExpression} MODE</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full space-y-3 mt-auto mb-8 max-w-[280px]">
                        <button
                            onClick={resetChat}
                            className="w-full bg-white hover:bg-gray-50 border border-gray-200 transition-colors rounded-[16px] py-4 px-4 flex items-center justify-center gap-2 text-[15px] font-medium text-gray-600 shadow-sm"
                        >
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Reset Chat
                        </button>
                        <button
                            onClick={handleEndAndSummarize}
                            disabled={isLoading || !hasStarted || messages.length === 0}
                            className={`w-full transition-colors border rounded-[16px] py-4 px-4 flex items-center justify-center gap-2 text-[15px] font-medium text-white shadow-md ${isLoading || !hasStarted || messages.length === 0
                                    ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 border-orange-500"
                                }`}
                        >
                            <svg className="w-5 h-5 text-orange-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            End & Summarize
                        </button>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center px-4 space-y-1.5 mt-auto pb-4 max-w-[280px]">
                        <p className="text-[12px] text-gray-500 font-medium">I am an AI mental health companion.</p>
                        <p className="text-[12px] text-gray-500 font-medium">I can listen, reflect, and support you.</p>
                        <p className="text-[12px] text-gray-500 font-medium">I am not a replacement for professional help.</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className={`flex-1 flex justify-center bg-white relative overflow-y-auto ${isLimitReached ? 'overflow-hidden' : ''}`}>
                    {isLimitReached && (
                        <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/30 flex items-center justify-center p-6 animate-in fade-in duration-500">
                            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/50 text-center max-w-md w-full scale-in-center">
                                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Limit Reached</h2>
                                <p className="text-gray-500 mb-8 font-medium">
                                    You've used all 5 free chats for today. Unlock unlimited conversations by logging in!
                                </p>
                                <div className="space-y-4">
                                    <a 
                                        href="/login" 
                                        className="block w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 active:scale-[0.98]"
                                    >
                                        Log In / Sign Up
                                    </a>
                                    <button 
                                        onClick={() => setIsLimitReached(false)}
                                        className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                                    >
                                        Close for now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {!hasStarted ? (
                        /* Pre-chat Setup Layout */
                        <div className="w-full max-w-xl px-4 md:px-8 flex flex-col justify-center h-full min-h-[min(100%,700px)] animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out py-8 md:py-12 overflow-y-auto">
                            <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800 mb-6 md:mb-8 tracking-tight md:ml-1 text-center md:text-left">How can I help you today?</h2>

                            <div className="space-y-4">
                                {CHAT_MODES.map((mode) => (
                                    <div
                                        key={mode.id}
                                        onClick={() => setSelectedMode(mode.id)}
                                        className={`w-full px-6 py-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ease-out flex flex-col justify-center ${selectedMode === mode.id
                                            ? 'bg-orange-50 border-orange-400 shadow-[0_8px_20px_rgba(249,107,19,0.15)] ring-1 ring-orange-400/20 translate-x-2'
                                            : 'bg-white border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-sm'
                                            }`}
                                    >
                                        <h3 className={`text-[16px] font-bold mb-1 ${selectedMode === mode.id ? 'text-orange-700' : 'text-gray-800'}`}>{mode.title}</h3>
                                        <p className="text-[14px] text-gray-500 font-medium">{mode.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex justify-end w-full">
                                <button
                                    onClick={handleStartChat}
                                    disabled={!selectedMode}
                                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${selectedMode
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_8px_20px_rgba(249,107,19,0.3)] hover:-translate-y-1'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                        }`}
                                >
                                    Start Chatting
                                    {selectedMode && <svg className="w-5 h-5 ml-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Active Chat Layout */
                        <div className="w-full max-w-4xl flex flex-col h-full md:h-[90vh] md:my-auto bg-white md:rounded-3xl md:border md:border-gray-100 md:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent bg-white">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div
                                            className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-5 text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                                                ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-sm shadow-[0_4px_14px_rgba(249,107,19,0.25)]"
                                                : msg.isError 
                                                    ? "bg-red-50 text-red-800 rounded-tl-sm border border-red-100 shadow-[0_2px_10px_rgba(220,38,38,0.04)]"
                                                    : "bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                                                }`}
                                        >
                                            {msg.content}
                                            {msg.isError && lastUserMessage && (
                                                <button 
                                                    onClick={() => sendMessage(undefined, lastUserMessage)}
                                                    className="mt-3 flex items-center gap-1.5 text-[13px] font-bold text-red-600 hover:text-red-700 transition-colors bg-white/50 px-3 py-1.5 rounded-lg border border-red-100"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                    Retry
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start animate-in fade-in duration-300">
                                        <div className="bg-white border border-gray-100 rounded-3xl p-5 rounded-tl-sm shadow-sm flex items-center space-x-2 h-14">
                                            <div className="w-2.5 h-2.5 bg-orange-400/60 rounded-full animate-bounce"></div>
                                            <div className="w-2.5 h-2.5 bg-orange-400/80 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} className="h-4" />
                            </div>

                            {/* Chat Input Field */}
                            <div className="p-4 md:p-6 bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-10">
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex justify-between items-center mb-2 px-2">
                                        <span className="text-[12px] text-gray-400">
                                            {remainingChats !== null ? `${remainingChats} chats remaining today` : ""}
                                        </span>
                                        {remainingChats !== null && remainingChats <= 1 && (
                                            <a href="/login" className="text-[12px] text-orange-600 font-bold hover:underline">
                                                Login for unlimited chats
                                            </a>
                                        )}
                                    </div>
                                    <form id="chat-form" onSubmit={sendMessage} className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            placeholder="Type your message here..."
                                            className="w-full bg-gray-50 text-gray-800 placeholder-gray-400 rounded-2xl py-4 pl-6 pr-16 border border-gray-100 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all shadow-inner text-[15px]"
                                            disabled={isLoading}
                                            autoFocus
                                        />
                                        <div className="absolute right-2 top-2 bottom-2 flex items-center">
                                            <button
                                                type="submit"
                                                disabled={isLoading || !inputMessage.trim()}
                                                className={`p-2.5 rounded-[12px] h-full transition-all duration-300 flex items-center justify-center aspect-square ${isLoading || !inputMessage.trim()
                                                    ? "text-gray-400 bg-transparent"
                                                    : "text-white bg-orange-500 hover:bg-orange-600 shadow-md hover:-translate-y-0.5 hover:shadow-lg shadow-orange-500/30"
                                                    }`}
                                            >
                                                <svg className="w-5 h-5 transform translate-x-[-1px] translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <p className="text-center text-[11px] text-gray-500 mt-4 hidden md:block font-medium">
                                    Pragya may produce inaccurate information about people, places, or facts.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
