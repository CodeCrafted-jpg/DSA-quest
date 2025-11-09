import React from "react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  id: string;
  userId: string;
  name: string;
  score: number;
}

interface LeaderboardCardProps {
  leaderboard?: LeaderboardEntry[];
  currentUserId?: string;
}

export default function LeaderboardCard({
  leaderboard = [], // ✅ default empty array
  currentUserId,
}: LeaderboardCardProps) {
  if (!leaderboard.length) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-center text-gray-500">
        No leaderboard data yet.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Leaderboard</h2>
      <ul role="list" className="space-y-3 mb-4">
       {leaderboard.slice(0, 5).map((user, index) => {
  const isCurrentUser = user.userId === currentUserId;
  return (
    <motion.li
      key={user.id || `${user.userId}-${index}`} // ✅ fallback key
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex justify-between p-3 rounded-md ${
        isCurrentUser
          ? "bg-emerald-50 border border-emerald-200"
          : "bg-gray-50"
      }`}
    >
      <span>{user.name}</span>
      <span className="font-semibold text-emerald-600">{user.score}</span>
    </motion.li>
  );
})}

      </ul>
    </div>
  );
}
