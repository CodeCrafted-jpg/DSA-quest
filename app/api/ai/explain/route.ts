import { NextRequest, NextResponse } from "next/server";
import { cohere, QUIZ_EXPLANATION_PROMPT, COHERE_MODEL } from "@/lib/cohere";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { UserProgress } from "@/models/UserProgress";

export async function POST(req: NextRequest) {
    try {
        const { question, userChoice, correctChoice, options, topicTitle } = await req.json();

        const prompt = `
Question: ${question}
Options: ${options.join(", ")}
Student's Incorrect Choice: ${userChoice}
Correct Choice: ${correctChoice}

You are a helpful DSA tutor. Produce a JSON object with the following keys:
- "diagnosis": one-sentence explanation why the student's choice is incorrect (concise).
- "correction": one-sentence hint that points to the correct logic (do not give full solution).
- "followUpQuestion": a single targeted follow-up question the student can try next (include expected answer index if applicable).
- "nextAction": one concrete learning action (e.g., "Review array indexing section in module X" or "Try the provided example with edge cases").

Return ONLY valid JSON. Keep each text field under 40 words.
`;

        const response = await cohere.chat({
            model: COHERE_MODEL,
            message: prompt,
            preamble: QUIZ_EXPLANATION_PROMPT,
        });

        // Try to parse JSON from the model output. If parsing fails, return raw text as a fallback.
        let parsed: any = null;
        try {
            parsed = JSON.parse(response.text);
        } catch (e) {
            // attempt to extract JSON substring if model wrapped text
            const match = response.text.match(/\{[\s\S]*\}/);
            if (match) {
                try { parsed = JSON.parse(match[0]); } catch (_) { parsed = null; }
            }
        }

        if (parsed) {
            try {
                const { userId } = await auth();
                if (userId && parsed.diagnosis) {
                    await connectDB();
                    // Log the misconception in the database
                    await UserProgress.updateOne(
                        { userId },
                        {
                            $push: {
                                misconceptions: {
                                    topicTitle: topicTitle || "General",
                                    misconception: parsed.diagnosis,
                                    resolved: false,
                                    detectedAt: new Date()
                                }
                            }
                        }
                    );
                }
            } catch (dbErr) {
                console.error("Failed to log misconception to DB:", dbErr);
            }

            return NextResponse.json(parsed);
        }

        return NextResponse.json({ explanation: response.text });
    } catch (error: any) {
        console.error("Cohere Explain Error:", error);
        return NextResponse.json(
            { error: "Failed to generate AI explanation" },
            { status: 500 }
        );
    }
}
