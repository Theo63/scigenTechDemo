// filepath: /Users/theodore_papadimitriou/Code/React_Projects/react_api_demo/server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../db/userModel");

const protect = async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token
			req.user = await User.findById(decoded.id).select("-password");
			//Assigns the retrieved user object to the req.user property. This is a common convention for making user data accessible in later middleware or route handlers.
			console.log("User from token:", req.user);
			next();
		} catch (error) {
			console.error("Error in protect middleware:", error);
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	}

	if (!token) {
		res.status(401).json({ message: "Not authorized, no token" });
	}
};

module.exports = { protect };
