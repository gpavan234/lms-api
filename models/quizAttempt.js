// models/quizAttempt.js
import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ link to User model
      required: false, // make it optional in case student info is missing
    },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.Mixed, required: true }, 
        selectedOption: { type: Number, required: true },
      },
    ],
    score: { type: Number, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
export default QuizAttempt;
