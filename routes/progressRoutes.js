import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { updateProgress, getProgress, getUserProgress} from '../controllers/progressController.js';

const router = express.Router();

router.put('/:enrollmentId', protect, authorizeRoles('student'), updateProgress);
router.get('/:enrollmentId', protect, authorizeRoles('student'), getProgress);
router.get('/', protect, getUserProgress);
export default router;
