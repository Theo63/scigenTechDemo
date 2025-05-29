// filepath: /Users/theodore_papadimitriou/Code/React_Projects/react_api_demo/server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../db/userModel.mjs";

const protect = async (req, res, next) => {
	let token;
	console.log("Protect middleware called");
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
			//Assigns the retrieved user object to the req.user property.
			// making user data accessible in later middleware or route handlers.
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

export { protect };
