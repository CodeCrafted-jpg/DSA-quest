"use client";
import { motion } from "framer-motion";
import { Topic } from "./types";

import { TopicCard } from "./TopicCard";

export const TopicGrid: React.FC<{ topics: Topic[] }> = ({ topics }) => {
  if (topics.length === 0)
    return (
      <motion.div className="text-center py-20">
        <div className="text-6xl mb-4">😅</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No topics found</h3>
        <p className="text-gray-500">Try a different search term</p>
      </motion.div>
    );

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delayChildren: 0.2, staggerChildren: 0.1 },
        },
      }}
    >
      {topics.map((topic, index) => (
        <TopicCard key={topic.id || `${topic.title}-${index}`} topic={topic} index={index} />

      ))}
    </motion.div>
  );
};
