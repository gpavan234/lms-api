import QuizAttempt from '../models/quizAttempt.js';

// @desc   Get leaderboard
// @route  GET /api/leaderboard
// @access Private/Admin
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await QuizAttempt.aggregate([
      {
        $group: {
          _id: "$user",
          totalScore: { $sum: "$score" },
          attempts: { $sum: 1 }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 } // top 10
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
