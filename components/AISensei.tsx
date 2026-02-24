"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, BookOpen, User, Sparkles } from "lucide-react";

interface Message {
    role: "user" | "bot";
    content: string;
}

export default function AISensei() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Hello! I am your DSA Sensei. Ask me anything about this topc—I'll help you understand the logic without just giving you the code! 🧘‍♂️" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMsg].map(m => ({
                        role: m.role === "user" ? "user" : "assistant",
                        content: m.content
                    }))
                })
            });

            const data = await res.json();
            if (data.content) {
                setMessages(prev => [...prev, { role: "bot", content: data.content }]);
            } else {
                throw new Error(data.error || "Something went wrong");
            }
        } catch (error) {
            console.error("Sensei Error:", error);
            setMessages(prev => [...prev, { role: "bot", content: "I'm sorry, I'm having trouble connecting to my zen state right now. Please try again later." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all z-50 flex items-center gap-2 group"
            >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="font-bold hidden md:inline">Ask Sensei</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-8 w-[380px] h-[550px] bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-5 bg-emerald-600 text-white flex justify-between items-center bg-gradient-to-r from-emerald-600 to-teal-600">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">DSA Sensei</h3>
                                    <p className="text-xs text-emerald-100">AI Wisdom & Guidance</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-emerald-600 text-white rounded-tr-none'
                                            : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 p-3.5 rounded-2xl rounded-tl-none border border-gray-200">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75" />
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="absolute right-2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
