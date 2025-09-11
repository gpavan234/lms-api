import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  submitQuiz,
  getQuizAttempts,
} from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Instructor creates quiz
router.post("/", protect, createQuiz);

// Get all quizzes
router.get("/", protect, getQuizzes);

// Get single quiz
router.get("/:id", protect, getQuiz);

// Update quiz
router.put("/:id", protect, updateQuiz);

// Submit quiz
router.post("/:id/submit", protect, submitQuiz);

// Get quiz attempts (student)
router.get("/attempts/me", protect, getQuizAttempts);

export default router;
