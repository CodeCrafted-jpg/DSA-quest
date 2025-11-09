
// app/api/topics/route.ts
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Topic } from "@/models/Topics";
import { UserProgress } from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1️⃣ Connect to Mongo
    await connectDB();

    // 2️⃣ Authenticate user
    const { userId } = await auth();

    // 3️⃣ Fetch all topics
    const topics = await Topic.find().lean();

    // 4️⃣ Default fallback for guests
    let progressMap: Record<string, number> = {};
    let userXp = 0;

    // 5️⃣ If user is logged in, get their progress
    if (userId) {
      const user = await UserProgress.findOne({ userId }).lean();

      if (user) {
        userXp = user.xp || 0;
        if (user.topicProgress) {
          for (const topic of user.topicProgress) {
            if (topic.topicId) {
              progressMap[topic.topicId.toString()] = topic.progress;
            }
          }
        }
      }
    }

    // 6️⃣ Merge topics + progress + unlock logic
    const result = topics.map((t) => {
      const progress = progressMap[t._id.toString()] || 0;
      const unlocked = !t.unlockRequirement || userXp >= t.unlockRequirement;

      return {
        id: t._id.toString(),
        title: t.title,
        description: t.description,
        color: t.color,
        progress,
        unlocked,
        requiredXp: t.unlockRequirement,
      };
    });

    // 7️⃣ Return as JSON
    return NextResponse.json({ topics: result }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
