Project snapshot

The repository is a Next.js TypeScript app focused on a learning platform (challenges, modules, progress, leaderboard). Key items:

- Frontend pages & flows: app pages and nested routes under app/(root)/challenges for topics and modules.
- Components: components/AISensei.tsx, components/challenges/ModuleView.tsx, QuizCard, ProgressBar and others under components/challenges.
- APIs & backend logic: api/ai/chat/route.ts, api/ai/explain/route.ts, api/topics/route.ts, api/progress/complete-module/route.ts.
- Data & libs: lib/db.ts, lib/cohere.ts, models/Topics.ts, models/UserProgress.ts, scripts/seedTopics.ts.

Strengths

- Clear end-to-end structure for challenge flows and progress tracking.
- Existing AI endpoints and an AISensei component to extend for personalized feedback.
- Data models + seed script allow quick demo preparation.

Gaps / Risks (with submission tomorrow)

- No full adaptive-learning pipeline implemented yet (personalized paths + difficulty adjustment).
- Auto-question generation and deep answer analysis may be incomplete.
- Teacher analytics/dashboard is missing or minimal.
- Demo flow may require seeding and UX polish to run reliably during presentation.

Prioritized hackathon features (essential, ordered)

1. Demo flow (must-have): a repeatable path showing topic selection → AI question → answer analysis → adaptive next step → completion + leaderboard update.
2. AI explanation polish: ensure api/ai/explain/route.ts and components/AISensei.tsx produce diagnosis + next-action guidance.
3. Minimal adaptive difficulty: streak-based difficulty adjuster to pick easier/harder questions.
4. Scoped auto-question generation: generate 1 follow-up question per wrong answer (limited to one topic for reliability).
5. Module completion persistence: validate and fix api/progress/complete-module/route.ts so leaderboard and progress update.
6. Lightweight teacher dashboard: one page aggregating completion rates and weak topics (server-side aggregation).
7. Polish + README: clear run/demo steps, seeded demo user.

Implementation plan (step-by-step with files, estimates, and acceptance)

1) Prepare demo data and seed (30–45m)
- What: Verify scripts/seedTopics.ts and add scripts/seedDemoUser.ts to create a demo user with mixed progress and scores.
- Files: scripts/seedTopics.ts, new scripts/seedDemoUser.ts
- Acceptance: Visiting the app with seeded data shows one demo user and prefilled progress for at least two topics.

2) Harden AI explanation endpoint (45–75m)
- What: Update api/ai/explain/route.ts prompt templates to request: error diagnosis, one-sentence correction, 1 targeted follow-up question, and a suggested learning step.
- Files: api/ai/explain/route.ts, components/AISensei.tsx
- Acceptance: For a wrong answer, AISensei displays diagnosis + concrete next activity and a follow-up question.

3) Implement minimal adaptive difficulty (60–90m)
- What: Add lib/adaptive.ts implementing a simple rule: look at last 3 answers → if 3 correct, increment difficulty by 1; if 2+ wrong, decrement by 1; clamp boundaries.
- Files: lib/adaptive.ts, integrate in components/challenges/ModuleView.tsx and/or server selection (api/topics/[topicId]/route.ts if present).
- Acceptance: Question difficulty visibly changes after correct/wrong streaks during the demo.

4) Scoped auto-question generation (45–60m)
- What: Add api/ai/generate-question/route.ts which returns a single follow-up question and an expected answer. Limit generation to one seed topic in UI (e.g., arrays/linked-lists sample topic).
- Files: api/ai/generate-question/route.ts, components/challenges/QuizCard.tsx (UI button to request generated question)
- Acceptance: Clicking "Generate follow-up" returns a stable question and answer for judges to try.

5) Ensure module completion persistence & leaderboard update (30–45m)
- What: Verify api/progress/complete-module/route.ts updates UserProgress model; add server-side leaderboard recompute in api/leaderboard/route.ts if needed.
- Files: api/progress/complete-module/route.ts, models/UserProgress.ts, api/leaderboard/route.ts
- Acceptance: Completing a module updates the progress UI and reflects on the LeaderBoard component.

6) Lightweight teacher dashboard (30–60m)
- What: Add a page app/(root)/dashboard/page.tsx or a new route under app/dashboard to render aggregated metrics from the DB (completion rate, average score per topic, weak-topic list).
- Files: app/(root)/dashboard/page.tsx (or existing dashboard updated), API aggregation route if needed (api/dashboard/metrics/route.ts)
- Acceptance: Dashboard loads with aggregated metrics seeded from demo data.

7) Polish, README, and demo script (30–45m)
- What: Add README with exact demo steps and sample script/commands for seeding and running. Ensure the UI shows clear demo prompts and a short script for the presenter.
- Files: README.md (top-level update), optionally new README_DEMO.md or update new_features/hackathon_submission_plan.md.
- Acceptance: A reviewer can follow README and run the demo in ~10 minutes.

Total estimated time: ~4–6 hours (focused, with most time on AI prompt tuning and adaptive logic).

Quick technical notes & implementation tips

- Reuse existing AI lib lib/cohere.ts to call the model; keep prompts deterministic by setting temperature low for demo stability.
- For adaptive difficulty, prefer deterministic heuristics (streak-based or average recent score) rather than learning models — easier to test.
- For the dashboard, server-side aggregation via existing DB helper in lib/db.ts will be fastest.
- Add feature flags or query params to enable/disable demo scaffolding so you don't ship seeded demo users to production inadvertently.

Next steps I will take if you want me to proceed now

1. Implement demo-seed script and AI explanation prompt changes.
2. Implement minimal adaptive difficulty and hook into ModuleView.
3. Implement scoped auto-question generation and wire UI.

If you'd like I can start implementing items 1–3 now and open a follow-up PR with changes and a short test checklist for running the demo.
