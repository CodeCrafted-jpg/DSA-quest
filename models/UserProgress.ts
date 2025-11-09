// models/UserProgress.ts
import mongoose, { Schema, model, models } from "mongoose";

const TopicProgressSchema = new Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  progress: { type: Number, default: 0 },
});

const UserProgressSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true }, // Clerk ID
    email: { type: String },
    name: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    topicProgress: [TopicProgressSchema],
  },
  { timestamps: true }
);

export const UserProgress =
  models.UserProgress || model("UserProgress", UserProgressSchema);
