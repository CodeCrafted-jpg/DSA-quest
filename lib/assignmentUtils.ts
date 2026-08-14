import { Document } from "mongoose";

export interface AnswerInput {
  questionId: string;
  selectedIndex: number;
}

export interface QuestionDoc extends Document {
  _id: any;
  text: string;
  options: string[];
  correctIndex?: number;
}

export function gradeAnswers(questions: QuestionDoc[], answers: AnswerInput[]) {
  const total = questions.length || 1;
  let correctCount = 0;
  const detailed: any[] = [];

  for (const ans of answers) {
    const q = questions.find((x) => x._id.toString() === ans.questionId);
    if (!q) continue;
    const correct = typeof q.correctIndex === "number" && q.correctIndex === ans.selectedIndex;
    if (correct) correctCount++;
    detailed.push({ questionId: q._id.toString(), selectedIndex: ans.selectedIndex, correct, feedback: correct ? "Correct" : "Review the related module content." });
  }

  const score = Math.round((correctCount / total) * 100);
  return { total, correctCount, score, details: detailed };
}

export default gradeAnswers;
