import { NextRequest, NextResponse } from "next/server";
import { cohere, SENSEI_SYSTEM_PROMPT, COHERE_MODEL } from "@/lib/cohere";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }

        const response = await cohere.chat({
            model: COHERE_MODEL,
            message: messages[messages.length - 1].content,
            chatHistory: messages.slice(0, -1).map((m: any) => ({
                role: m.role === "user" ? "USER" : "CHATBOT",
                message: m.content,
            })),
            preamble: SENSEI_SYSTEM_PROMPT,
        });

        return NextResponse.json({
            content: response.text
        });
    } catch (error: any) {
        console.error("Cohere API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to get AI response" },
            { status: 500 }
        );
    }
}
