import express from 'express';
import { createCourse, getCourses, getCourseById } from '../controllers/courseController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Private (instructor/admin)
router.post('/', protect, authorizeRoles('instructor', 'admin'), createCourse);

export default router;
