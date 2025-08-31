import Quiz from '../models/quiz.js';
import QuizAttempt from '../models/quizAttempt.js';

// Create quiz (Instructor only)
export const createQuiz = async (req, res, next) => {
  try {
    const { title, questions, courseId } = req.body;

    const quiz = await Quiz.create({
      course: courseId,
      instructor: req.user._id,
      title,
      questions,
    });

    res.status(201).json(quiz);
  } catch (err) {
    next(err);
  }
};

// Get quiz (student + instructor)
export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course', 'title');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.json(quiz);
  } catch (err) {
    next(err);
  }
};

// Submit quiz attempt (Student)
export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // Score calculation
    let score = 0;
    answers.forEach((ans, index) => {
      if (quiz.questions[ans.questionId]?.correctAnswer === ans.selectedOption) {
        score++;
      }
    });

    const attempt = await QuizAttempt.create({
      quiz: quiz._id,
      student: req.user._id,
      answers,
      score,
      completed: true,
    });

    res.status(201).json({ attempt, totalQuestions: quiz.questions.length });
  } catch (err) {
    next(err);
  }
};

// Get student quiz attempts
export const getQuizAttempts = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user._id }).populate('quiz', 'title');
    res.json(attempts);
  } catch (err) {
    next(err);
  }
};
