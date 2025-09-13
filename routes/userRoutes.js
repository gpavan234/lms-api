import express from "express";
import { registerUser, loginUser, getUserProfile, createInstructor } from "../controllers/userController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

// Get profile (protected)
router.get("/profile", protect, getUserProfile);
router.post("/instructor", protect, admin, createInstructor); // admin only

export default router;
