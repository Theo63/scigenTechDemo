const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		const dbconnection = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected: ${dbconnection.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		throw error;
	}
};

module.exports = dbConnection;
