"use client";
import { motion } from "framer-motion";
import { SearchBar } from "./SearchBar";

export const ChallengeHero = ({
  searchQuery,
  setSearchQuery,
  unlockedTopics,
  totalTopics,
  avgProgress,
  mastered,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  unlockedTopics: number;
  totalTopics: number;
  avgProgress: number;
  mastered: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-12"
  >
    <h1 className="text-5xl font-bold text-gray-800 mb-4">
      🧠 Pick a Topic, <span className="text-emerald-600">Master the Logic</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Level up your problem-solving skills one data structure at a time.
    </p>

    <div className="flex flex-wrap justify-center gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md px-6 py-3">
        <p className="text-gray-500 text-sm">Topics Unlocked</p>
        <p className="text-2xl font-bold text-emerald-600">
          {unlockedTopics}/{totalTopics}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-md px-6 py-3">
        <p className="text-gray-500 text-sm">Avg Progress</p>
        <p className="text-2xl font-bold text-blue-600">{avgProgress}%</p>
      </div>
      <div className="bg-white rounded-xl shadow-md px-6 py-3">
        <p className="text-gray-500 text-sm">Topics Mastered</p>
        <p className="text-2xl font-bold text-purple-600">{mastered}</p>
      </div>
    </div>

    <div className="flex justify-center">
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
    </div>
  </motion.div>
);
