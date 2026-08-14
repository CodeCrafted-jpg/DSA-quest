import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Topic } from "@/models/Topics";
import { UserProgress } from "@/models/UserProgress";
import { Assignment } from "@/models/Assignment";

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

    // Compute class average progress across topics
    const overallAvgProgress = topicMetrics.length
      ? Math.round(topicMetrics.reduce((acc: number, cur: any) => acc + cur.avgProgress, 0) / topicMetrics.length)
      : 0;

    // Pass rate: percent of users whose average topic progress (across topics they started) is >= 50
    let passCount = 0;
    users.forEach((u: any) => {
      const progresses = (u.topicProgress || []).map((p: any) => p.progress || 0);
      if (progresses.length === 0) return;
      const avg = progresses.reduce((a: number, b: number) => a + b, 0) / progresses.length;
      if (avg >= 50) passCount += 1;
    });
    const passRate = totalUsers ? Math.round((passCount / totalUsers) * 100) : 0;

    // Problem hotspots: aggregate incorrect answers from assignments
    const assignments = await Assignment.find().lean();
    const questionStats: Record<string, { questionText: string; incorrect: number; attempts: number }> = {};

    assignments.forEach((a: any) => {
      const qMap: Record<string, any> = {};
      (a.questions || []).forEach((q: any) => {
        qMap[q._id?.toString() || q._id] = q;
      });

      (a.results || []).forEach((r: any) => {
        (r.answers || []).forEach((ans: any) => {
          const qid = ans.questionId?.toString?.() || ans.questionId;
          if (!questionStats[qid]) questionStats[qid] = { questionText: qMap[qid]?.text || "(unknown)", incorrect: 0, attempts: 0 };
          questionStats[qid].attempts += 1;
          if (!ans.correct) questionStats[qid].incorrect += 1;
        });
      });
    });

    const problemHotspots = Object.entries(questionStats)
      .map(([qid, s]) => ({ questionId: qid, text: s.questionText, incorrect: s.incorrect, attempts: s.attempts, wrongRate: s.attempts ? Math.round((s.incorrect / s.attempts) * 100) : 0 }))
      .sort((a: any, b: any) => b.wrongRate - a.wrongRate)
      .slice(0, 10);

    return NextResponse.json({ totalUsers, topicMetrics, weakTopics, overallAvgProgress, passRate, problemHotspots }, { status: 200 });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    return NextResponse.json({ error: "Failed to compute metrics" }, { status: 500 });
  }
}
