const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	getUserProfile,
} = require("../../controllers/userController");

const { protect } = require("../../middleware/authMiddleware");

router.post("/register", registerUser); // Register a new user
router.post("/login", loginUser); // Login a user
router.get("/profile", protect, getUserProfile); // Get user profile

module.exports = router;
