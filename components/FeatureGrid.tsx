"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Trophy, Rocket } from 'lucide-react';

const FeatureGrid = () => {
  const features = [
    {
      icon: Brain,
      title: "Interactive Challenges",
      description: "Solve DSA problems with visual, step-by-step breakdowns. Learn by doing, not just reading.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Trophy,
      title: "XP & Rewards",
      description: "Earn points, unlock achievements, and level up as you master algorithms and data structures.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Code,
      title: "AI Hints",
      description: "Get intelligent guidance when you're stuck. Our AI helps you learn without giving away answers.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Rocket,
      title: "Leaderboards",
      description: "Compete with friends and learners worldwide. Rise through ranks and showcase your skills.",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-4 bg-emerald-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full font-semibold text-sm mb-4">
            ✨ Why DSAQuest?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Learn Smarter, Not Harder
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gamified learning meets serious skill-building. Here's what makes us different.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.color} shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Decorative Dots */}
                <div className="absolute -top-2 -right-2 w-20 h-20 opacity-20">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <circle cx="5" cy="5" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="15" cy="5" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="25" cy="5" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="35" cy="5" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="5" cy="15" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="15" cy="15" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="25" cy="15" r="2" fill="currentColor" className="text-emerald-600" />
                    <circle cx="35" cy="15" r="2" fill="currentColor" className="text-emerald-600" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="mt-4 text-emerald-600 font-semibold flex items-center gap-2"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-emerald-300/50 transition-all"
          >
            Explore All Features 🎨
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;