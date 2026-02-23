// app/(root)/challenges/page.tsx
"use client";

import React, { JSX, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Type,
  Link2,
  LayoutList,
  ArrowDownUp,
  GitBranch,
  Repeat,
  Zap,
  Hash,
  TrendingUp,
  Award,
  Lock,
  Search as SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";



interface RawTopic {
  _id?: string;
  title?: string;
  description?: string;
  color?: string;
  progress?: number;
  unlockRequirement?: number;
  [k: string]: any;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  color: string; // original DB value (hex or tailwind gradient)
  progress: number;
  unlocked: boolean;
  requiredLevel?: number;
}

const iconMap: Record<string, JSX.Element> = {
  arrays: <Layers className="w-8 h-8" />,
  strings: <Type className="w-8 h-8" />,
  "linked lists": <Link2 className="w-8 h-8" />,
  graphs: <GitBranch className="w-8 h-8" />,
  stacks: <LayoutList className="w-8 h-8" />,
  queues: <ArrowDownUp className="w-8 h-8" />,
  recursion: <Repeat className="w-8 h-8" />,
  "searching & sorting": <Zap className="w-8 h-8" />,
  hashing: <Hash className="w-8 h-8" />,
  "greedy algorithms": <Award className="w-8 h-8" />,
  "dynamic programming": <TrendingUp className="w-8 h-8" />,
};

/* ------------------------ Helpers: color & luminance --------------------- */
function isTailwindGradientColor(color: string | undefined) {
  if (!color) return false;
  return color.includes("from-") || color.includes("to-");
}

function isHexColor(color: string | undefined) {
  if (!color) return false;
  // basic hex check: #RGB, #RRGGBB
  return /^#([0-9A-F]{3}){1,2}$/i.test(color.trim());
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return { r, g, b };
  } else if (h.length === 6) {
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return { r, g, b };
  }
  return { r: 0, g: 0, b: 0 };
}

/** returns true if black text is better, false if white text is better */
function prefersDarkTextOnHex(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  // relative luminance formula
  const [R, G, B] = [r, g, b].map((c) => {
    const cn = c / 255;
    return cn <= 0.03928 ? cn / 12.92 : Math.pow((cn + 0.055) / 1.055, 2.4);
  });
  const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  // contrast threshold—if luminance is high, prefer dark text
  return lum > 0.45;
}

/* --------------------------- Progress bar JSX --------------------------- */
function InlineProgress({ progress, textColor }: { progress: number; textColor: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-1 text-xs font-bold uppercase tracking-wider opacity-80">
        <span>Completion</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-black/10 rounded-full h-2.5 overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>
  );
}

