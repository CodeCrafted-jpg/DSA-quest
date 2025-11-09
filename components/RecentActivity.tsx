"use client";
import React from "react";
import { motion } from "framer-motion";

const RecentActivity: React.FC<{
  activities?: Array<{ id: string; action: string; date: string; xpChange?: number }>;
}> = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500 text-sm text-center py-4">
          No recent activity yet. Start solving challenges to earn XP! 💪
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Activity</h3>

      <ul className="space-y-3 mb-4" aria-live="polite">
        {activities.slice(0, 5).map((activity, index) => (
          <motion.li
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 text-sm"
          >
            <span className="text-lg">
              {activity.xpChange ? "✅" : "⭐"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700">{activity.action}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-500 text-xs">{activity.date}</span>
                {activity.xpChange && (
                  <span className="text-emerald-600 font-semibold text-xs">
                    +{activity.xpChange} XP
                  </span>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>

      <button
        className="text-emerald-600 font-medium text-sm hover:text-emerald-700 transition-colors"
        aria-label="View all activity"
      >
        View all activity →
      </button>
    </div>
  );
};

export default RecentActivity;
