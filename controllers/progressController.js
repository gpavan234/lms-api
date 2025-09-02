import Enrollment from '../models/enrollment.js';

// @desc Update course progress
// PUT /api/progress/:enrollmentId
// Private (student)
export const updateProgress = async (req, res, next) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findById(req.params.enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // only student who owns enrollment can update
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update progress' });
    }

    enrollment.progress = progress;

    // mark as completed if 100%
    if (progress >= 100) {
      enrollment.completed = true;
    }

    await enrollment.save();
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

// @desc Get student progress for a course
// GET /api/progress/:enrollmentId
// Private (student)
export const getProgress = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.enrollmentId)
      .populate('course', 'title')
      .populate('student', 'name email');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view progress' });
    }

    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

export const getUserProgress = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id })
      .populate('quiz', 'title');

    const totalScore = attempts.reduce((acc, item) => acc + item.score, 0);

    res.json({
      totalQuizzes: attempts.length,
      totalScore,
      attempts
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};