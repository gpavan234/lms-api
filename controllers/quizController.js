import Quiz from "../models/quiz.js";
import QuizAttempt from "../models/quizAttempt.js";

// ✅ Create quiz (Instructor only)
export const createQuiz = async (req, res, next) => {
  try {
    const { title, questions, courseId, description } = req.body;

    const quiz = await Quiz.create({
      course: courseId,
      instructor: req.user._id,
      description,
      title,
      questions,
    });

    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

// ✅ Get all quizzes
export const getQuizzes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().populate("course", "title description");
    res.json(quizzes);
  } catch (err) {
    next(err);
  }
};

// ✅ Get single quiz
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("course", "title description"); // for course fields

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz); // quiz already includes quiz.description
  } catch (err) {
    next(err);
  }
};


// ✅ Update quiz
export const updateQuiz = async (req, res, next) => {
  try {
    const { title, questions, courseId, description } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // ✅ Check if the logged-in user is the instructor
    if (quiz.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to update this quiz" });
    }

    // update fields
    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    quiz.course = courseId || quiz.course;
    quiz.questions = questions || quiz.questions;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (err) {
    next(err);
  }
};

// ✅ Submit quiz attempt (Student)
// controllers/quizController.js

export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    answers.forEach((ans) => {
      // Find question either by array index or ObjectId
      const question =
        quiz.questions[ans.questionId] ||
        quiz.questions.id(ans.questionId);

      if (question && question.correctAnswer === ans.selectedOption) {
        score++;
      }
    });

    // ✅ Create attempt with student if logged in
    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      student: req.user?._id || null, // <-- saves user ID if available
      answers,
      score,
      completed: true,
    });

    res.status(201).json({
      message: "Quiz submitted successfully",
      attempt,
      totalQuestions: quiz.questions.length,
      score,
    });
  } catch (err) {
    console.error("Submit quiz error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};



// ✅ Get quiz attempts by student
export const getQuizAttempts = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user._id })
      .populate("quiz", "title description");

    res.json(attempts);
  } catch (err) {
    next(err);
  }
};
