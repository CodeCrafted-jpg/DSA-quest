import React from 'react'
import { XPBar } from './Xbar';
import {motion} from "framer-motion"

export const LevelCard: React.FC<{
  level: number;
  xp: number;
  nextLevelXp: number;
  streak?: number;
  onClaimReward?: () => Promise<void>;
}> = ({ level, xp, nextLevelXp, streak = 0, onClaimReward }) => {
  const [claimed, setClaimed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const canClaim = xp >= nextLevelXp && !claimed;
  const xpNeeded = Math.max(nextLevelXp - xp, 0);

  const handleClaim = async () => {
    if (!canClaim || !onClaimReward) return;
    setLoading(true);
    try {
      await onClaimReward();
      setClaimed(true);
    } catch (error) {
      console.error("Failed to claim reward:", error);
    } finally {
      setLoading(false);
    }
  };

  const levelTitles = ['Novice', 'Beginner', 'Intermediate Explorer', 'Advanced', 'Expert', 'Master'];
  const title = levelTitles[Math.min(Math.max(level - 1, 0), levelTitles.length - 1)] || 'Explorer';

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border-2 border-emerald-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-4xl font-bold text-gray-800">Level {level}</div>
          <div className="text-emerald-600 font-medium">{title}</div>
        </div>
        {streak > 0 && (
          <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            🔥 {streak}-day streak
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {canClaim ? '🎉 Ready to level up!' : `Earn ${xpNeeded} more XP to reach Level ${level + 1}`}
      </p>

      <XPBar xp={xp} nextLevelXp={nextLevelXp} />

      {onClaimReward && (
        <button
          onClick={handleClaim}
          disabled={!canClaim || loading}
          aria-pressed={claimed}
          aria-label={claimed ? 'Reward claimed' : 'Claim level reward'}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold transition-all ${
            canClaim && !loading
              ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Claiming...' : claimed ? '✓ Claimed' : 'Claim Reward'}
        </button>
      )}
    </motion.div>
  );
};
