
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Topic } from "@/models/Topics";
import { UserProgress } from "@/models/UserProgress";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { topicId: string } }
) {
    try {
        const { topicId } = await params;
        await connectDB();
        const { userId } = await auth();

        const topic = await Topic.findById(topicId).lean();

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        let completedModules: string[] = [];
        if (userId) {
            const user = await UserProgress.findOne({ userId }).lean();
            if (user && user.topicProgress) {
                const progress = user.topicProgress.find(
                    (p: any) => p.topicId.toString() === topicId
                );
                if (progress) {
                    completedModules = progress.completedModules?.map((id: any) => id.toString()) || [];
                }
            }
        }

        // Mark modules as completed in the response
        const modulesWithStatus = topic.modules?.map((m: any) => ({
            ...m,
            id: m._id.toString(),
            isCompleted: completedModules.includes(m._id.toString()),
        })) || [];

        return NextResponse.json({
            topic: {
                ...topic,
                id: topic._id.toString(),
                modules: modulesWithStatus,
            }
        });
    } catch (error) {
        console.error("❌ Error fetching topic details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
