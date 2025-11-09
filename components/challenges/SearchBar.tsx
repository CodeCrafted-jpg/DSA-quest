"use client";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (query: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 bg-white rounded-full shadow-lg p-4 w-full max-w-md"
  >
    <Search className="w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder="Search topics..."
      className="bg-transparent flex-1 outline-none text-gray-800"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    {query && (
      <button onClick={() => setQuery("")} className="text-sm text-gray-400 hover:text-gray-600">
        Clear
      </button>
    )}
  </motion.div>
);
