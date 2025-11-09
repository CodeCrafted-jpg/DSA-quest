"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const links = [
    { name: 'About', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'GitHub', href: '#', icon: Github }
  ];

  return (
    <footer className="bg-gray-900 border-t-4 border-emerald-600 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-2xl font-bold text-white">DSAQuest</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Gamified learning platform that makes Data Structures & Algorithms fun and engaging for everyone.
            </p>
            <div className="flex gap-3">
              {[Github, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm"
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-bold text-lg">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Get the latest challenges and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-500 transition-colors text-sm"
              >
                Join
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2025 DSAQuest. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> for learners worldwide
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>

        {/* Fun Easter Egg */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-center mt-8"
        >
          <span className="text-gray-600 text-xs">
            🚀 Built with React, Tailwind & Framer Motion
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;