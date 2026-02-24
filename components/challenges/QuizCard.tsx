
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Lightbulb, Trophy, Sparkles } from "lucide-react";

interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizCardProps {
    questions: Question[];
    onComplete: () => void;
}

export default function QuizCard({ questions, onComplete }: QuizCardProps) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const currentQuestion = questions[currentIdx];

    const handleOptionSelect = async (idx: number) => {
        if (isCorrect !== null) return;
        setSelectedOption(idx);
        const correct = idx === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowExplanation(true);

        if (!correct) {
            setAiLoading(true);
            try {
                const res = await fetch("/api/ai/explain", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        question: currentQuestion.question,
                        userChoice: currentQuestion.options[idx],
                        correctChoice: currentQuestion.options[currentQuestion.correctAnswer],
                        options: currentQuestion.options
                    })
                });
                const data = await res.json();
                if (data.explanation) setAiExplanation(data.explanation);
            } catch (err) {
                console.error("AI Explain Error:", err);
            } finally {
                setAiLoading(false);
            }
        }
    };

    const handleNext = () => {
        if (currentIdx < questions.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setShowExplanation(false);
            setAiExplanation(null);
        } else {
            setIsFinished(true);
            onComplete();
        }
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">Quiz Completed!</h3>
                <p className="text-emerald-700 mb-6">You've mastered all the concepts in this module.</p>
                <div className="bg-white/60 rounded-xl p-4 inline-flex items-center gap-2 text-emerald-600 font-bold">
                    <span className="text-2xl">⭐</span> +50 XP Earned
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Knowledge Check
                </span>
                <span className="text-gray-400 font-medium">
                    Question {currentIdx + 1} of {questions.length}
                </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-tight">
                {currentQuestion.question}
            </h3>

            <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                    let state = "idle";
                    if (selectedOption !== null) {
                        if (idx === currentQuestion.correctAnswer) state = "correct";
                        else if (idx === selectedOption) state = "wrong";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            disabled={selectedOption !== null}
                            className={`w-full group relative p-4 rounded-2xl flex items-center gap-4 text-left font-semibold transition-all duration-200 border-2 ${state === "idle" ? "bg-gray-50 border-gray-100 hover:border-emerald-300 hover:bg-white" :
                                state === "correct" ? "bg-emerald-50 border-emerald-500 text-emerald-700" :
                                    "bg-red-50 border-red-500 text-red-700"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 transition-colors ${state === "idle" ? "bg-white text-gray-400 group-hover:text-emerald-500" :
                                state === "correct" ? "bg-emerald-500 text-white" :
                                    "bg-red-500 text-white"
                                }`}>
                                {state === "idle" ? String.fromCharCode(65 + idx) :
                                    state === "correct" ? <Check className="w-6 h-6" /> :
                                        <X className="w-6 h-6" />}
                            </div>
                            <span className="flex-1">{option}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence>
                {showExplanation && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className={`overflow-hidden rounded-2xl mb-8 p-5 ${isCorrect ? 'bg-emerald-50/50' : 'bg-red-50/50'}`}
                    >
                        <div className="flex gap-3">
                            <Lightbulb className={`w-5 h-5 shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`} />
                            <div>
                                <p className={`font-bold mb-1 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {isCorrect ? 'Well done!' : `Not quite... Correct answer is ${String.fromCharCode(65 + currentQuestion.correctAnswer)}`}
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{currentQuestion.explanation}</p>

                                <AnimatePresence>
                                    {!isCorrect && (aiLoading || aiExplanation) && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-3 pt-3 border-t border-red-200"
                                        >
                                            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> Sensei's Extra Tip
                                            </p>
                                            {aiLoading ? (
                                                <div className="flex gap-1 py-1">
                                                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce" />
                                                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce delay-75" />
                                                    <div className="w-1.5 h-1.5 bg-red-300 rounded-full animate-bounce delay-150" />
                                                </div>
                                            ) : (
                                                <p className="text-red-800 text-sm italic leading-relaxed">
                                                    "{aiExplanation}"
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={isCorrect === null}
                    className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${isCorrect === null
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200'
                        }`}
                >
                    {currentIdx < questions.length - 1 ? "Next Question" : "Finish Module"}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
