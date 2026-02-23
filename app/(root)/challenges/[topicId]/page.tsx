
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Play } from "lucide-react";
import Link from "next/link";

interface Module {
    id: string;
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
}

interface Topic {
    id: string;
    title: string;
    description: string;
    color: string;
    modules: Module[];
}

export default function TopicDetailPage() {
    const { topicId } = useParams();
    const router = useRouter();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTopic() {
            try {
                const res = await fetch(`/api/topics/${topicId}`);
                const data = await res.json();
                if (data.topic) {
                    setTopic(data.topic);
                }
            } catch (error) {
                console.error("Failed to fetch topic:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTopic();
    }, [topicId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading topic...</div>;
    if (!topic) return <div className="min-h-screen flex items-center justify-center">Topic not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div
                className="h-64 relative flex items-end pb-8 px-4 md:px-8 text-white"
                style={{ background: `linear-gradient(to bottom right, ${topic.color}, #00000080)` }}
            >
                <div className="max-w-4xl mx-auto w-full">
                    <button
                        onClick={() => router.push("/challenges")}
                        className="absolute top-8 left-4 md:left-8 flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Challenges
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold mb-2">{topic.title}</h1>
                        <p className="text-lg opacity-90 max-w-2xl">{topic.description}</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-emerald-500" />
                        Learning Modules
                    </h2>
                    <span className="text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm text-sm border border-gray-100 italic">
                        {topic.modules.filter(m => m.isCompleted).length} / {topic.modules.length} modules completed
                    </span>
                </div>

                <div className="space-y-4">
                    {topic.modules.map((module, idx) => {
                        const isLocked = idx > 0 && !topic.modules[idx - 1].isCompleted;

                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 ${isLocked ? 'opacity-60 grayscale' : 'hover:shadow-md hover:-translate-y-1'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm">
                                                {idx + 1}
                                            </span>
                                            <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
                                            {module.isCompleted && (
                                                <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                                            )}
                                        </div>
                                        <p className="text-gray-600 ml-11 line-clamp-2">{module.description}</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {isLocked ? (
                                            <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-xl text-sm font-semibold">
                                                <span>Locked</span>
                                            </div>
                                        ) : (
                                            <Link
                                                href={`/challenges/${topicId}/modules/${module.id}`}
                                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${module.isCompleted ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200'}`}
                                            >
                                                {module.isCompleted ? 'Revisit' : 'Start'}
                                                {module.isCompleted ? <ChevronRight className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {isLocked && (
                                    <div className="mt-4 ml-11 text-xs text-amber-600 font-medium">
                                        ⚠️ Complete the previous module to unlock this one.
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
