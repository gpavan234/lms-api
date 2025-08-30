import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { updateProgress, getProgress } from '../controllers/progressController.js';

const router = express.Router();

router.put('/:enrollmentId', protect, authorizeRoles('student'), updateProgress);
router.get('/:enrollmentId', protect, authorizeRoles('student'), getProgress);

export default router;
