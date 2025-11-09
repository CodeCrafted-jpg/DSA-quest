"use client";

import { useEffect, useState } from "react";
import { Layers, Type, Link2, LayoutList, ArrowDownUp, GitBranch, Repeat, Zap, Hash, TrendingUp, Award } from "lucide-react";
import { Topic } from "./types"; // optional if separated

const iconMap: Record<string, JSX.Element> = {
  "Arrays": <Layers className="w-8 h-8" />,
  "Strings": <Type className="w-8 h-8" />,
  "Linked Lists": <Link2 className="w-8 h-8" />,
  "Graphs": <GitBranch className="w-8 h-8" />,
  "Stacks": <LayoutList className="w-8 h-8" />,
  "Queues": <ArrowDownUp className="w-8 h-8" />,
  "Recursion": <Repeat className="w-8 h-8" />,
  "Searching & Sorting": <Zap className="w-8 h-8" />,
  "Hashing": <Hash className="w-8 h-8" />,
  "Greedy Algorithms": <Award className="w-8 h-8" />,
  "Dynamic Programming": <TrendingUp className="w-8 h-8" />
};

export default function MockTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();

        const formatted = data.map((t: any) => ({
          id: t._id,
          title: t.title,
          description: t.description,
          color: t.color || "from-emerald-400 to-emerald-600",
          progress: 0,              // default or dynamic value if stored
          unlocked: true,           // can add logic later
          icon: iconMap[t.title] || <Layers className="w-8 h-8" />,
          requiredLevel: t.unlockRequirement,
        }));

        setTopics(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  if (loading) return <p>Loading topics...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {topics.map(topic => (
        <div
          key={topic.id}
          className={`p-4 rounded-2xl bg-linear-to-br ${topic.color} text-white shadow-md`}
        >
          <div className="flex items-center justify-between mb-2">
            {topic.icon}
            <span className="text-sm font-semibold">{topic.progress}%</span>
          </div>
          <h3 className="text-lg font-bold">{topic.title}</h3>
          <p className="text-sm opacity-90">{topic.description}</p>
        </div>
      ))}
    </div>
  );
}
