import React from 'react'
import {motion } from "framer-motion"
export const BadgesPanel: React.FC<{
  badges: Array<{ id: string; name: string; earned: boolean; description?: string; icon?: string }>;
}> = ({ badges }) => {
  const [selectedBadge, setSelectedBadge] = React.useState<string | null>(null);
  const earnedCount = badges.filter(b => b.earned).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Badges ({earnedCount}/{badges.length})</h3>

      {earnedCount === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">Complete your first challenge to earn a badge! 🎖️</p>
      ) : (
        <div className="flex overflow-x-auto gap-4 pb-2">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className={`shrink-0 text-center cursor-pointer ${badge.earned ? '' : 'opacity-40 grayscale'}`}
              whileHover={{ scale: badge.earned ? 1.05 : 1 }}
              onClick={() => badge.earned && setSelectedBadge(badge.id)}
              title={badge.earned ? badge.description : 'Locked'}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 ${badge.earned ? 'bg-emerald-100' : 'bg-gray-200'} relative`}>
                {badge.icon}
                {!badge.earned && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-full">🔒</div>
                )}
              </div>
              <p className="text-xs text-gray-700 font-medium w-20 truncate">{badge.name}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Simple selected badge modal/description (inline) */}
      {selectedBadge && (
        <div className="mt-4 bg-emerald-50 p-3 rounded-md text-sm">
          {badges.find(b => b.id === selectedBadge)?.description}
          <div className="mt-2 text-right">
            <button onClick={() => setSelectedBadge(null)} className="text-emerald-700 font-medium text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};