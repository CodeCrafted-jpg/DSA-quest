
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, User as UserIcon, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface LeaderboardUser {
    id: string;
    userId: string;
    name: string;
    score: number;
    level: number;
}

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const res = await fetch("/api/leaderboard");
                const data = await res.json();
                setLeaderboard(data.leaderboard || []);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Trophy className="w-8 h-8 text-yellow-500" />;
            case 1: return <Medal className="w-8 h-8 text-gray-400" />;
            case 2: return <Medal className="w-8 h-8 text-amber-600" />;
            default: return <span className="text-xl font-bold text-gray-400">#{index + 1}</span>;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading leaderboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <button
                        onClick={() => router.back()}
                        className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-all"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">Hall of Fame</h1>
                        <p className="text-gray-500">The top DSA Explorers in the galaxy 🌌</p>
                    </div>
                </div>

                {/* Top 3 Podium (Visual concept) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {leaderboard.slice(0, 3).map((user, idx) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-white p-8 rounded-3xl shadow-xl border-t-4 text-center ${idx === 0 ? 'border-yellow-400 scale-110 z-10' :
                                    idx === 1 ? 'border-gray-300' : 'border-amber-500'
                                }`}
                        >
                            <div className="flex justify-center mb-4">
                                {getRankIcon(idx)}
                            </div>
                            <div className="w-20 h-20 rounded-full bg-emerald-100 mx-auto flex items-center justify-center mb-4 text-3xl">
                                {idx === 0 ? "👑" : idx === 1 ? "🥈" : "🥉"}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 truncate">{user.name}</h3>
                            <p className="text-emerald-600 font-bold mb-2">{user.score} XP</p>
                            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500">
                                Level {user.level}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* List for 4-10 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                >
                    {leaderboard.slice(3).length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {leaderboard.slice(3).map((user, idx) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-lg font-bold text-gray-400 w-8">#{idx + 4}</span>
                                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                            <UserIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">Level {user.level}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black text-gray-900">{user.score.toLocaleString()}</p>
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">XP</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            Only the bravest 3 have made it so far. Will you be the 4th?
                        </div>
                    )}
                </motion.div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Keep practicing to climb the ranks!</p>
                    <button
                        onClick={() => router.push('/challenges')}
                        className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
                    >
                        Start a Challenge
                    </button>
                </div>
            </div>
        </div>
    );
}
