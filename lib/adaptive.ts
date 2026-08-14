export type Difficulty = "easy" | "medium" | "hard";

/**
 * Compute next difficulty level based on recent answers.
 * - If last 3 answers are correct -> increase difficulty (one step)
 * - If last 3 answers contain 2 or more wrong -> decrease difficulty (one step)
 * - Otherwise keep current
 */
export function computeNextDifficulty(recentAnswers: boolean[], current: Difficulty): Difficulty {
  if (!recentAnswers || recentAnswers.length === 0) return current;

  const last3 = recentAnswers.slice(-3);
  const correctCount = last3.filter(Boolean).length;

  if (correctCount >= 3) {
    if (current === "easy") return "medium";
    if (current === "medium") return "hard";
    return "hard";
  }

  const wrongCount = last3.length - correctCount;
  if (wrongCount >= 2) {
    if (current === "hard") return "medium";
    if (current === "medium") return "easy";
    return "easy";
  }

  return current;
}

/** Reorder remaining questions based on difficulty.
 * - easy: keep original order (assumes earlier questions are easier)
 * - medium: keep as-is
 * - hard: reverse remaining questions (assumes later questions are harder)
 */
export function reorderQuestions<T>(questions: T[], difficulty: Difficulty, currentIdx: number): T[] {
  const before = questions.slice(0, currentIdx + 1);
  const remaining = questions.slice(currentIdx + 1);

  let reordered: T[];
  if (difficulty === "hard") reordered = remaining.slice().reverse();
  else reordered = remaining.slice();

  return [...before, ...reordered];
}
