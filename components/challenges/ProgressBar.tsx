"use client";
import { motion } from "framer-motion";
import React from "react";

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs mb-1">
      <span className="font-medium">Progress</span>
      <span className="font-semibold">{progress}%</span>
    </div>
    <div
      className="h-2 bg-white/30 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full bg-white rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  </div>
);
