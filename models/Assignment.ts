import mongoose, { Schema, model, models } from "mongoose";

const AnswerSchema = new Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId },
  selectedIndex: { type: Number },
  correct: { type: Boolean },
  feedback: { type: String }, // AI feedback for this answer
});

const ResultSchema = new Schema({
  userId: { type: String, required: true }, // Clerk user id
  score: { type: Number, required: true },
  answers: [AnswerSchema],
  submittedAt: { type: Date, default: Date.now },
});

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number },
  difficulty: { type: String },
  sourceModuleId: { type: mongoose.Schema.Types.ObjectId },
});

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    modules: [{ type: mongoose.Schema.Types.ObjectId }],
    questions: [QuestionSchema],
    dueAt: { type: Date },
    createdBy: { type: String }, // Clerk user id of teacher
    published: { type: Boolean, default: false },
    results: [ResultSchema],
  },
  { timestamps: true }
);

// NOTE: Migration
// If you already seeded topics and want to add assignments, create assignments
// programmatically or via the `/api/assignments` endpoint. No schema migrations
// are required for existing collections unless you rely on new fields in code.

export const Assignment = models.Assignment || model("Assignment", AssignmentSchema);

export default Assignment;
