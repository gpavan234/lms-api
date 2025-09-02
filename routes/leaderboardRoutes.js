import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only admin/teacher can see full leaderboard
router.get('/', protect, authorizeRoles('admin'), getLeaderboard);

export default router;
