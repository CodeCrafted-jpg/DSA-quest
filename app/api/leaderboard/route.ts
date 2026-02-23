
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        // Fetch top 10 users by XP
        const topUsers = await UserProgress.find()
            .sort({ xp: -1 })
            .limit(10)
            .select("userId name xp level")
            .lean();

        const result = topUsers.map((user, index) => ({
            id: user._id.toString(),
            userId: user.userId,
            name: user.name || `Explorer #${index + 1}`,
            score: user.xp || 0,
            level: user.level || 1,
        }));

        return NextResponse.json({ leaderboard: result }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
        return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
    }
}
