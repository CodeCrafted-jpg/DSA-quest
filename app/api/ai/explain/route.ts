import { NextRequest, NextResponse } from "next/server";
import { cohere, QUIZ_EXPLANATION_PROMPT, COHERE_MODEL } from "@/lib/cohere";

export async function POST(req: NextRequest) {
    try {
        const { question, userChoice, correctChoice, options } = await req.json();

        const prompt = `
Question: ${question}
Options: ${options.join(", ")}
Student's Incorrect Choice: ${userChoice}
Correct Choice: ${correctChoice}

Explain why the student's choice is wrong and guide them to the correct logic.
`;

        const response = await cohere.chat({
            model: COHERE_MODEL,
            message: prompt,
            preamble: QUIZ_EXPLANATION_PROMPT,
        });

        return NextResponse.json({
            explanation: response.text
        });
    } catch (error: any) {
        console.error("Cohere Explain Error:", error);
        return NextResponse.json(
            { error: "Failed to generate AI explanation" },
            { status: 500 }
        );
    }
}
