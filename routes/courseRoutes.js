import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,   // ✅ add this
  updateCourse,    // ✅ add this
} from "../controllers/courseController.js";
import { protect, instructor } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, instructor, createCourse);
router.get("/", protect, getCourses);

// ✅ Fetch single course
router.get("/:id", protect, getCourseById);

// ✅ Update course
router.put("/:id", protect, instructor, updateCourse);

export default router;
