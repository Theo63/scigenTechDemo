require("dotenv").config(); // Load environment variables from .env file
// i installed dotenv package to load environment variables from a .env file
// .env file is a simple text file that contains key-value pairs of environment variables.
// i manually created .env file in the root directory of the project

module.exports = {
	PORT: process.env.PORT || 3000,
	MONGODB_URI: process.env.MONGODB_URI,
	NODE_ENV: process.env.NODE_ENV || "development",
};
