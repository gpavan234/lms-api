import express from "express";
import { createCourse, getCourses, getCourse } from "../controllers/courseController.js";
import { protect, instructor, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getCourses);
router.get("/:id", getCourse);

// Private (Instructor/Admin only)
router.post("/", protect, instructor, createCourse);

export default router;
