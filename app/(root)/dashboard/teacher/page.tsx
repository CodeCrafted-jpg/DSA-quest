"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  AlertTriangle,
  TrendingUp,
  Download,
  Bell,
  ArrowUpRight,
  Layers,
  Type,
  Link2,
  GitBranch,
  LayoutList,
  ArrowDownUp,
  Repeat,
  Zap,
  Hash,
  Award,
  Activity,
  Sparkles,
  Clock
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  arrays: <Layers className="w-5 h-5 text-emerald-600" />,
  strings: <Type className="w-5 h-5 text-emerald-600" />,
  "linked lists": <Link2 className="w-5 h-5 text-emerald-600" />,
  graphs: <GitBranch className="w-5 h-5 text-emerald-600" />,
  stacks: <LayoutList className="w-5 h-5 text-emerald-600" />,
  queues: <ArrowDownUp className="w-5 h-5 text-emerald-600" />,
  recursion: <Repeat className="w-5 h-5 text-emerald-600" />,
  "searching & sorting": <Zap className="w-5 h-5 text-emerald-600" />,
  hashing: <Hash className="w-5 h-5 text-emerald-600" />,
  "greedy algorithms": <Award className="w-5 h-5 text-emerald-600" />,
  "dynamic programming": <TrendingUp className="w-5 h-5 text-emerald-600" />,
};

const getTopicIcon = (title: string) => {
  const key = title.toLowerCase().trim();
  return iconMap[key] ?? <Layers className="w-5 h-5 text-emerald-600" />;
};

const mockActivities = [
  { id: 1, user: "Sayan Paul", action: "completed Binary Search quiz", time: "2 hours ago", score: "100%", icon: "🎯" },
  { id: 2, user: "Rohan Sharma", action: "started Stack implementation", time: "5 hours ago", icon: "🚀" },
  { id: 3, user: "Aditya Verma", action: "earned Array Master badge", time: "1 day ago", icon: "🏆" },
  { id: 4, user: "Sayan Paul", action: "unlocked Queue challenges", time: "1 day ago", icon: "⚡" },
];

