// scripts/seedDemoUser.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserProgress } from "../models/UserProgress";
import { Topic } from "../models/Topics";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI in .env");
}

const seed = async () => {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "dsaquest" });

    console.log("🔎 Looking up sample topics...");
    const arrays = await Topic.findOne({ title: "Arrays" });
    const strings = await Topic.findOne({ title: "Strings" });

    const topicProgress: any[] = [];

    if (arrays) {
      const firstModuleId = arrays.modules && arrays.modules[0] ? arrays.modules[0]._id : undefined;
      topicProgress.push({
        topicId: arrays._id,
        progress: 65,
        completedModules: firstModuleId ? [firstModuleId] : [],
      });
    }

    if (strings) {
      const firstModuleId = strings.modules && strings.modules[0] ? strings.modules[0]._id : undefined;
      topicProgress.push({
        topicId: strings._id,
        progress: 40,
        completedModules: firstModuleId ? [firstModuleId] : [],
      });
    }

    const demo = {
      userId: "demo-user",
      email: "demo@local",
      name: "Demo Student",
      xp: 120,
      level: 2,
      streak: 2,
      topicProgress,
      xpHistory: [
        { amount: 50, source: "module_completion" },
        { amount: 70, source: "quiz_performance" },
      ],
      badges: [
        { name: "First Steps", icon: "🥇", description: "Completed first module" },
      ],
    };

    console.log("🧹 Removing existing demo user (if any)...");
    await UserProgress.deleteOne({ userId: demo.userId });

    console.log("🌱 Inserting demo user...");
    const created = await UserProgress.create(demo);

    console.log("✅ Demo user created:", created.userId);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding demo user error:", err);
    process.exit(1);
  }
};

seed();
