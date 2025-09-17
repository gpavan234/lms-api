import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String,
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
