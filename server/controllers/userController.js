// @desc Register a new user
// @route POST /api/users/register
// @access Public
const jwt = require("jsonwebtoken");
const User = require("../db/userModel");
const bcrypt = require("bcryptjs");

const tokenGenerator = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

const registerUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Please fill in all fields" });
		}
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create new user
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role: role || "user", // Default to 'user' if no role is provided
		});
		if (newUser) {
			return res.status(201).json({
				_id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
				token: tokenGenerator(newUser._id),
				message: "User created successfully",
			});
		} else {
			return res.status(400).json({ message: "User did not registered " });
		}
		// // Generate JWT token
		// const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
		// 	expiresIn: "1h",
		// });

		// // Set token in response header
		// res.setHeader("Authorization", `Bearer ${token}`);
		// // Send response

		res.json({ message: "User registered successfully" });
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }); // Find user by email from mongoDB model
		if (user && (await bcrypt.compare(password, user.password))) {
			// Check if password matches
			// const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			//     expiresIn: "1h",
			// });
			// res.setHeader("Authorization", `Bearer ${token}`);
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				token: tokenGenerator(user._id),
				message: "User logged in successfully",
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id); // user is sure to be defined because of the protect middleware
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.error("Error retrieving user profile:", error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
};
