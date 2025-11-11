"use client";

import { motion } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";

// Deterministic pseudo-random generator
function pseudoRandom01(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 43758.5453;
  return x - Math.floor(x);
}

function deterministicPosition(index: number, min = 5, max = 95) {
  const r1 = pseudoRandom01(index * 1.37 + 1.2);
  const r2 = pseudoRandom01(index * 2.19 + 3.8);
  return {
    left: `${(min + r1 * (max - min)).toFixed(3)}%`,
    top: `${(min + r2 * (max - min)).toFixed(3)}%`,
  };
}

const CommunitySection = () => {
  const avatars = [
    { initials: "AS", color: "from-purple-500 to-purple-600", name: "Ananya S." },
    { initials: "RK", color: "from-blue-500 to-blue-600", name: "Rahul K." },
    { initials: "PM", color: "from-pink-500 to-pink-600", name: "Priya M." },
    { initials: "AJ", color: "from-emerald-500 to-emerald-600", name: "Arjun J." },
    { initials: "SK", color: "from-yellow-500 to-yellow-600", name: "Sneha K." },
    { initials: "VT", color: "from-red-500 to-red-600", name: "Vikram T." },
  ];

  const testimonials = [
    {
      text: "DSAQuest made DSA actually fun! I went from dreading algorithms to looking forward to solving them every day.",
      author: "Ananya",
      role: "Computer Science Student",
      rating: 5,
    },
    {
      text: "The gamification is brilliant. I've learned more in 3 months here than I did in a year of traditional courses.",
      author: "Rahul",
      role: "Software Engineer",
      rating: 5,
    },
    {
      text: "The AI hints are a game-changer. They guide you without spoiling the solution. Perfect for learning!",
      author: "Priya",
      role: "Coding Bootcamp Graduate",
      rating: 5,
    },
  ];

  const stats = [
    { icon: Users, value: "1,000+", label: "Active Learners" },
    { icon: TrendingUp, value: "50K+", label: "Challenges Solved" },
    { icon: Star, value: "4.9/5", label: "Average Rating" },
  ];

  return (
    <section className="py-20 px-4 bg-emerald-50 relative overflow-hidden">
      {/* Floating Bubbles Background (deterministic) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const pos = deterministicPosition(i + 1);
          return (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-emerald-200/20"
              style={{
                left: pos.left,
                top: pos.top,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-600 font-bold">Growing Community</span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Join 1,000+ Learners
            <span className="block text-emerald-600 mt-2">Already Leveling Up! 🚀</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Be part of a vibrant community that learns, grows, and celebrates wins together
          </p>
        </motion.div>

        {/* Avatar Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="flex items-center">
            {avatars.map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className="relative -ml-4 first:ml-0"
                style={{ zIndex: avatars.length - index }}
              >
                <div
                  className={`w-16 h-16 rounded-full bg-linear-to-br ${avatar.color} flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-lg cursor-pointer`}
                >
                  {avatar.initials}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: -5 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg"
                >
                  {avatar.name}
                </motion.div>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-lg border-4 border-white shadow-lg cursor-pointer -ml-4"
            >
              +994
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-xl text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="inline-flex p-4 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4"
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>

              <div className="text-6xl text-emerald-100 font-serif absolute top-4 right-4 select-none">
                "
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-emerald-300/50 transition-all inline-flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Join the Community Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
