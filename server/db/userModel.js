const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	// Define schema for user
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		//[true, 'please enter a pass']: This allows you to
		// customize the error message that Mongoose throws when the required
		//  field is missing. In this case, if the field is missing, Mongoose will
		//  throw an error with the message "please enter a pass".
	},
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
});

module.exports = mongoose.model("User", userSchema);
