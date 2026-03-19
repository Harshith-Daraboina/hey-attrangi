"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [sessionId] = useState(() =>
        typeof window !== "undefined"
            ? `guest_${Math.random().toString(36).substring(7)}`
            : "guest_session"
    );

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

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMsg = inputMessage;
        setInputMessage("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || "https://heyattrangi-spaces-bot-heyattrangi-low.hf.space";
            const res = await fetch(`${apiUrl}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionId, message: userMsg }),
            });

            if (!res.ok) throw new Error("Failed to send message");

            const data = await res.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            setBotExpression(getBotExpression(data.reply));
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I'm having trouble connecting right now." },
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

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 overflow-hidden font-sans">
            {/* Top Navigation matches site context */}
            <div className="z-20 bg-white border-b border-gray-100 shadow-sm relative">
                <Navigation currentPath="/try-pragya" />
            </div>

            <div className="flex-1 flex w-full max-w-[1600px] mx-auto overflow-hidden">
                {/* Left Sidebar */}
                <div className="w-[360px] md:w-[400px] bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col items-center py-8 px-6 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
                    <h1 className="text-xl font-bold text-gray-800 tracking-wide mb-8">Hey Attrangi</h1>

                    {/* Bot Avatar Container */}
                    <div className="relative w-[320px] h-[320px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(249,107,19,0.15)] mb-8 overflow-hidden group border border-orange-50/50">
                        <div className="absolute top-5 left-5 z-30 bg-orange-50/80 backdrop-blur-md p-2.5 rounded-[12px] shadow-sm">
                            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M10.8 4.2a1 1 0 011.05.53l.9 1.8A1 1 0 0013.8 7h2.4a2 2 0 012 2v2.4a1 1 0 00.53.9l1.8.9a1 1 0 010 1.8l-1.8.9a1 1 0 00-.53.9v2.4a2 2 0 01-2 2h-2.4a1 1 0 00-.9.53l-.9 1.8a1 1 0 01-1.8 0l-.9-1.8a1 1 0 00-.9-.53H6a2 2 0 01-2-2v-2.4a1 1 0 00-.53-.9l-1.8-.9a1 1 0 010-1.8l1.8-.9A1 1 0 004 8.6V6a2 2 0 012-2h2.4a1 1 0 00.9-.53l.9-1.8A1 1 0 0110.8 4.2z" /></svg>
                        </div>
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
                        <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition-colors border border-orange-500 rounded-[16px] py-4 px-4 flex items-center justify-center gap-2 text-[15px] font-medium text-white shadow-md">
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
                <div className="flex-1 flex justify-center bg-[#fafcfd] relative overflow-y-auto">
                    {!hasStarted ? (
                        /* Pre-chat Setup Layout */
                        <div className="w-full max-w-xl px-8 flex flex-col justify-center h-full min-h-[700px] animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out py-12">
                            <h2 className="text-[28px] font-bold text-gray-800 mb-8 tracking-tight ml-1">How can I help you today?</h2>

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
                        <div className="w-full max-w-4xl flex flex-col h-[90vh] my-auto bg-white rounded-3xl md:border md:border-gray-100 md:shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent bg-[#fafcfd]">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                                    >
                                        <div
                                            className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-5 text-[15px] leading-relaxed shadow-sm ${msg.role === "user"
                                                ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-sm shadow-[0_4px_14px_rgba(249,107,19,0.25)]"
                                                : "bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                                                }`}
                                        >
                                            {msg.content}
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
                                <form id="chat-form" onSubmit={sendMessage} className="relative max-w-4xl mx-auto flex items-center">
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
                                <p className="text-center text-[11px] text-gray-500 mt-4 hidden md:block font-medium">
                                    Pragya may produce inaccurate information about people, places, or facts.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Absolute positioned User settings icon top right - mimicking screenshot UI but light themed */}
            <div className="absolute top-24 right-10 hidden lg:block z-50">
                <button className="w-12 h-12 rounded-full bg-white border border-gray-200 hover:border-orange-300 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-all shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
        </div>
    );
}
