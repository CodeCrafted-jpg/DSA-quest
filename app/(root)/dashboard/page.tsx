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

/**
 * Local type that matches what ChallengesGrid expects.
 * Adjust if your ChallengesGrid expects additional fields.
 */
type Difficulty = "Easy" | "Medium" | "Hard";

interface NormalizedChallenge {
  id: string;
  title: string;
  type: string;
  difficulty: Difficulty;
  xp: number;
}

/** Normalizes any incoming difficulty string into the strict union. */
const normalizeDifficulty = (d: unknown): Difficulty => {
  if (typeof d !== "string") return "Easy";
  const s = d.trim().toLowerCase();
  if (s === "easy") return "Easy";
  if (s === "medium") return "Medium";
  if (s === "hard") return "Hard";
  // fallback — choose whichever default you prefer
  return "Easy";
};

export default function DashboardPage() {
  const data = mockDashboardData ?? {};

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

  // Normalize challenges to satisfy the strict difficulty union type
  const normalizedChallenges: NormalizedChallenge[] = (data.challengesPreview || []).map(
    (c: any) => ({
      id: String(c.id ?? ""),
      title: String(c.title ?? "Untitled"),
      type: String(c.type ?? "misc"),
      difficulty: normalizeDifficulty(c.difficulty),
      xp: typeof c.xp === "number" ? c.xp : Number(c.xp ?? 0),
    })
  );

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
            <XPBar xp={Number(data.xp ?? 0)} nextLevelXp={Number(data.nextLevelXp ?? 1000)} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LevelCard
              level={Number(data.level ?? 1)}
              xp={Number(data.xp ?? 0)}
              nextLevelXp={Number(data.nextLevelXp ?? 1000)}
              streak={Number(data.streak ?? 0)}
              onClaimReward={handleClaimReward}
            />
          </motion.div>
        </section>

        {/* Featured Challenges */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Featured Challenges</h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All →
            </button>
          </div>

          {/* Pass normalizedChallenges — guaranteed to match the strict union type */}
          <ChallengesGrid challenges={normalizedChallenges} onOpenChallenge={handleOpenChallenge} />
        </section>

        {/* Badges & Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BadgesPanel badges={data.badges || []} />
          <QuickActions onStartDaily={handleStartDaily} onResume={handleResume} />
        </section>

        {/* Leaderboard & Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={data.recentActivity || []} />
          </div>
          <LeaderboardCard leaderboard={data.leaderboardTop || []} currentUserId="current" />
        </section>
      </main>
    </div>
  );
}
