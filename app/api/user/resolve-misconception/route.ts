import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { misconceptionId } = await req.json();
    if (!misconceptionId) {
      return NextResponse.json({ error: "Misconception ID is required" }, { status: 400 });
    }

    await connectDB();

    const user = await UserProgress.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Locate the misconception in subdocument array
    const mc = (user.misconceptions as any).id(misconceptionId);
    if (!mc) {
      return NextResponse.json({ error: "Misconception not found" }, { status: 404 });
    }

    if (!mc.resolved) {
      mc.resolved = true;
      
      // Award 25 XP
      user.xp = (user.xp || 0) + 25;
      user.xpHistory.push({
        amount: 25,
        source: "misconception_resolution",
        timestamp: new Date()
      });

      // Level up logic (1000 XP per level)
      const nextLevelXp = user.level * 1000;
      if (user.xp >= nextLevelXp) {
        user.level += 1;
      }

      await user.save();
    }

    return NextResponse.json({ success: true, xp: user.xp, level: user.level });
  } catch (error: any) {
    console.error("Resolve misconception error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
