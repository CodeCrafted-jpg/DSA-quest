import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Assignment } from "@/models/Assignment";
import { UserProgress } from "@/models/UserProgress";
import { Topic } from "@/models/Topics";
import { NextResponse } from "next/server";
import { gradeAnswers } from "@/lib/assignmentUtils";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await connectDB();

    const assignment = await Assignment.findById(id).lean();
    if (!assignment) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Do not expose answers' correctIndex to students
    const safe = { ...assignment } as any;
    if (!safe.createdBy) safe.createdBy = null;
    if (safe.questions) {
      safe.questions = safe.questions.map((q: any) => ({
        _id: q._id,
        text: q.text,
        options: q.options,
        difficulty: q.difficulty,
        sourceModuleId: q.sourceModuleId,
      }));
    }

    return NextResponse.json({ success: true, assignment: safe });
  } catch (err) {
    console.error("❌ GET /api/assignments/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { answers } = body; // answers: [{ questionId, selectedIndex }]
    if (!Array.isArray(answers)) return NextResponse.json({ error: "Invalid answers" }, { status: 400 });

    await connectDB();

    const assignment = await Assignment.findById(id);
    if (!assignment) return NextResponse.json({ error: "Assignment not found" }, { status: 404 });

    // Grade using shared utility
    const grading = gradeAnswers(assignment.questions as any, answers as any);
    const { score, correctCount, details } = grading;

    // Persist result on assignment
    assignment.results.push({ userId, score, answers: details, submittedAt: new Date() } as any);
    await assignment.save();

    // Update UserProgress: award XP (10 xp per correct)
    let user = await UserProgress.findOne({ userId });
    if (!user) {
      user = await UserProgress.create({ userId, xp: 0, level: 1 });
    }
    const gained = (correctCount || 0) * 10;
    user.xp = (user.xp || 0) + gained;
    if (!user.xpHistory) user.xpHistory = [];
    user.xpHistory.push({ amount: gained, source: "assignment", timestamp: new Date() } as any);
    user.level = Math.floor(user.xp / 1000) + 1;
    await user.save();

    return NextResponse.json({ success: true, score, gained, details: detailed });
  } catch (err) {
    console.error("❌ POST /api/assignments/[id] submit error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
