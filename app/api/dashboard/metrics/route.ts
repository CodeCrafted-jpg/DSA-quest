import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Topic } from "@/models/Topics";
import { UserProgress } from "@/models/UserProgress";

export async function GET() {
  try {
    await connectDB();

    const topics = await Topic.find().lean();
    const users = await UserProgress.find().lean();

    const totalUsers = users.length;

    const topicMetrics = topics.map((t: any) => {
      const stats = {
        topicId: t._id.toString(),
        title: t.title,
        totalModules: (t.modules || []).length,
        usersStarted: 0,
        avgProgress: 0,
        usersNotStarted: 0,
        usersBelow50: 0,
      } as any;

      let sumProgress = 0;
      users.forEach((u: any) => {
        const tp = (u.topicProgress || []).find((p: any) => p.topicId && p.topicId.toString() === t._id.toString());
        if (tp) {
          stats.usersStarted += 1;
          sumProgress += (tp.progress || 0);
          if ((tp.progress || 0) < 50) stats.usersBelow50 += 1;
        }
      });

      stats.usersNotStarted = totalUsers - stats.usersStarted;
      stats.avgProgress = stats.usersStarted ? Math.round(sumProgress / stats.usersStarted) : 0;

      return stats;
    });

    // Weak topics: lowest avgProgress
    const weakTopics = topicMetrics.slice().sort((a: any, b: any) => a.avgProgress - b.avgProgress).slice(0, 5);

    return NextResponse.json({ totalUsers, topicMetrics, weakTopics }, { status: 200 });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    return NextResponse.json({ error: "Failed to compute metrics" }, { status: 500 });
  }
}