/* ----------------------------- Page ------------------------------------ */
export default function ChallengesPage() {
  const router = useRouter();
  const [rawTopics, setRawTopics] = useState<RawTopic[] | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userXP, setUserXP] = useState(0);
  const [userLevel, setUserLevel] = useState(1);


  useEffect(() => {
    let mounted = true;
    async function fetchTopics() {
      try {
        setLoading(true);
        const res = await fetch("/api/topics");
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        const json = await res.json();
        // Standardize: if API returns an array, use it; else handle data.topics or data.data
        const arr: RawTopic[] = Array.isArray(json)
          ? json
          : json.topics
            ? json.topics
            : json.data
              ? json.data
              : // maybe the route returned { success: true, payload: [...] }
              Array.isArray(json.payload)
                ? json.payload
                : // fallback: if it's a single object, make it an array
                json && typeof json === "object" && json._id
                  ? [json]
                  : [];
        if (mounted) setRawTopics(arr);
      } catch (err: any) {
        console.error("Failed to fetch /api/topics:", err);
        if (mounted) setError(err.message || "Failed to fetch topics");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    async function fetchUserData() {
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        if (mounted) {
          setUserXP(data.xp || 0);
          setUserLevel(data.level || 1);
        }
      } catch (err) {
        console.error("Failed to fetch profile stats:", err);
      }
    }
    fetchTopics();
    fetchUserData();

  }, []);

  // Format DB topics to our UI model
  const topics: Topic[] = useMemo(() => {
    if (!rawTopics) return [];
    return rawTopics.map((t, i) => {
      const id = t._id ?? t.id ?? `${t.title ?? "topic"}-${i}`;
      const title = String(t.title ?? "Untitled");
      const description = String(t.description ?? "No description provided");
      const color = t.color ?? "#10B981"; // fallback to mint green hex
      const progress = typeof t.progress === "number" ? t.progress : 0;

      const requiredLevel = typeof t.unlockRequirement === "number" ? t.unlockRequirement : 0;
      const unlocked = (requiredLevel || 0) <= (userXP || 0);

      return {
        id,
        title,
        description,
        color,
        progress,
        unlocked,
        requiredLevel,
      };
    });
  }, [rawTopics, userXP]);

  // Search filter
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [searchQuery, topics]);

  // Stats
  const total = topics.length;
  const unlockedCount = topics.filter((t) => t.unlocked).length;
  const avgProgress = Math.round(
    topics.reduce((s, t) => s + (t.unlocked ? t.progress : 0), 0) / Math.max(1, unlockedCount)
  );
  const mastered = topics.filter((t) => t.progress === 100).length;

  /* ---------------------------- Render -------------------------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50">
      {/* Floating XP */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2 z-50"
      >
        <span className="text-2xl">⭐</span>
        <span className="font-bold text-emerald-600">{userXP} XP</span>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header: title, search, stats */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Challenges</h1>
            <p className="text-gray-600 mt-1">
              Practice algorithms & data structures — progress is saved to your account.
            </p>
            <div className="mt-3 flex gap-3 text-sm text-gray-700">
              <div className="px-3 py-1 rounded-lg bg-white shadow-sm">
                <strong>{total}</strong> topics
              </div>
              <div className="px-3 py-1 rounded-lg bg-white shadow-sm">
                <strong>{unlockedCount}</strong> unlocked
              </div>
              <div className="px-3 py-1 rounded-lg bg-white shadow-sm">
                Avg progress: <strong>{avgProgress}%</strong>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white shadow-sm">
                Mastered: <strong>{mastered}</strong>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-96">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, e.g. arrays, graphs..."
                className="w-full pl-10 pr-4 py-3 rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Search topics"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-20 text-emerald-600 font-semibold">Loading topics…</div>
        )}
        {error && (
          <div className="text-center py-20 text-red-600 font-semibold">
            Error: {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😅</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No topics found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((topic, idx) => {
              // icon
              const keyTitle = topic.title.toLowerCase();
              const icon = iconMap[keyTitle] ?? <Layers className="w-8 h-8" />;

              // choose style/class for background
              const useGradientClass = isTailwindGradientColor(topic.color);
              const useHex = isHexColor(topic.color);
              const fallbackGradient = "from-emerald-400 to-emerald-600";

              // determine text color class for hex backgrounds
              const preferDarkText = useHex ? prefersDarkTextOnHex(topic.color) : false;
              const textColorClass = useHex ? (preferDarkText ? "text-gray-900" : "text-white") : "text-white";
              const smallTextColorForProgress = useHex ? (preferDarkText ? "text-gray-700" : "text-white") : "text-white";

              // unique key already ensured at mapping stage; but ensure fallback:
              const reactKey = topic.id ?? `${topic.title}-${idx}`;

              return (
                <motion.div
                  key={reactKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  whileHover={topic.unlocked ? { scale: 1.02, y: -6 } : {}}
                  className={`relative rounded-2xl p-6 shadow-lg overflow-hidden cursor-pointer ${topic.unlocked ? "" : "opacity-80"}`}
                  onClick={() => {
                    if (topic.unlocked) {
                      router.push(`/challenges/${topic.id}`);
                    } else {
                      console.log(`Locked: requires level ${topic.requiredLevel}`);
                    }
                  }}

                  // background via class or style
                  style={
                    useHex
                      ? { background: topic.color }
                      : undefined
                  }
                >
                  {/* If gradient classes are provided (Tailwind), apply them here via className */}
                  <div
                    className={`${isTailwindGradientColor(topic.color) ? `bg-linear-to-br ${topic.color}` : ""} absolute inset-0 opacity-10 pointer-events-none`}
                    aria-hidden
                  />

                  {/* Card inner content */}
                  <div className={`relative z-10 ${textColorClass}`}>
                    {/* Lock overlay */}
                    {!topic.unlocked && (
                      <div className="absolute inset-0 z-20 rounded-2xl bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Lock className="w-10 h-10 mx-auto mb-2" />
                          <div className="font-semibold">Locked</div>
                          <div className="text-sm opacity-90 mt-1">Reach Level {topic.requiredLevel}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <div className="p-3 rounded-xl bg-white/20 inline-flex items-center justify-center">
                        {/* icon with contrast: ensure icon visibility even on white bg */}
                        <div className={`${useHex && prefersDarkTextOnHex(topic.color) ? "text-gray-900" : "text-white"}`}>
                          {icon}
                        </div>
                      </div>

                      {topic.progress > 0 && topic.unlocked ? (
                        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                          In Progress
                        </div>
                      ) : null}
                    </div>

                    <h3 className="text-2xl font-bold leading-tight mb-1">{topic.title}</h3>
                    <p className={`text-sm opacity-90 mb-4 line-clamp-2 ${useHex && prefersDarkTextOnHex(topic.color) ? "text-gray-700" : ""}`}>
                      {topic.description}
                    </p>

                    {/* Progress */}
                    {topic.unlocked && (
                      <InlineProgress progress={topic.progress} textColor={smallTextColorForProgress} />
                    )}

                    {/* CTA */}
                    {topic.unlocked ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-4 w-full py-2.5 rounded-lg font-semibold ${useHex ? (prefersDarkTextOnHex(topic.color) ? "bg-white/90 text-gray-900" : "bg-white text-gray-900") : "bg-white text-gray-900"}`}
                        onClick={() => console.log("Start/Continue", topic.id)}
                      >
                        {topic.progress > 0 ? "▶️ Continue" : "🚀 Start"}
                      </motion.button>
                    ) : (
                      <button
                        disabled
                        className="mt-4 w-full py-2.5 rounded-lg font-semibold bg-white/20 text-white cursor-not-allowed"
                      >
                        Locked
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Footer quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12 p-6 bg-linear-to-r from-emerald-100 to-blue-100 rounded-2xl"
        >
          <p className="text-lg font-medium text-gray-700">
            💪 "The expert in anything was once a beginner." — Keep going!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
