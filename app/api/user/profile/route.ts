
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/UserProgress";
import { Topic } from "@/models/Topics";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const user = await UserProgress.findOne({ userId }).lean();

        if (!user) {
            return NextResponse.json({
                xp: 0,
                level: 1,
                weeklyXp: 0,
                allTimeXp: 0,
                name: "",
                email: ""
            });
        }

        // Calculate Weekly XP (Reset every Sunday 00:00)
        const now = new Date();
        const startOfWeek = new Date();
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);

        const weeklyXp = (user.xpHistory || []).reduce((total: number, entry: any) => {
            const entryDate = new Date(entry.timestamp);
            if (entryDate >= startOfWeek) {
                return total + entry.amount;
            }
            return total;
        }, 0);


        // Last 5 activities
        const recentActivities = user.xpHistory
            ? (user.xpHistory as any[])
                .slice(-5)
                .reverse()
                .map((entry, idx) => ({
                    id: entry._id?.toString() || `act-${idx}`,
                    action: entry.source === "module_completion" ? "Completed a Module" : "Earned XP",
                    date: new Date(entry.timestamp).toLocaleDateString(),
                    xpChange: entry.amount
                }))
            : [];

        // Recommended Modules Logic
        const allTopics = await Topic.find().lean();
        const recommendations: any[] = [];

        for (const t of allTopics) {
            if ((t.unlockRequirement || 0) <= (user.xp || 0)) {
                const userTopicProg = user.topicProgress?.find(
                    (p: any) => p.topicId.toString() === t._id.toString()
                );
                const completedIds = userTopicProg?.completedModules?.map((id: any) => id.toString()) || [];

                const nextModule = t.modules?.find((m: any) => !completedIds.includes(m._id.toString()));
                if (nextModule) {
                    recommendations.push({
                        id: nextModule._id.toString(),
                        title: nextModule.title,
                        topicId: t._id.toString(),
                        topicTitle: t.title,
                        difficulty: "Easy", // Placeholder
                        xp: 50
                    });
                }
            }
            if (recommendations.length >= 3) break;
        }

        // Daily Challenge Logic: Pick a random module they haven't finished
        let dailyChallenge = null;
        const allModules = allTopics.flatMap(t => t.modules.map(m => ({ ...m, topicId: t._id.toString() })));
        const uncompletedModules = allModules.filter(m => {
            const topicProg = user.topicProgress?.find((p: any) => p.topicId.toString() === m.topicId);
            const compIds = topicProg?.completedModules?.map((id: any) => id.toString()) || [];
            return !compIds.includes(m._id.toString());
        });

        if (uncompletedModules.length > 0) {
            dailyChallenge = uncompletedModules[Math.floor(Math.random() * uncompletedModules.length)];
        } else if (allModules.length > 0) {
            dailyChallenge = allModules[Math.floor(Math.random() * allModules.length)];
        }

        return NextResponse.json({
            xp: user.xp || 0,
            level: user.level || 1,
            name: user.name || "Explorer",
            userId: user.userId,
            email: user.email,
            streak: user.streak || 0,
            allTimeXp: user.xp || 0,
            weeklyXp: weeklyXp,
            recentActivities,
            badges: user.badges || [],
            recommendations,
            dailyChallenge: dailyChallenge ? {
                id: (dailyChallenge as any)._id.toString(),
                topicId: (dailyChallenge as any).topicId,
                title: (dailyChallenge as any).title
            } : null
        });
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
