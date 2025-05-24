const Speaker = require("../db/speakerModelMongo");

// Controller functions for handling
//  requests from the api endpoint
const createSpeaker = async (req, res) => {
	try {
		const speakerData = {
			...req.body,
			user: req.user._id, // Ensure the user field is set to the current user's ID
		};
		const speaker = await Speaker.create(speakerData);
		res.status(201).json(speaker);
	} catch (error) {
		console.error("Error creating speaker:", error);
		res.status(400).json({ message: error.message });
	}
};

const getAllSpeakers = async (req, res, next) => {
	console.log("Fetching all speakers");
	console.log("User ID from request:", req.user); // Log the userId for debugging
	try {
		const user = req.user; // we get the user id from the request object, which is set by the auth middleware
		const speakers = await Speaker.find({ user }).sort({
			date: -1,
		});
		res.json(speakers);
	} catch (error) {
		// res.status(500).json({error: error.message});  this the way to handle error without middleware
		next(error); // we use next to pass the error to the error handling middleware
	}
};

const searchSpeakers = async (req, res, next) => {
	try {
		const user = req.user;
		const { name } = req.query;
		console.log("Search term:", name);
		if (!name) {
			return res.status(400).json({
				message: "Search term is required", //we requre a search term to search
			});
		}
		const speaker = await Speaker.find({
			name: { $regex: name, $options: "i" }, //$regex enables regular expression matching
			user: user._id, // Ensure the search is scoped to the current user
			//$options: 'i' makes the search case-insensitive
		}).sort({ date: -1 });

		// console.log('Search results:', speakers);
		res.json(speaker); //return the search results
	} catch (error) {
		next(error);
	}
};

const deleteSpeaker = async (req, res, next) => {
	try {
		const result = await Speaker.findByIdAndDelete(req.params.id); // all terms create, find, findByIdAndDelete are mongoose methods BUIL
		if (!result) {
			return res.status(404).json({ message: "Speaker not found" });
		}
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createSpeaker,
	getAllSpeakers,
	searchSpeakers,
	deleteSpeaker,
};
