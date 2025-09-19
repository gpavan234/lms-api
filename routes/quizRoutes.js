// routes/quizRoutes.js
import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  submitQuiz,
  getQuizAttempts,
} from "../controllers/quizController.js";

import { protect,authorizeRoles, instructor, student } from "../middleware/authMiddleware.js";


const router = express.Router();  

// ✅ Public for students & instructors
router.get("/", protect, getQuizzes);
router.get("/:id", protect, getQuiz);

// ✅ Instructor/Admin only
router.post("/", protect, instructor, createQuiz); 
router.put("/:id", protect, authorizeRoles("instructor", "admin"), updateQuiz);

// ✅ Student only
router.post("/:id/submit", protect, submitQuiz);
router.get("/attempts", protect, authorizeRoles("student"), getQuizAttempts);

export default router;
