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
    modules: [
      {
        title: "Introduction to Arrays",
        description: "What are arrays and why do we use them?",
        content: `# Introduction to Arrays\nAn array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.\n\n### Key Characteristics:\n- **Fixed Size**: In many languages (like C++/Java), arrays have a fixed size.\n- **Indexing**: Elements are accessed using an index starting from 0.\n- **Contiguous Memory**: Elements are placed next to each other in memory.`,
        questions: [
          {
            question: "What is the index of the first element in an array?",
            options: ["1", "0", "-1", "Depends on the language"],
            correctAnswer: 1,
            explanation: "In most programming languages, including JavaScript, arrays are 0-indexed.",
          },
          {
            question: "How are elements stored in an array?",
            options: ["Randomly", "Linked with pointers", "Contiguous memory locations", "In a tree structure"],
            correctAnswer: 2,
            explanation: "Arrays store elements in contiguous memory locations, allowing for constant-time access.",
          }
        ]
      },
      {
        title: "Array Operations",
        description: "Common operations like insertion and deletion",
        content: `# Array Operations\nUnderstanding how to modify arrays is crucial.\n\n### Operations:\n- **Traversal**: Visiting each element.\n- **Insertion**: Adding an element (O(n) in worst case).\n- **Deletion**: Removing an element (O(n) in worst case).\n- **Search**: Finding an element.`,
        questions: [
          {
            question: "What is the time complexity of searching for an element in an unsorted array?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            correctAnswer: 2,
            explanation: "In an unsorted array, you may need to check every element, resulting in O(n) time complexity.",
          }
        ]
      }
    ]
  },
  {
    title: "Strings",
    description: "Manipulate text like a pro",
    color: "#3B82F6",
    totalXp: 500,
    unlockRequirement: 0,
    modules: [
      {
        title: "String Basics",
        description: "Strings as arrays of characters",
        content: `# String Basics\nA string is traditionally a sequence of characters. In many languages, strings are immutable.\n\n### Properties:\n- **Length**: Number of characters.\n- **Concatenation**: Joining two strings.\n- **Substring**: Extracting a part of a string.`,
        questions: [
          {
            question: "Are strings usually mutable in JavaScript?",
            options: ["Yes", "No"],
            correctAnswer: 1,
            explanation: "In JavaScript, strings are immutable, meaning you cannot change a character at a specific index directly.",
          }
        ]
      }
    ]
  },
  {
    title: "Linked Lists",
    description: "Connect nodes and traverse chains",
    color: "#8B5CF6",
    totalXp: 600,
    unlockRequirement: 0,
    modules: []
  },
  {
    title: "Stacks",
    description: "LIFO - Push and Pop like a pro",
    color: "#F97316",
    totalXp: 600,
    unlockRequirement: 0,
    modules: []
  },
  {
    title: "Queues",
    description: "FIFO scheduling and BFS fundamentals",
    color: "#EC4899",
    totalXp: 600,
    unlockRequirement: 0,
    modules: []
  },
  {
    title: "Recursion",
    description: "Functions calling themselves - Mind-bending!",
    color: "#EAB308",
    totalXp: 700,
    unlockRequirement: 2000,
    modules: []
  },
  {
    title: "Searching & Sorting",
    description: "Find & organize data efficiently",
    color: "#F43F5E",
    totalXp: 700,
    unlockRequirement: 2500,
    modules: []
  },
  {
    title: "Hashing",
    description: "Fast lookups with hash tables & maps",
    color: "#06B6D4",
    totalXp: 700,
    unlockRequirement: 3000,
    modules: []
  },
  {
    title: "Graphs",
    description: "Explore vertices, edges & traversals",
    color: "#6366F1",
    totalXp: 800,
    unlockRequirement: 4000,
    modules: []
  },
  {
    title: "Greedy Algorithms",
    description: "Make locally optimal choices",
    color: "#A855F7",
    totalXp: 800,
    unlockRequirement: 5000,
    modules: []
  },
  {
    title: "Dynamic Programming",
    description: "Optimize with memoization & tabulation",
    color: "#14B8A6",
    totalXp: 1000,
    unlockRequirement: 6000,
    modules: []
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
