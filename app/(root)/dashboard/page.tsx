"use client";
import React from "react";
import { motion } from "framer-motion";

import { XPBar } from "@/components/Xbar";
import { LevelCard } from "@/components/LevelCard";
import { ChallengesGrid } from "@/components/ChallengesGrid";
import { BadgesPanel } from "@/components/BadgesPanel";
import LeaderboardCard from "@/components/LeaderBoard";
import RecentActivity from "@/components/RecentActivity";
import { QuickActions } from "@/components/QuickActions";

import { mockDashboardData } from "@/components/mockDashboardData";

export default function DashboardPage() {
  const data = mockDashboardData;
  const userName = "Explorer"; // Replace with Clerk/currentUser.name in production

  // Handlers
  const handleOpenChallenge = (id: string) => {
    console.log("Opening challenge:", id);
    // router.push(`/challenges/${id}`);
  };

  const handleClaimReward = async () => {
    console.log("Claiming reward...");
    await new Promise((r) => setTimeout(r, 800));
  };

  const handleStartDaily = () => console.log("Start Daily Challenge");
  const handleResume = () => console.log("Resume Last Attempt");

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-emerald-50 to-gray-100 text-gray-800">
      <main className="flex-1 container mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600">Ready to level up your skills today?</p>
        </motion.div>

        {/* XP Bar & Level Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <XPBar xp={data.xp} nextLevelXp={data.nextLevelXp} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LevelCard
              level={data.level}
              xp={data.xp}
              nextLevelXp={data.nextLevelXp}
              streak={data.streak}
              onClaimReward={handleClaimReward}
            />
          </motion.div>
        </section>

        {/* Featured Challenges */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Featured Challenges
            </h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All →
            </button>
          </div>
          <ChallengesGrid
            challenges={data.challengesPreview || []}
            onOpenChallenge={handleOpenChallenge}
          />
        </section>

        {/* Badges & Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BadgesPanel badges={data.badges || []} />
          <QuickActions
            onStartDaily={handleStartDaily}
            onResume={handleResume}
          />
        </section>

        {/* Leaderboard & Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={data.recentActivity || []} />
          </div>
          <LeaderboardCard
            leaderboard={data.leaderboardTop || []}
            currentUserId="current"
          />
        </section>
      </main>
    </div>
  );
}
