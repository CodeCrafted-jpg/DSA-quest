// app/api/auth/sync/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/UserProgress";

export async function POST() {
  try {
    await connectDB();

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: "User not found in Clerk" }, { status: 404 });
    }

    // Extract info
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    // Check if user already exists
    let user = await UserProgress.findOne({ userId });

    if (!user) {
      // Create new user entry
      user = await UserProgress.create({
        userId,
        email,
        name,
        xp: 0,
        level: 1,
        streak: 0,
        topicProgress: [],
      });

      console.log(`✅ New user synced to MongoDB: ${name || email}`);
    } else {
      // Update name/email if they changed
      await UserProgress.updateOne(
        { userId },
        { $set: { name, email } }
      );
    }

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    console.error("Error syncing user:", err);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
