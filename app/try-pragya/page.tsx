"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export default function TryPragyaPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [sessionId] = useState(() =>
        typeof window !== "undefined"
            ? `guest_${Math.random().toString(36).substring(7)}`
            : "guest_session"
    );

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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

    const predefinedActions = [
        "I need help with anxiety",
        "I feel overwhelmed",
        "How can therapy help?"
    ];

    const handleActionClick = (text: string) => {
        setInputMessage(text);
        setTimeout(() => {
            const form = document.getElementById('chat-form') as HTMLFormElement;
            if (form) form.requestSubmit();
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation currentPath="/try-pragya" />
            <div className="flex-1 flex flex-col items-center justify-center p-4">

                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg h-[80vh] min-h-[600px] flex flex-col overflow-hidden border border-gray-100 relative">
                    {/* Header Solid Color */}
                    <div className="bg-[#f96b13] p-6 text-white relative flex-shrink-0">
                        <div className="flex items-center justify-between z-10 relative">
                            <div className="flex items-center space-x-4">
                                <div className="relative w-[72px] h-[72px] rounded-full flex-shrink-0 shadow-md border-[3px] border-white bg-white">
                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                        <Image
                                            src="/images/NEUTRAL.png"
                                            alt="Pragya Avatar"
                                            fill
                                            className="object-cover scale-150 transform translate-y-1"
                                            sizes="96px"
                                            unoptimized
                                            priority
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#34d399] border-[3px] border-white rounded-full z-20 shadow-sm transform translate-x-1 translate-y-1"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium opacity-90">Chat with</p>
                                    <h3 className="font-bold text-xl leading-tight">Pragya</h3>
                                </div>
                            </div>

                            <button className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                            </button>
                        </div>

                        <svg className="absolute bottom-0 left-0 w-full text-white transform translate-y-[1px]" viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none">
                            <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,100 L0,100 Z"></path>
                        </svg>

                        <p className="text-white/90 text-[15px] mt-4 relative z-10 pb-6">
                            We typically reply in a few minutes.
                        </p>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#fafcfd]">
                        {messages.length === 0 ? (
                            <div className="flex flex-col space-y-3 mt-4">
                                {/* Welcome message */}
                                <div className="bg-white text-gray-800 rounded-3xl p-4 text-[15px] w-[85%] rounded-tl-none self-start shadow-sm border border-gray-100">
                                    Hi there! 👋 I'm Pragya, your mental health companion. How are you feeling today?
                                </div>
                                {/* Pre-defined action buttons */}
                                <div className="flex flex-col space-y-2 pt-6 items-end pr-2 w-full">
                                    {predefinedActions.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleActionClick(action)}
                                            className="bg-white text-orange-500 border border-orange-200 rounded-full px-5 py-2.5 text-[15px] hover:bg-orange-50 hover:shadow-md transition-all shadow-sm self-end font-medium"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-3xl p-4 text-[15px] shadow-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-tr-none"
                                            : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                                            }`}
                                    >
                                        {msg.content}
                                        {msg.role === "assistant" && idx === messages.length - 1 && (
                                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Was this helpful?</span>
                                                <div className="flex space-x-2 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                                                    <button className="text-gray-400 hover:text-orange-500 transition-colors p-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                                                    </button>
                                                    <div className="w-px h-5 bg-gray-300 self-center"></div>
                                                    <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}

                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in duration-300">
                                <div className="bg-white rounded-3xl p-5 text-sm rounded-tl-none border border-gray-100 flex space-x-2 h-12 items-center shadow-sm">
                                    <div className="w-2.5 h-2.5 bg-orange-400/60 rounded-full animate-bounce"></div>
                                    <div className="w-2.5 h-2.5 bg-orange-400/80 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10 flex-shrink-0">
                        <form id="chat-form" onSubmit={sendMessage} className="flex flex-col">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Enter your message..."
                                className="w-full focus:outline-none p-4 text-[15px] text-gray-700 bg-gray-50 rounded-2xl placeholder-gray-400 border border-gray-100 focus:border-orange-200 focus:bg-white transition-all shadow-inner"
                                disabled={isLoading}
                            />
                            <div className="flex items-center justify-between mt-3 px-1">
                                <div className="flex items-center space-x-4 ml-2">
                                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors tooltip-trigger" title="Attach file">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                    </button>
                                    <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors tooltip-trigger" title="Add emoji">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputMessage.trim()}
                                        className={`bg-orange-600 text-white rounded-full p-3 h-12 w-12 flex items-center justify-center transition-all ${isLoading || !inputMessage.trim() ? "opacity-50 cursor-not-allowed bg-orange-300" : "hover:bg-orange-700 hover:scale-110 shadow-lg shadow-orange-500/30"
                                            }`}
                                    >
                                        <svg className="w-5 h-5 transform translate-x-[-1px] translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
