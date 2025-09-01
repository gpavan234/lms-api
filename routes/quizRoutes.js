import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { createQuiz, getQuiz, submitQuiz, getQuizAttempts } from '../controllers/quizController.js';

const router = express.Router();

// Instructor creates quiz
router.post('/', protect, authorizeRoles('admin'), createQuiz);

// Student & Instructor can get quiz
router.get('/:id', protect, getQuiz);

// Student submits quiz attempt
router.post('/:id/submit', protect, authorizeRoles('admin'), submitQuiz);

// Student gets their quiz attempts
router.get('/attempts/admin', protect, authorizeRoles('admin'), getQuizAttempts);

export default router;
