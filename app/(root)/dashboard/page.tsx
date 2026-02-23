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
import { useRouter } from "next/navigation";


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


export default function DashboardPage() {
  const [profile, setProfile] = React.useState<any>(null);
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, leaderboardRes] = await Promise.all([
          fetch("/api/user/profile"),
          fetch("/api/leaderboard")
        ]);
        const profileData = await profileRes.json();
        const leaderboardData = await leaderboardRes.json();

        setProfile(profileData);
        setLeaderboard(leaderboardData.leaderboard || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>;

  const router = useRouter();
  const data = profile || {};
  const userName = profile?.name || "Explorer";


  // Handlers
  const handleOpenChallenge = (id: string) => {
    const rec = data.recommendations?.find((r: any) => r.id === id);
    if (rec) {
      router.push(`/challenges/${rec.topicId}/modules/${rec.id}`);
    }
  };

  const handleClaimReward = async () => {
    console.log("Claiming reward...");
    await new Promise((r) => setTimeout(r, 800));
  };

  const handleStartDaily = () => {
    if (data.dailyChallenge) {
      router.push(`/challenges/${data.dailyChallenge.topicId}/modules/${data.dailyChallenge.id}`);
    } else {
      router.push('/challenges');
    }
  };
  const handleResume = () => {
    if (data.recentActivities && data.recentActivities.length > 0) {
      // Find the first activity that leads to a module
      const lastModuleAct = data.recentActivities[0];
      // Since our API currently doesn't return topicId in activities, we fallback to daily challenge or dashboard
      if (data.dailyChallenge) {
        router.push(`/challenges/${data.dailyChallenge.topicId}/modules/${data.dailyChallenge.id}`);
      } else {
        router.push('/challenges');
      }
    } else {
      router.push('/challenges');
    }
  };



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
            <XPBar xp={Number(data.xp ?? 0)} nextLevelXp={data.level * 1000} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LevelCard
              level={Number(data.level ?? 1)}
              xp={Number(data.xp ?? 0)}
              nextLevelXp={data.level * 1000}
              streak={Number(data.streak ?? 0)}
              onClaimReward={handleClaimReward}
            />

          </motion.div>
        </section>

        {/* Featured Challenges */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recommended for You</h2>
            <button
              onClick={() => router.push('/challenges')}
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              View Topics →
            </button>
          </div>

          <ChallengesGrid
            challenges={(data.recommendations || []).map((r: any) => ({
              id: r.id,
              title: r.title,
              type: r.topicTitle,
              difficulty: "Easy",
              xp: r.xp
            }))}
            onOpenChallenge={handleOpenChallenge}
          />
        </section>


        {/* Badges & Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BadgesPanel badges={data.badges || []} />
          <QuickActions onStartDaily={handleStartDaily} onResume={handleResume} />
        </section>

        {/* Leaderboard & Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={data.recentActivities || []} />
          </div>

          <LeaderboardCard leaderboard={leaderboard} currentUserId={profile?.userId} />

        </section>
      </main>
    </div>
  );
}
