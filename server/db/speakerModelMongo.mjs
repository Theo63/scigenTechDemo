import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	// Define schemma from mongoose for no SQL db
	name: {
		type: String,
		required: true,
	},
	bio: String,

	email: {
		type: String,
		required: true,
		unique: true,
	},
	topic: {
		type: String,
		required: true,
	},

	description: String,

	date: {
		type: Date,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	location: String,
});

export default mongoose.model("Speaker", speakerSchema);
