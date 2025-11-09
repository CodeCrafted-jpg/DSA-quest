import React from 'react'

    export const mockDashboardData = {
  xp: 450,
  level: 3,
  streak: 4,
  nextLevelXp: 1000,
  badges: [
    { id: "1", name: "First Steps", earned: true, description: "Completed first challenge", icon: "🎯" },
    { id: "2", name: "Speed Demon", earned: true, description: "Solved in under 5 minutes", icon: "⚡" },
    { id: "3", name: "Array Master", earned: false, description: "Master all array challenges", icon: "🎨" },
    { id: "4", name: "Week Warrior", earned: false, description: "7-day streak", icon: "🔥" },
  ],
  recentActivity: [
    { id: "1", action: "Solved: Linear Search", date: "Today", xpChange: 50 },
    { id: "2", action: "Solved: Binary Search", date: "Today", xpChange: 75 },
    { id: "3", action: "Completed Daily Challenge", date: "1d ago", xpChange: 100 },
    { id: "4", action: "Earned Badge: Speed Demon", date: "2d ago" },
    { id: "5", action: "Leveled up to Level 3", date: "3d ago", xpChange: 200 },
  ],
  leaderboardTop: [
    { userId: "1", name: "Alex Chen", xp: 2450, avatar: "👨‍💻" },
    { userId: "2", name: "Sarah Kim", xp: 2100, avatar: "👩‍💻" },
    { userId: "current", name: "You", xp: 450, avatar: "🎮" },
    { userId: "4", name: "Mike Johnson", xp: 380, avatar: "👨‍🎓" },
    { userId: "5", name: "Emma Davis", xp: 320, avatar: "👩‍🎓" },
  ],
  challengesPreview: [
    { id: "1", title: "Two Sum Problem", type: "Debug Fixer", difficulty: "Easy", xp: 50 },
    { id: "2", title: "Reverse Linked List", type: "Arrange Steps", difficulty: "Medium", xp: 75 },
    { id: "3", title: "Binary Tree Traversal", type: "Visual Simulation", difficulty: "Hard", xp: 150 },
    { id: "4", title: "Valid Palindrome", type: "Debug Fixer", difficulty: "Easy", xp: 50 },
  ],
};
 



