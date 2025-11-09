import React from 'react'
import { motion } from "framer-motion";

export const XPBar: React.FC<{ xp: number; nextLevelXp: number; showLabel?: boolean }> = ({
  xp,
  nextLevelXp,
  showLabel = true,
}) => {
  const percentage = Math.min((xp / nextLevelXp) * 100, 100);
  const isLevelReady = xp >= nextLevelXp;

  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-700 font-medium">{xp} / {nextLevelXp} XP</span>
          <span className="text-emerald-600 font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className="relative h-4 bg-gray-200 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={nextLevelXp}
        aria-label={`Experience points: ${xp} out of ${nextLevelXp}`}
      >
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)' }}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-2 bg-white opacity-60 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {isLevelReady && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-600 text-sm font-semibold text-center"
        >
          🎉 Level Ready!
        </motion.div>
      )}
    </div>
  );
};
