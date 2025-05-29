import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler.mjs";
import dbConnection from "./config/mongoConfig.mjs";
import config from "./config/config.mjs";

// Import routes
// Note: You'll need to update these files to ES Modules too
import speakerRoutes from "./routes/api/speakerRoutes.mjs";
import userRoutes from "./routes/api/userRoutes.mjs";

// const {dropDB} = require('./config/database');

const app = express();
dbConnection();

//middleware
//CORS (Cross-Origin Resource Sharing) in Express.js is a mechanism
// that allows your server to handle requests from different
// origins—such as when your frontend is hosted at one domain
// (e.g., http://localhost:3000) and your backend API is on another
// (e.g., http://localhost:5000).
app.use(cors());
app.use(bodyParser.json());

// Routes
console.log("Setting up routes");
app.use("/api/speakers", speakerRoutes); //this makes the full path
app.use("/api/users", userRoutes);
// localhost:4000/api/speakers and route paths after

// Error handling
//Express processes middleware in the order they're added
//Error handlers should be the last middleware registered
//When next(error) is called, Express skips regular middleware and goes straight to error handlers
app.use(errorHandler);

app.listen(config.PORT, () => {
	console.log(
		`Server running on ${config.NODE_ENV} mode on port ${config.PORT}`
	);
}).on("error", (err) => {
	console.error("Server failed to start:", err.message);
});

//dropDB();
