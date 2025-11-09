"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, CheckCircle, Zap } from 'lucide-react';

const DemoShowcase = () => {
  const [activeTab, setActiveTab] = useState('challenge');
  const [xp, setXp] = useState(850);
  const [progress, setProgress] = useState(60);

  const steps = [
    { id: 1, text: "Initialize left and right pointers", completed: true },
    { id: 2, text: "Calculate mid = (left + right) / 2", completed: true },
    { id: 3, text: "Compare arr[mid] with target", completed: false },
    { id: 4, text: "Adjust pointers based on comparison", completed: false }
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-br from-gray-900 via-gray-800 to-emerald-900 relative overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Skills. Your Pace.
            <span className="block text-emerald-400 mt-2">Your Adventure.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how DSAQuest transforms complex algorithms into interactive experiences
          </p>
        </motion.div>

        {/* Mock Browser Window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glowing Frame */}
          <div className="absolute inset-0 bg-linear-to-r from-emerald-500 via-purple-500 to-emerald-500 rounded-3xl blur-xl opacity-50" />
          
          {/* Browser Window */}
          <div className="relative bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
            {/* Browser Header */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 mx-4 bg-gray-800 rounded-lg px-4 py-1 text-sm text-gray-400">
                dsaquest.com/learn
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-900/50 px-4 py-2 flex gap-2 border-b border-gray-700">
              {['challenge', 'code', 'hints'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gray-800 text-emerald-400 border-b-2 border-emerald-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-8 min-h-96">
              {/* Top Stats Bar */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* XP Counter */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 bg-linear-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl px-4 py-3 flex-1 min-w-48"
                >
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-xs text-gray-400 font-medium">Total XP</div>
                    <motion.div
                      key={xp}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold text-yellow-400"
                    >
                      {xp}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Progress Tracker */}
                <div className="flex-1 min-w-64 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Course Progress</span>
                    <span className="text-emerald-400 font-bold">{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-emerald-400 to-emerald-600 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Challenge Interface */}
              <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Binary Search Challenge
                    </h3>
                    <p className="text-gray-400">
                      Arrange the steps in the correct order to implement binary search
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-2 rounded-lg">
                    <Play className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold text-sm">Running</span>
                  </div>
                </div>

                {/* Drag to Sort Steps */}
                <div className="space-y-3 mt-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      drag="y"
                      dragConstraints={{ top: 0, bottom: 0 }}
                      className={`group flex items-center gap-4 p-4 rounded-xl cursor-move transition-all ${
                        step.completed
                          ? 'bg-emerald-500/20 border-2 border-emerald-500/50'
                          : 'bg-gray-700/50 border-2 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {/* Drag Handle */}
                      <div className="flex flex-col gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                        <div className="w-1 h-1 rounded-full bg-gray-500" />
                      </div>

                      {/* Step Number */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                        step.completed ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {step.completed ? <CheckCircle className="w-5 h-5" /> : step.id}
                      </div>

                      {/* Step Text */}
                      <div className="flex-1">
                        <span className={`font-mono text-sm ${
                          step.completed ? 'text-emerald-300' : 'text-gray-300'
                        }`}>
                          {step.text}
                        </span>
                      </div>

                      {/* Code Icon */}
                      <Code className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setXp(xp + 50);
                      setProgress(Math.min(progress + 5, 100));
                    }}
                    className="flex-1 px-6 py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-emerald-500/50 transition-all"
                  >
                    Submit Solution
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl font-semibold hover:bg-gray-600 transition-all"
                  >
                    Get Hint
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            { icon: "🎯", title: "Real-time Feedback", desc: "Instant validation as you learn" },
            { icon: "🚀", title: "Adaptive Difficulty", desc: "Challenges that grow with you" },
            { icon: "📊", title: "Track Progress", desc: "Visualize your journey" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoShowcase;