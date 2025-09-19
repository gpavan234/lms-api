import asyncHandler from "express-async-handler";
import Course from "../models/course.js";

// @desc    Create a new course (Instructor/Admin only)
// @route   POST /api/courses
// @access  Private
export const createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor: req.user._id, // ✅ assign logged in instructor
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};


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


export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// @desc Update course
// PUT /api/courses/:id
// Private (instructor)
export const updateCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // only the instructor or admin can update
    if (
      req.user.role !== "admin" &&
      course.instructor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.title = title || course.title;
    course.description = description || course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    next(err);
  }
};