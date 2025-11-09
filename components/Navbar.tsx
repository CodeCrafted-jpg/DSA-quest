"use client";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Trophy, LayoutDashboard, LogIn } from "lucide-react";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Play DSA", href: "/challenges", icon: <Brain size={18} /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <Trophy size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-emerald-50 shadow-md border-b border-emerald-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo / Title */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Brain className="text-emerald-600" size={24} />
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-gray-800"
          >
            DSA Quest
          </motion.span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-1 font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "text-emerald-600 border-b-2 border-emerald-500"
                  : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 flex items-center gap-2 transition">
                <LogIn size={16} />
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
