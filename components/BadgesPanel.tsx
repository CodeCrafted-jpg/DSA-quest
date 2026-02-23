"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Lock, ChevronRight, Info } from "lucide-react";

interface Badge {
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export default function BadgesPanel({ badges = [] }: { badges: Badge[] }) {
  const [selectedBadge, setSelectedBadge] = React.useState<Badge | null>(null);

  // All possible badges (Master list)
  const ALL_BADGES = [
    { name: "First Steps", icon: "🚀", description: "Completed your first DSA module!" },
    { name: "Arrays Master", icon: "🏆", description: "Mastered all modules in Arrays!" },
    { name: "Strings Master", icon: "🏆", description: "Mastered all modules in Strings!" },
    { name: "Linked Lists Master", icon: "🏆", description: "Mastered all modules in Linked Lists!" },
    { name: "Topic Explorer", icon: "🌍", description: "Unlock 3 different topics" },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-emerald-50 border border-emerald-50 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            Achievements
          </h2>
          <p className="text-gray-500 text-sm font-medium">Your earned trophies ({badges.length})</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl">
          <Award className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ALL_BADGES.map((masterBadge) => {
          const earned = badges.find((b) => b.name === masterBadge.name);
          return (
            <motion.button
              key={masterBadge.name}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBadge(masterBadge)}
              className={`relative p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 ${earned
                  ? "bg-white border-emerald-100 shadow-md shadow-emerald-50"
                  : "bg-gray-50 border-gray-100 opacity-60"
                }`}
            >
              <div className={`text-4xl filter drop-shadow-sm ${earned ? "" : "grayscale"}`}>
                {masterBadge.icon}
              </div>
              <span className={`text-xs font-black text-center truncate w-full ${earned ? "text-gray-900" : "text-gray-400"}`}>
                {masterBadge.name}
              </span>

              {!earned && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3 h-3 text-gray-400" />
                </div>
              )}

              {earned && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 p-6 bg-emerald-50 rounded-3xl border border-emerald-100"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{selectedBadge.icon}</div>
              <div>
                <h4 className="font-black text-emerald-900 mb-1">{selectedBadge.name}</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  {selectedBadge.description}
                </p>
                {badges.find(b => b.name === selectedBadge.name) ? (
                  <p className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mt-2">
                    Unlocked
                  </p>
                ) : (
                  <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-2">
                    Locked
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};