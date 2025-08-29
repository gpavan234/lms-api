import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import {
  enrollInCourse,
  getMyEnrollments,
  getCourseEnrollments,
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.post('/:courseId', protect, authorizeRoles('student'), enrollInCourse);
router.get('/my', protect, authorizeRoles('student'), getMyEnrollments);
router.get(
  '/course/:courseId',
  protect,
  authorizeRoles('instructor', 'admin'),
  getCourseEnrollments
);

export default router;
