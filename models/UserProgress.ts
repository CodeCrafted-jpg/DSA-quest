// models/UserProgress.ts
import mongoose, { Schema, model, models } from "mongoose";

const BadgeSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Emoji or Lucide icon name
  description: String,
  unlockedAt: { type: Date, default: Date.now },
});

const XpEntrySchema = new Schema({
  amount: { type: Number, required: true },
  source: { type: String, required: true }, // e.g., "module_completion"
  timestamp: { type: Date, default: Date.now },
});


const TopicProgressSchema = new Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  progress: { type: Number, default: 0 },
  completedModules: [{ type: mongoose.Schema.Types.ObjectId }], // IDs of completed modules
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
    xpHistory: [XpEntrySchema],
    badges: [BadgeSchema],
  },
  { timestamps: true }
);



export const UserProgress =
  models.UserProgress || model("UserProgress", UserProgressSchema);
