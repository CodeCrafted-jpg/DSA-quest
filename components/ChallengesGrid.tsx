import React from 'react'
import {motion} from "framer-motion"

export const ChallengesGrid: React.FC<{
  challenges: Array<{ id: string; title: string; type: string; difficulty: 'Easy' | 'Medium' | 'Hard'; xp: number }>;
  onOpenChallenge?: (id: string) => void;
}> = ({ challenges, onOpenChallenge }) => {
  const difficultyColors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700 border-green-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Hard: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
          className="bg-white rounded-lg shadow-md p-4 cursor-pointer border-2 border-gray-100 hover:border-emerald-200 transition-all"
          onClick={() => onOpenChallenge?.(challenge.id)}
          onKeyDown={(e) => e.key === 'Enter' && onOpenChallenge?.(challenge.id)}
          tabIndex={0}
          role="button"
          aria-label={`Open ${challenge.title} challenge`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-800 line-clamp-2 flex-1">{challenge.title}</h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{challenge.type}</span>
            <span className={`text-xs px-2 py-1 rounded-full border ${difficultyColors[challenge.difficulty]}`}>
              {challenge.difficulty}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-emerald-600 font-semibold text-sm">+{challenge.xp} XP</span>
            <span className="text-xs text-gray-500 hover:text-emerald-600 transition-colors">Start →</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
