// scripts/seedTopics.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Topic } from "../models/Topics";


// Load .env variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI in .env");
}

// Topic data (from your UI mock)
const topics = [
  {
    title: "Arrays",
    description: "Master the basics of indexing & traversal",
    color: "#10B981",
    totalXp: 500,
    unlockRequirement: 0,
  },
  {
    title: "Strings",
    description: "Manipulate text like a pro",
    color: "#3B82F6",
    totalXp: 500,
    unlockRequirement: 0,
  },
  {
    title: "Linked Lists",
    description: "Connect nodes and traverse chains",
    color: "#8B5CF6",
    totalXp: 600,
    unlockRequirement: 0,
  },
  {
    title: "Stacks",
    description: "LIFO - Push and Pop like a pro",
    color: "#F97316",
    totalXp: 600,
    unlockRequirement: 0,
  },
  {
    title: "Queues",
    description: "FIFO scheduling and BFS fundamentals",
    color: "#EC4899",
    totalXp: 600,
    unlockRequirement: 0,
  },
  {
    title: "Recursion",
    description: "Functions calling themselves - Mind-bending!",
    color: "#EAB308",
    totalXp: 700,
    unlockRequirement: 2000,
  },
  {
    title: "Searching & Sorting",
    description: "Find & organize data efficiently",
    color: "#F43F5E",
    totalXp: 700,
    unlockRequirement: 2500,
  },
  {
    title: "Hashing",
    description: "Fast lookups with hash tables & maps",
    color: "#06B6D4",
    totalXp: 700,
    unlockRequirement: 3000,
  },
  {
    title: "Graphs",
    description: "Explore vertices, edges & traversals",
    color: "#6366F1",
    totalXp: 800,
    unlockRequirement: 4000,
  },
  {
    title: "Greedy Algorithms",
    description: "Make locally optimal choices",
    color: "#A855F7",
    totalXp: 800,
    unlockRequirement: 5000,
  },
  {
    title: "Dynamic Programming",
    description: "Optimize with memoization & tabulation",
    color: "#14B8A6",
    totalXp: 1000,
    unlockRequirement: 6000,
  },
];

const seed = async () => {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "dsaquest" });

    console.log("🧹 Clearing old topics...");
    await Topic.deleteMany({});

    console.log("🌱 Inserting topics...");
    await Topic.insertMany(topics);

    console.log("✅ Seed complete! Inserted", topics.length, "topics.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
