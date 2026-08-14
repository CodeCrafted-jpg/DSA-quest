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
    modules: [
      {
        title: "Singly Linked Lists",
        description: "Nodes with next pointers",
        content: `# Singly Linked Lists\nA linked list is a linear collection of nodes where each node points to the next node. Unlike arrays, linked lists do not require contiguous memory.`,
        questions: [
          {
            question: "What is the time complexity to access the k-th element in a singly linked list?",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            correctAnswer: 2,
            explanation: "Access requires traversing from the head up to k, which is O(n)."
          },
          {
            question: "Which operation is O(1) on a singly linked list if you have a pointer to the node?",
            options: ["Access by index", "Delete after a node", "Find middle element", "Random access"],
            correctAnswer: 1,
            explanation: "If you have a pointer to the node, deleting it (by updating pointers) can be O(1)."
          }
        ]
      }
    ]
  },
  {
    title: "Stacks",
    description: "LIFO - Push and Pop like a pro",
    color: "#F97316",
    totalXp: 600,
    unlockRequirement: 0,
    modules: [
      {
        title: "Stack Basics",
        description: "Push, pop and peek operations",
        content: `# Stacks\nA stack is a Last-In-First-Out data structure. Common operations: push, pop, peek.`,
        questions: [
          {
            question: "Which sequence describes stack behavior?",
            options: ["FIFO", "LIFO", "Random", "Priority"],
            correctAnswer: 1,
            explanation: "Stacks follow Last-In-First-Out (LIFO) ordering."
          },
          {
            question: "What is the time complexity of push/pop on a stack implemented with a linked list?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            correctAnswer: 0,
            explanation: "Push and pop at the head are constant time O(1)."
          }
        ]
      }
    ]
  },
  {
    title: "Queues",
    description: "FIFO scheduling and BFS fundamentals",
    color: "#EC4899",
    totalXp: 600,
    unlockRequirement: 0,
    modules: [
      {
        title: "Queue Basics",
        description: "Enqueue, dequeue and use cases",
        content: `# Queues\nA queue is First-In-First-Out (FIFO). Useful for BFS, scheduling, and buffering.`,
        questions: [
          {
            question: "Which algorithm commonly uses a queue?",
            options: ["DFS", "BFS", "Binary Search", "Quick Sort"],
            correctAnswer: 1,
            explanation: "Breadth-First Search (BFS) uses a queue to explore neighbors level by level."
          },
          {
            question: "What is the time complexity to enqueue or dequeue in a well-implemented queue?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            correctAnswer: 0,
            explanation: "Enqueue and dequeue are constant time when using a linked list or circular buffer."
          }
        ]
      }
    ]
  },
  {
    title: "Recursion",
    description: "Functions calling themselves - Mind-bending!",
    color: "#EAB308",
    totalXp: 700,
    unlockRequirement: 2000,
    modules: [
      {
        title: "Recursion Fundamentals",
        description: "Base case, recursion tree and stack",
        content: `# Recursion\nRecursion is when a function calls itself. Always ensure a base case to avoid infinite recursion. Understand the call stack growth.`,
        questions: [
          {
            question: "What is essential to prevent infinite recursion?",
            options: ["Global variables", "Base case", "Tail calls", "Memoization"],
            correctAnswer: 1,
            explanation: "A base case stops the recursion from continuing indefinitely."
          },
          {
            question: "Which technique can convert recursion into iteration to avoid stack growth?",
            options: ["Memoization", "Tail recursion elimination", "Greedy", "Divide and conquer"],
            correctAnswer: 1,
            explanation: "Tail recursion elimination (when supported) or rewriting to iterative loop can avoid stack growth."
          }
        ]
      }
    ]
  },
  {
    title: "Searching & Sorting",
    description: "Find & organize data efficiently",
    color: "#F43F5E",
    totalXp: 700,
    unlockRequirement: 2500,
    modules: [
      {
        title: "Search & Sort Basics",
        description: "Common algorithms and their complexities",
        content: `# Searching & Sorting\nImportant algorithms: linear search, binary search, bubble sort, merge sort, quicksort. Know their time complexities.`,
        questions: [
          {
            question: "What is the time complexity of binary search on a sorted array?",
            options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
            correctAnswer: 1,
            explanation: "Binary search halves the search space each step, giving O(log n)."
          },
          {
            question: "Which sorting algorithm has average-case O(n log n) time?",
            options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
            correctAnswer: 2,
            explanation: "Merge Sort runs in O(n log n) in all cases; Quick Sort has average O(n log n)."
          }
        ]
      }
    ]
  },
  {
    title: "Hashing",
    description: "Fast lookups with hash tables & maps",
    color: "#06B6D4",
    totalXp: 700,
    unlockRequirement: 3000,
    modules: [
      {
        title: "Hash Tables",
        description: "Key-value lookup fundamentals",
        content: `# Hashing\nHash tables map keys to indices using a hash function. Handle collisions with chaining or open addressing.`,
        questions: [
          {
            question: "What is the average time complexity for lookup in a good hash table?",
            options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
            correctAnswer: 0,
            explanation: "With a low load factor and a good hash, lookups are average O(1)."
          },
          {
            question: "Which technique is used to resolve collisions in hash tables?",
            options: ["Binary search", "Chaining", "Heapify", "Dijkstra"],
            correctAnswer: 1,
            explanation: "Chaining stores collided keys in a linked list (or bucket) at the same index."
          }
        ]
      }
    ]
  },
  {
    title: "Graphs",
    description: "Explore vertices, edges & traversals",
    color: "#6366F1",
    totalXp: 800,
    unlockRequirement: 4000,
    modules: [
      {
        title: "Graph Traversals",
        description: "BFS, DFS and representations",
        content: `# Graphs\nGraphs are collections of nodes and edges. Representations: adjacency list, adjacency matrix. Traversals include BFS and DFS.`,
        questions: [
          {
            question: "Which traversal is good for shortest unweighted paths?",
            options: ["DFS", "BFS", "Dijkstra", "Topological Sort"],
            correctAnswer: 1,
            explanation: "BFS finds shortest paths in unweighted graphs."
          },
          {
            question: "Which representation is space-efficient for sparse graphs?",
            options: ["Adjacency matrix", "Adjacency list", "Edge list", "Incidence matrix"],
            correctAnswer: 1,
            explanation: "Adjacency lists store only existing edges and are efficient for sparse graphs."
          }
        ]
      }
    ]
  },
  {
    title: "Greedy Algorithms",
    description: "Make locally optimal choices",
    color: "#A855F7",
    totalXp: 800,
    unlockRequirement: 5000,
    modules: [
      {
        title: "Greedy Strategy",
        description: "When greedy works and common examples",
        content: `# Greedy Algorithms\nGreedy algorithms make locally optimal choices hoping for global optimum. Examples: activity selection, coin change (when canonical).`,
        questions: [
          {
            question: "Greedy algorithms are guaranteed to work when:",
            options: ["Problem has overlapping subproblems", "Problem has optimal substructure and greedy-choice property", "There is no recursion", "Graph is acyclic"],
            correctAnswer: 1,
            explanation: "Greedy works when the greedy-choice property and optimal substructure hold."
          }
        ]
      }
    ]
  },
  {
    title: "Dynamic Programming",
    description: "Optimize with memoization & tabulation",
    color: "#14B8A6",
    totalXp: 1000,
    unlockRequirement: 6000,
    modules: [
      {
        title: "DP Concepts",
        description: "Memoization vs Tabulation",
        content: `# Dynamic Programming\nDynamic Programming solves problems with overlapping subproblems and optimal substructure. Memoization uses recursion + cache; tabulation fills a table iteratively.`,
        questions: [
          {
            question: "Which property is essential for DP?",
            options: ["Greedy-choice property", "Optimal substructure", "No recursion", "Randomized choices"],
            correctAnswer: 1,
            explanation: "Optimal substructure is required for DP."
          },
          {
            question: "What does memoization do?",
            options: ["Precompute primes", "Cache computed results to avoid recomputation", "Sort data", "Balance a tree"],
            correctAnswer: 1,
            explanation: "Memoization caches function results to speed up repeated calls."
          }
        ]
      }
    ]
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
