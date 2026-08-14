// models/UserProgress.ts
import mongoose, { Schema, model, models } from "mongoose";

export interface IBadge {
  _id?: mongoose.Types.ObjectId;
  name: string;
  icon: string; // Emoji or Lucide icon name
  description?: string;
  unlockedAt?: Date;
}

export interface IXpEntry {
  _id?: mongoose.Types.ObjectId;
  amount: number;
  source: string; // e.g., "module_completion"
  timestamp: Date;
}

export interface ITopicProgress {
  topicId: mongoose.Types.ObjectId;
  progress: number;
  completedModules: mongoose.Types.ObjectId[];
}

export interface IMisconception {
  _id?: mongoose.Types.ObjectId;
  topicTitle: string;
  misconception: string;
  resolved: boolean;
  detectedAt?: Date;
}

export interface ICognitiveProfile {
  learningSpeed: string;
  retentionRate: string;
  predictedMasteryDays: number;
}

export interface IUserProgress {
  _id: mongoose.Types.ObjectId;
  userId: string; // Clerk ID
  email?: string;
  name?: string;
  xp: number;
  level: number;
  streak: number;
  topicProgress: ITopicProgress[];
  xpHistory: IXpEntry[];
  badges: IBadge[];
  misconceptions: IMisconception[];
  cognitiveProfile: ICognitiveProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

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

const MisconceptionSchema = new Schema({
  topicTitle: { type: String, required: true },
  misconception: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  detectedAt: { type: Date, default: Date.now },
});

const UserProgressSchema = new Schema<IUserProgress>(
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
    misconceptions: [MisconceptionSchema],
    cognitiveProfile: {
      learningSpeed: { type: String, default: "Steady" },
      retentionRate: { type: String, default: "Good" },
      predictedMasteryDays: { type: Number, default: 12 },
    },
  },
  { timestamps: true }
);



export const UserProgress =
  (models.UserProgress || model<IUserProgress>("UserProgress", UserProgressSchema)) as mongoose.Model<IUserProgress>;
