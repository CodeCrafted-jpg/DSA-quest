import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Assignment } from "@/models/Assignment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Return published assignments only for students
    const assignments = await Assignment.find({ published: true }).select("title description dueAt createdBy questions").lean();

    return NextResponse.json({ success: true, assignments });
  } catch (err) {
    console.error("❌ GET /api/assignments error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, topics, modules, questions, dueAt, published } = body;

    if (!title) return NextResponse.json({ error: "Missing title" }, { status: 400 });

    await connectDB();

    const assignment = await Assignment.create({
      title,
      description,
      topics: topics || [],
      modules: modules || [],
      questions: questions || [],
      dueAt: dueAt ? new Date(dueAt) : undefined,
      createdBy: userId,
      published: !!published,
    });

    return NextResponse.json({ success: true, assignmentId: assignment._id.toString() });
  } catch (err) {
    console.error("❌ POST /api/assignments error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
