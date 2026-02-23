
"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import QuizCard from "./QuizCard";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface ModuleViewProps {
    module: {
        id: string;
        title: string;
        content: string;
        questions: any[];
    };
    onComplete: () => void;
    onBack: () => void;
}

export default function ModuleView({ module, onComplete, onBack }: ModuleViewProps) {
    const [mode, setMode] = useState<"learning" | "quiz">("learning");

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-8 font-medium"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Modules
            </button>

            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-gray-100 rounded-2xl mb-12 w-fit">
                <button
                    onClick={() => setMode("learning")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${mode === "learning" ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <BookOpen className="w-5 h-5" />
                    Learn
                </button>
                <button
                    onClick={() => setMode("quiz")}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${mode === "quiz" ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                >
                    <GraduationCap className="w-5 h-5" />
                    Quiz
                </button>
            </div>

            <AnimatePresence mode="wait">
                {mode === "learning" ? (
                    <motion.div
                        key="learning"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="prose prose-emerald max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
                    >
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-6">
                            {module.title}
                        </h1>
                        <div className="markdown-content">
                            {/* Using a simple div instead of ReactMarkdown for now if library is missing, or I can just render text */}
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                                {module.content}
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={() => setMode("quiz")}
                                className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                            >
                                Take the Quiz 🚀
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <QuizCard questions={module.questions} onComplete={onComplete} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Minimal AnimatePresence mock if not used properly
function AnimatePresence({ children, mode }: { children: React.ReactNode, mode?: string }) {
    return <>{children}</>;
}
