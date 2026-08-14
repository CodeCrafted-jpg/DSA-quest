import mongoose from "mongoose";
import dotenv from "dotenv";
import { Assignment } from "../models/Assignment";
import { Topic } from "../models/Topics";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

async function seed() {
  await mongoose.connect(MONGODB_URI, { dbName: "dsaquest" });

  // Pick first topic and its first module/question to create a sample assignment
  const topic = await Topic.findOne().lean();
  if (!topic) {
    console.error("No topics found. Run seedTopics first.");
    process.exit(1);
  }

  const sampleQuestions = [];
  for (const mod of topic.modules || []) {
    if (mod.questions && mod.questions.length > 0) {
      const q = mod.questions[0];
      sampleQuestions.push({ text: q.question, options: q.options, correctIndex: q.correctAnswer, sourceModuleId: mod._id });
      if (sampleQuestions.length >= 5) break;
    }
  }

  if (sampleQuestions.length === 0) {
    console.error("No module questions found in topics. Seed topics with questions first.");
    process.exit(1);
  }

  const assignment = await Assignment.create({
    title: `Intro: ${topic.title} - Sample Assignment`,
    description: `A short sample assignment for ${topic.title}`,
    topics: [topic._id],
    questions: sampleQuestions,
    published: true,
  });

  console.log("Created sample assignment:", assignment._id.toString());
  process.exit(0);
}

seed();
