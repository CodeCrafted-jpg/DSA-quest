import { gradeAnswers } from "../lib/assignmentUtils";

function assertEqual(a: any, b: any, message?: string) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    console.error("Assertion failed:", message || "", { a, b });
    process.exit(1);
  }
}

async function run() {
  const questions = [
    { _id: "q1", text: "Q1", options: ["a", "b"], correctIndex: 0 },
    { _id: "q2", text: "Q2", options: ["a", "b"], correctIndex: 1 },
    { _id: "q3", text: "Q3", options: ["a", "b"], correctIndex: 0 },
  ];

  const answers = [
    { questionId: "q1", selectedIndex: 0 },
    { questionId: "q2", selectedIndex: 0 },
    { questionId: "q3", selectedIndex: 0 },
  ];

  const res = gradeAnswers(questions as any, answers as any);
  console.log("Grade result:", res);

  assertEqual(res.correctCount, 2, "correctCount should be 2");
  assertEqual(res.score, Math.round((2 / 3) * 100), "score should match");

  console.log("All grading tests passed.");
}

run();
