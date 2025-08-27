import express from 'express';
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from '../controllers/courseController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Private (instructor/admin)
router.post('/', protect, authorizeRoles('instructor', 'admin'), createCourse);
router.route('/')
  .get(getCourses)
  .post(protect, authorizeRoles('instructor', 'admin'), createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, authorizeRoles('instructor', 'admin'), updateCourse)
  .delete(protect, authorizeRoles('instructor', 'admin'), deleteCourse);

export default router;
