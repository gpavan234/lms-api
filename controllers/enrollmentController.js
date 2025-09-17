import Enrollment from '../models/enrollment.js';
import Course from "../models/course.js";

// @desc Enroll student in a course
// POST /api/enrollments/:courseId
// Private (student)
export const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // check if already enrolled
    const already = await Enrollment.findOne({
      course: course._id,
      student: req.user._id,
    });
    if (already) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = await Enrollment.create({
      course: course._id,
      student: req.user._id,
    });

    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

// @desc Get student’s enrolled courses
// GET /api/enrollments/my
// Private (student)
export const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course', 'title description category price')
      .populate('student', 'name email');
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

// @desc Get enrollments for a course (instructor/admin)
// GET /api/enrollments/course/:courseId
// Private
export const getCourseEnrollments = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // only owner instructor or admin
    if (
      req.user.role !== 'admin' &&
      course.instructor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to view enrollments' });
    }

    const enrollments = await Enrollment.find({ course: course._id })
      .populate('student', 'name email role');

    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};
