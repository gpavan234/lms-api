import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register new user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

// Get profile (protected)
router.get("/profile", protect, getUserProfile);

export default router;
