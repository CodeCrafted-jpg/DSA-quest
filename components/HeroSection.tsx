"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Code2 } from 'lucide-react';
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: -20, y: -30 },
    { icon: Target, delay: 0.2, x: 20, y: -20 },
    { icon: Code2, delay: 0.4, x: -15, y: 20 }
  ];
   const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

   const handleStartLearning = () => {
    if (isSignedIn) {
      fetch("/api/user", { method: "POST" });
      router.push("/dashboard");
    } else {
      openSignIn({
        redirectUrl: "/dashboard",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700 px-4">
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`
            }}
            animate={{
              y: [0, item.y, 0],
              x: [0, item.x, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <item.icon className="w-12 h-12 text-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm"
          >
            <span className="text-sm font-semibold">⚡️ Gamified Learning</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Level Up Your<br />
            <span className="text-yellow-300">Coding Journey</span>
          </h1>

          <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
            Learn DSA through fun challenges, leaderboards, and XP rewards.
            Transform complexity into adventure! 🎯
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
                 onClick={handleStartLearning}
              className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-300/50 transition-all"
            >
              Start Learning 🚀
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              View Demo 👀
            </motion.button>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Mock Coding Interface */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white font-semibold">Progress</span>
                  <span className="text-yellow-300 font-bold">75%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-linear-to-r from-yellow-300 to-yellow-500 rounded-full"
                  />
                </div>
              </div>

              {/* XP Counter */}
              <div className="bg-white/20 rounded-xl p-4 flex items-center justify-between">
                <span className="text-white font-semibold">Total XP</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-2xl font-bold text-yellow-300"
                >
                  ⭐ 1,250
                </motion.span>
              </div>

              {/* Code Challenge Preview */}
              <div className="bg-emerald-900/30 rounded-xl p-4 space-y-2">
                <div className="text-white/80 text-sm font-mono">Challenge: Binary Search</div>
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="h-8 bg-white/10 rounded-lg flex items-center px-3"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
                    <span className="text-white/60 text-xs font-mono">Step {i}</span>
                  </motion.div>
                ))}
              </div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="bg-yellow-400/20 border-2 border-yellow-400 rounded-xl p-3 flex items-center gap-3"
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <div className="text-yellow-300 font-bold text-sm">New Achievement!</div>
                  <div className="text-white/70 text-xs">Array Master</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Student Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-6 -right-6 text-6xl"
          >
            💻
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#F0FDF4"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;