export default function TeacherDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch("/api/dashboard/metrics");
        const data = await res.json();
        setMetrics(data);
      } catch (e) {
        console.error("Failed to load metrics", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExport = () => {
    triggerToast("📊 Class metrics CSV export initiated!");
  };

  const handleReminder = () => {
    triggerToast("🔔 Reminder notifications sent to students behind schedule!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-emerald-700 font-bold">Loading classroom metrics...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center max-w-sm">
          <span className="text-5xl">😅</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">No metrics available</h2>
          <p className="text-gray-500 text-sm">We couldn't load the classroom progress data. Please try again later.</p>
        </div>
      </div>
    );
  }

  // Calculate average overall progress across all topics
  const overallAvgProgress = metrics.topicMetrics.length
    ? Math.round(metrics.topicMetrics.reduce((acc: number, curr: any) => acc + curr.avgProgress, 0) / metrics.topicMetrics.length)
    : 0;

  // Calculate total flags (students with <50% progress in any topic)
  const totalWarnings = metrics.topicMetrics.reduce((acc: number, curr: any) => acc + curr.usersBelow50, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-10 px-4 md:px-8">
      {/* Toast Alert */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-6 right-6 bg-emerald-600 text-white px-6 py-3.5 rounded-2xl shadow-xl z-50 font-semibold flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          {toastMessage}
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl shadow-emerald-500/5 border border-emerald-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full -mr-10 -mt-10 opacity-50" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Teacher Dashboard</h1>
              <p className="text-gray-500 mt-1">Track student engagement, completion rates, and weak topics.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
            <Users className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span className="font-bold text-emerald-800 text-sm">{metrics.totalUsers} Active Students</span>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Classroom Size",
              val: metrics.totalUsers,
              sub: "Enrolled student profiles",
              icon: <Users className="w-6 h-6 text-emerald-600" />,
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
            {
              title: "Avg Completion Rate",
              val: `${metrics.overallAvgProgress ?? overallAvgProgress}%`,
              sub: "Across all learning topics",
              icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
              bg: "bg-blue-50",
              border: "border-blue-100",
            },
            {
              title: "Pass Rate",
              val: `${metrics.passRate ?? 0}%`,
              sub: "Students meeting progress target",
              icon: <ArrowUpRight className="w-6 h-6 text-emerald-600" />,
              bg: "bg-emerald-50",
              border: "border-emerald-100",
            },
            {
              title: "Struggling Flags",
              val: totalWarnings,
              sub: "Topic progress below 50%",
              icon: <AlertTriangle className="w-6 h-6 text-rose-600" />,
              bg: "bg-rose-50/50",
              border: "border-rose-100",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white p-6 rounded-3xl shadow-md border ${stat.border} flex items-center justify-between hover:shadow-lg transition-all duration-300`}
            >
              <div className="space-y-1">
                <p className="text-gray-500 font-medium text-sm">{stat.title}</p>
                <p className="text-3xl font-black text-gray-900">{stat.val}</p>
                <p className="text-xs text-gray-400">{stat.sub}</p>
              </div>
              <div className={`p-4 ${stat.bg} rounded-2xl`}>{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Columns (Table & Activity) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Topic Metrics Card */}
            <motion.section
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-500/5 border border-emerald-50 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Topic Metrics</h2>
                  <p className="text-xs text-gray-500">Breakdown of performance in each module</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Updated Live</div>
                  <div className="text-xs font-medium text-gray-600">Overall Avg: <span className="font-bold">{metrics.overallAvgProgress ?? overallAvgProgress}%</span></div>
                  <div className="text-xs font-medium text-gray-600">Pass Rate: <span className="font-bold">{metrics.passRate ?? 0}%</span></div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-500 font-semibold uppercase tracking-wider text-xs">
                      <th className="pb-3 text-left">Topic</th>
                      <th className="pb-3 text-center">Avg Progress</th>
                      <th className="pb-3 text-center">Started</th>
                      <th className="pb-3 text-center">Not Started</th>
                      <th className="pb-3 text-center">Struggling (&lt;50%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {metrics.topicMetrics.map((t: any) => (
                      <tr key={t.topicId} className="group hover:bg-emerald-50/20 transition-colors">
                        <td className="py-4 font-bold text-gray-800 flex items-center gap-3">
                          <div className="p-2 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform">
                            {getTopicIcon(t.title)}
                          </div>
                          <span>{t.title}</span>
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-20 bg-gray-100 h-2.5 rounded-full overflow-hidden inline-block border border-gray-100">
                              <div
                                className="bg-emerald-500 h-full rounded-full shadow-[0_0_5px_rgba(16,185,129,0.4)]"
                                style={{ width: `${t.avgProgress}%` }}
                              />
                            </div>
                            <span className="font-extrabold text-gray-800">{t.avgProgress}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {t.usersStarted}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-500 border border-gray-100">
                            {t.usersNotStarted}
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          {t.usersBelow50 > 0 ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100 animate-pulse">
                              {t.usersBelow50}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-400">
                              0
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Recent Activity Snapshot */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-500/5 border border-emerald-50"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-6 h-6 text-emerald-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Recent Activity Snapshot</h2>
                  <p className="text-xs text-gray-500">Timeline of student events and learning history</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockActivities.map((act) => (
                  <div key={act.id} className="flex items-start justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg">
                        {act.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          {act.user} <span className="font-normal text-gray-500">{act.action}</span>
                        </p>
                        <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          {act.time}
                        </span>
                      </div>
                    </div>
                    {act.score && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                        {act.score}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="space-y-8">
            {/* Weak Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-emerald-500/5 border border-emerald-50"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-gray-800">Weak Topics</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">Topics with the lowest classroom completion rates</p>
              
              <ul className="space-y-3">
                {metrics.weakTopics.map((t: any) => (
                  <li
                    key={t.topicId}
                    className="p-3.5 rounded-2xl bg-rose-50/30 border border-rose-100 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600 shrink-0">
                        {getTopicIcon(t.title)}
                      </div>
                      <span className="text-sm font-bold text-gray-700 truncate">{t.title}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-extrabold text-rose-600">{t.avgProgress}% avg</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Problem Hotspots */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-emerald-500/5 border border-emerald-50"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-gray-800">Problem Hotspots</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">Top questions with the highest wrong-rate</p>

              <div className="mb-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    // CSV export
                    const hotspots = metrics.problemHotspots || [];
                    const header = ["questionId", "text", "incorrect", "attempts", "wrongRate"];
                    const rows = hotspots.map((h: any) => [h.questionId, `"${(h.text || "").replace(/"/g, '""')}"`, h.incorrect, h.attempts, h.wrongRate]);
                    const csv = [header.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'problem_hotspots.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1 rounded bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-100"
                >
                  Export CSV
                </button>
                <button
                  onClick={async () => {
                    // Message top hotspot students (demo: call backend)
                    if (!metrics.problemHotspots || metrics.problemHotspots.length === 0) return;
                    const top = metrics.problemHotspots[0];
                    const res = await fetch('/api/dashboard/message-hotspot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ questionId: top.questionId }) });
                    const data = await res.json();
                    alert(`Messaged ${data.messaged || 0} students about hotspot.`);
                  }}
                  className="px-3 py-1 rounded bg-rose-50 text-rose-700 text-sm font-semibold border border-rose-100"
                >
                  Message Top Hotspot
                </button>
              </div>

              <ul className="space-y-3">
                {(metrics.problemHotspots || []).map((h: any) => (
                  <li key={h.questionId} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-4">
                    <div className="truncate">
                      <p className="text-sm font-bold text-gray-800 truncate">{h.text}</p>
                      <p className="text-xs text-gray-500">Wrong rate: <span className="font-semibold text-rose-600">{h.wrongRate}%</span> — {h.incorrect}/{h.attempts} incorrect</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={async () => {
                          const res = await fetch('/api/dashboard/message-hotspot', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ questionId: h.questionId }) });
                          const data = await res.json();
                          alert(`Messaged ${data.messaged || 0} students about this question.`);
                        }}
                        className="px-3 py-2 rounded bg-emerald-600 text-white text-sm font-bold"
                      >
                        Message Students
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-emerald-500/5 border border-emerald-50"
            >
              <h3 className="font-bold text-gray-800 mb-2">Quick Actions</h3>
              <p className="text-xs text-gray-500 mb-5">Class management and messaging tools</p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleExport}
                  className="w-full px-5 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:shadow-emerald-200"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <button
                  onClick={handleReminder}
                  className="w-full px-5 py-3.5 bg-white border border-emerald-200 text-emerald-600 rounded-2xl font-bold text-sm hover:bg-emerald-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Send Reminder
                </button>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
