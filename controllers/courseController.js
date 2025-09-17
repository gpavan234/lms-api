import asyncHandler from "express-async-handler";
import Course from "../models/course.js";

// @desc    Create a new course (Instructor/Admin only)
// @route   POST /api/courses
// @access  Private
export const createCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const course = await Course.create({
    title,
    description,
    instructor: req.user._id,
  });

  res.status(201).json(course);
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email role");
  res.json(courses);
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
export const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name email role");

  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }

  res.json(course);
});
