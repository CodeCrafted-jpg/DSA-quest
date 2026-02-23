// models/Topic.ts
import mongoose, { Schema, model, models } from "mongoose";

const MCQSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option
  explanation: String,
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  content: { type: String, required: true }, // Markdown theory content
  questions: [MCQSchema],
});

const TopicSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    color: { type: String, default: "#10B981" },
    totalXp: { type: Number, default: 500 },
    unlockRequirement: { type: Number, default: 0 },
    modules: [ModuleSchema],
  },
  { timestamps: true }
);

export const Topic = models.Topic || model("Topic", TopicSchema);

