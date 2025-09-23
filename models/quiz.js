import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
 course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  description: { type: String },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true },
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
