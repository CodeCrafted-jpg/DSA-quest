import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Assignment } from "@/models/Assignment";
import { UserProgress } from "@/models/UserProgress";

export async function POST(req: Request) {
  try {
    const { questionId } = await req.json();
    if (!questionId) return NextResponse.json({ error: "Missing questionId" }, { status: 400 });

    await connectDB();

    // Find assignments containing the question
    const assignments = await Assignment.find({ 'questions._id': questionId }).lean();
    const userIds = new Set<string>();

    assignments.forEach((a: any) => {
      (a.results || []).forEach((r: any) => {
        (r.answers || []).forEach((ans: any) => {
          const qid = ans.questionId?.toString?.() || ans.questionId;
          if (qid === questionId && ans.correct === false) {
            userIds.add(r.userId);
          }
        });
      });
    });

    // For demo: lookup user emails from UserProgress and return count; in real app, you would send notifications
    const users = await UserProgress.find({ userId: { $in: Array.from(userIds) } }).select('userId email name').lean();
    const messaged = users.length;

    // TODO: integrate real messaging (email/Clerk notifications)

    return NextResponse.json({ success: true, messaged, users });
  } catch (error) {
    console.error('Message hotspot error', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
