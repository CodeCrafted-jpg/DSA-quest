"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { Topic } from "./types";


export const TopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
  const handleClick = () => {
    if (topic.unlocked) console.log(`Navigating to /challenges/${topic.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={topic.unlocked ? { scale: 1.03, y: -8 } : {}}
      className={`relative rounded-2xl p-6 bg-linear-to-br ${topic.color} shadow-lg text-white cursor-pointer overflow-hidden group ${
        !topic.unlocked ? "opacity-75" : ""
      }`}
      onClick={handleClick}
    >
      {!topic.unlocked && (
        <motion.div className="absolute inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-10 rounded-2xl">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-2" />
            <p className="font-bold text-lg">Locked</p>
            <p className="text-sm opacity-90">Reach Level {topic.requiredLevel}</p>
          </div>
        </motion.div>
      )}

      <div className="relative z-0">
        <div className="mb-4 flex items-center justify-between">
          <div className="p-3 bg-white/20 rounded-xl">{topic.icon}</div>
          {topic.progress > 0 && topic.unlocked && (
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              In Progress
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
        <p className="text-sm opacity-90 mb-4 line-clamp-2">{topic.description}</p>

        {topic.unlocked && <ProgressBar progress={topic.progress} />}

        {topic.unlocked && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-gray-800 font-semibold px-4 py-2.5 rounded-lg shadow-md mt-4"
          >
            {topic.progress > 0 ? "▶️ Continue" : "🚀 Start"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
