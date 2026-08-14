# Adaptive Teacher Assignments — Implementation Plan

Summary
- Feature: Teacher-created adaptive assignments that auto-generate question sets from existing topics, auto-grade submissions, and return student-facing AI feedback and remediation paths.
- Why it stands out: combines teacher control + adaptive student experience + AI feedback for scalable assessment — great for hackathon judges.

Goals
- Allow teachers to create an assignment (select topics, difficulty, due date, target XP).
- Auto-generate an adaptive question set per student using existing modules and the `/api/ai/generate-question` endpoint.
- Auto-grade MCQs and record results in `UserProgress` + assignment entity.
- Provide AI-generated personalized feedback and 1–2 targeted follow-up questions for each incorrect answer.

User Stories
- As a teacher, I can create and publish an assignment tied to topics and a date range.
- As a student, I receive an assignment with questions tailored to my current skill level.
- As a teacher, I can view class performance (avg score, weak topics) in the teacher dashboard.

High-level Design
- DB: Add `Assignment` model (title, topics[], modules[], questions[], dueAt, createdBy, published, results[]). Results store `userId, score, answers[], feedback[]`.
- API: CRUD for assignments: `POST /api/assignments`, `GET /api/assignments/:id`, `POST /api/assignments/:id/submit` (auto-grade + persist), `GET /api/assignments/:id/results` (teacher view).
- AI: Reuse `lib/cohere.ts` and `/api/ai/generate-question` to generate follow-ups and explanatory feedback via `/api/ai/explain` per wrong answer.
- Frontend: New teacher UI under `/dashboard/teacher/assignments` for creating/publishing and viewing metrics; student view under `/dashboard/assignments` and per-assignment attempt UI using existing `QuizCard` components.

Implementation Steps (phased)
1) Data model (1 day)
  - Add `models/Assignment.ts` with schema and migration note.
2) Backend routes (1.5 days)
  - Implement `POST /api/assignments` (create), `GET /api/assignments`, `GET /api/assignments/:id`, `POST /api/assignments/:id/submit` (grading + feedback). Unit-test core logic.
3) Question generation integration (1 day)
  - When publishing, generate a baseline question set from topic modules; per-student adapt at assignment fetch time using `lib/adaptive.ts` + `generate-question` if needed.
4) Frontend UIs (2 days)
  - Teacher: create assignment form, list, results panel (charts: avg score, weak topics).
  - Student: assignment list, attempt flow using `QuizCard` with submit flow to `submit` API.
5) Teacher dashboard integration & metrics (0.5 day)
  - Add class-level aggregates (avg, pass rate, problem hotspots) into `/dashboard/teacher`.
6) Polish & Demo (1 day)
  - Add acceptance tests, seed one sample assignment, and update README_DEMO.md with demo steps.

Estimates (total ≈ 7 days, can scope down to 3 days for a minimum viable subset: create model + publish endpoint + simple attempt UI + auto-grade basic MCQs).

Acceptance Criteria (MVP)
- Teachers can create and publish an assignment referencing topics.
- Students can fetch and attempt an assignment; submissions are auto-graded and persisted.
- Teacher results page shows class average and list of students with scores.
- AI feedback visible for incorrect answers (at least plain-text; structured JSON optional).

Risks & Notes
- Ensure rate limits/latency of AI endpoints — generate question and explain calls should be batched or deferred (background job) for scale.
- Authentication/authorization: only teachers (Clerk role) can create assignments and view results; students only submit their own results.
- Data retention & privacy: store minimal feedback; consider truncating AI outputs if large.

Next steps (if approved)
- I can break the MVP into smaller PR-sized tasks and implement the model + endpoints first. Tell me if you want the trimmed 3-day MVP instead of full feature.

---
Files to add/modify (suggested)
- `models/Assignment.ts` (new)
- `app/api/assignments/route.ts` (+ subroutes)
- `app/dashboard/teacher/assignments/page.tsx` (teacher UI)
- `app/dashboard/assignments/page.tsx` (student list)
- `app/dashboard/assignments/[id]/page.tsx` (attempt UI)
- Update `scripts/seedTopics.ts` to add a sample assignment for demo
