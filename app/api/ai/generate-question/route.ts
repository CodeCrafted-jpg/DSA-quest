import { NextRequest, NextResponse } from "next/server";
import { cohere, QUIZ_EXPLANATION_PROMPT, COHERE_MODEL } from "@/lib/cohere";

export async function POST(req: NextRequest) {
  try {
    const { topicTitle, seedQuestion } = await req.json();

    const prompt = `
You are an expert DSA tutor. Given the topic "${topicTitle}" and the example question: "${seedQuestion}", generate a single, short follow-up multiple-choice question that focuses on the student's likely misconception.

Return a JSON object with keys:
- "question": string
- "options": [string]
- "correctAnswer": number (index)
- "difficulty": "easy" | "medium" | "hard"

Keep text concise (each field under 30 words). Return ONLY valid JSON.
`;

    const response = await cohere.chat({
      model: COHERE_MODEL,
      message: prompt,
      preamble: QUIZ_EXPLANATION_PROMPT,
    });

    let parsed: any = null;
    try {
      parsed = JSON.parse(response.text);
    } catch (e) {
      const match = response.text.match(/\{[\s\S]*\}/);
      if (match) {
        try { parsed = JSON.parse(match[0]); } catch (_) { parsed = null; }
      }
    }

    if (parsed) return NextResponse.json(parsed);

    return NextResponse.json({ error: "AI failed to return structured question", raw: response.text }, { status: 502 });
  } catch (error: any) {
    console.error("Generate Question Error:", error);
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
  }
}
