import express from "express";
const router = express.Router();
import {
	registerUser,
	loginUser,
	getUserProfile,
} from "../../controllers/userController.mjs";

import { protect } from "../../middleware/authMiddleware.mjs";

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile

export default router;
