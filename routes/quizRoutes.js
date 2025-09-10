import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  submitQuiz,
  getQuizAttempts,
} from "../controllers/quizController.js";

const router = express.Router();

// Routes
router.post("/", protect, createQuiz);          // instructor create
router.get("/", protect, getQuizzes);           // ✅ all users can view
router.get("/:id", protect, getQuiz);           // view single quiz
router.post("/:id/submit", protect, submitQuiz); // student submit
router.get("/attempts/me", protect, getQuizAttempts); // student attempts

export default router;
