"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Play DSA", href: "/challenges", icon: <Brain size={18} /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <Trophy size={18} /> },
    { name: "Profile", href: "/profile", icon: <LogIn size={18} /> },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-emerald-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
            <Brain className="text-emerald-600" size={24} />
          </div>
          <motion.span
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-emerald-800"
          >
            DSA Quest
          </motion.span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 font-semibold transition-all duration-200 py-1 ${pathname === item.href
                ? "text-emerald-600 border-b-2 border-emerald-500"
                : "text-gray-500 hover:text-emerald-600"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth & Mobile Toggle Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-700 flex items-center gap-2 transition shadow-lg shadow-emerald-100">
                  <LogIn size={18} />
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold text-gray-800">Menu</span>
                <button
                  onClick={closeMenu}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${pathname === item.href
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-emerald-500"
                      }`}
                  >
                    <div className={`p-2 rounded-xl ${pathname === item.href ? "bg-emerald-100" : "bg-gray-100"}`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-10 left-6 right-6 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                <p className="text-sm font-bold text-emerald-800 mb-1">DSA Master</p>
                <p className="text-xs text-emerald-600 opacity-80">Keep pushing your limits!</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

