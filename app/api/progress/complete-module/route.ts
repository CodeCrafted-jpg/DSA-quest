
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Topic } from "@/models/Topics";
import { UserProgress } from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { topicId, moduleId } = await req.json();

        if (!topicId || !moduleId) {
            return NextResponse.json({ error: "Missing topicId or moduleId" }, { status: 400 });
        }

        await connectDB();

        // 1. Get Topic to check module count
        const topic = await Topic.findById(topicId);
        if (!topic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });

        // 2. Add module to completedModules in UserProgress
        let user = await UserProgress.findOne({ userId });
        if (!user) {
            user = await UserProgress.create({ userId, xp: 0, level: 1 });
        }

        let topicProgress = user.topicProgress.find(
            (p: any) => p.topicId.toString() === topicId
        );

        if (!topicProgress) {
            user.topicProgress.push({ topicId, progress: 0, completedModules: [moduleId] });
            topicProgress = user.topicProgress[user.topicProgress.length - 1];
        } else {
            // Already initialized, just push if not present
            const compIds = topicProgress.completedModules.map((id: any) => id.toString());
            if (!compIds.includes(moduleId.toString())) {
                topicProgress.completedModules.push(moduleId);
            }
        }



        // 3. Update overall topic progress percentage
        const totalModules = (topic.modules || []).length;
        if (totalModules === 0) {
            // Safety: if topic has no modules, set progress to 100
            topicProgress.progress = 100;
        } else {
            const completedCount = (topicProgress.completedModules || []).length;
            topicProgress.progress = Math.round((completedCount / totalModules) * 100);
        }


        // 4. Award XP (e.g., 50 per module)
        user.xp = (user.xp || 0) + 50;

        // 5. Track XP history for weekly stats
        if (!user.xpHistory) user.xpHistory = [];
        user.xpHistory.push({

            amount: 50,
            source: "module_completion",
            timestamp: new Date()
        });

        // 6. Award Badges
        if (!user.badges) user.badges = [];
        const badgeUpdates: any[] = [];


        // First Module Badge
        if (user.xpHistory.length === 1) {
            const firstBadge = { name: "First Steps", icon: "🚀", description: "Completed your first DSA module!" };
            user.badges.push(firstBadge);
            badgeUpdates.push(firstBadge);
        }

        // Topic Master Badge
        if (topicProgress.progress === 100) {
            const masterBadge = { name: `${topic.title} Master`, icon: "🏆", description: `You've conquered every module in the ${topic.title} topic! Your dedication is legendary.` };

            // Check if already has this badge
            if (!user.badges.some((b: any) => b.name === masterBadge.name)) {
                user.badges.push(masterBadge);
                badgeUpdates.push(masterBadge);
            }
        }

        // Simple level up logic (1000 xp per level)
        user.level = Math.floor(user.xp / 1000) + 1;

        await user.save();

        return NextResponse.json({
            success: true,
            progress: topicProgress.progress,
            xp: user.xp,
            level: user.level,
            newBadges: badgeUpdates
        });
    } catch (error) {
        console.error("❌ Error completing module:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
