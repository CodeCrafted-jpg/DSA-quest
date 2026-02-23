
"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Award, Calendar, Star, TrendingUp, Zap, User as UserIcon } from "lucide-react";

interface ProfileData {
    xp: number;
    level: number;
    weeklyXp: number;
    allTimeXp: number;
    streak: number;
    name: string;
}

export default function ProfilePage() {
    const { user } = useUser();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch("/api/user/profile");
                const data = await res.json();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-emerald-500 p-1">
                                {user?.imageUrl ? (
                                    <img src={user.imageUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center">
                                        <UserIcon className="w-12 h-12 text-emerald-500" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                Lvl {profile?.level}
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{user?.fullName || "DSA Explorer"}</h1>
                            <p className="text-gray-500 mb-4">{user?.primaryEmailAddress?.emailAddress}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl text-emerald-700 font-bold">
                                    <Zap className="w-5 h-5 fill-emerald-500" />
                                    {profile?.streak} Day Streak
                                </div>
                                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl text-amber-700 font-bold">
                                    <Star className="w-5 h-5 fill-amber-500" />
                                    {profile?.xp} Current XP
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Award className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">All-time XP</p>
                            <p className="text-3xl font-black text-gray-900">{profile?.allTimeXp.toLocaleString()}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex items-center gap-6"
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Earned This Week</p>
                            <p className="text-3xl font-black text-gray-900">+{profile?.weeklyXp.toLocaleString()}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Weekly Progress Message */}
                <div className="mt-8 bg-linear-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex items-start gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Weekly Goal</h3>
                            <p className="opacity-90 max-w-lg mb-6 text-lg">
                                You've earned <span className="font-bold underline">{profile?.weeklyXp} XP</span> out of your 500 XP weekly goal. Keep practicing to stay in the top 10%!
                            </p>

                            <div className="w-full bg-black/10 rounded-full h-4 overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, ((profile?.weeklyXp || 0) / 500) * 100)}%` }}
                                    className="h-full bg-white rounded-full shadow-inner"
                                />
                            </div>
                            <p className="text-sm font-bold opacity-80">{Math.min(100, Math.round(((profile?.weeklyXp || 0) / 500) * 100))}% toward your goal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
