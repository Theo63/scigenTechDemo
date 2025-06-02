import { format } from "date-fns";

export const deleteSpeakerAction = async (speakerId) => {
	try {
		const response = await fetch(
			`http://localhost:4000/api/speakers/${speakerId}`,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request headers
				},
				method: "DELETE",
			}
		);
		if (!response.ok) {
			throw new Error(`Failed to delete speaker (${response.status})`);
		}
	} catch (error) {
		throw new Error(`Error deleting speaker: ${error.message}`);
	}
};

export const fetchSpeakersAction = async () => {
	try {
		const response = await fetch("http://localhost:4000/api/speakers", {
			method: "GET",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request headers
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log("Fetched speakers:"); // Log the fetched speakers for debugging
		return data;
	} catch (error) {
		throw new Error(`Error fetching speakers: ${error.message}`);
	}
};

export const searchSpeakersAction = async (searchTerm) => {
	try {
		const response = await fetch(
			`http://localhost:4000/api/speakers/search?name=${searchTerm}`,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				method: "GET",
			}
		);
		if (!response.ok) {
			throw new Error(`Search failed (${response.status})`);
		}
		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(`Search error: ${error.message}`);
	}
};

export const addSpeakerAction = async (speakerData) => {
	try {
		const response = await fetch("http://localhost:4000/api/speakers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request headers
			},
			body: JSON.stringify({
				name: speakerData.name,
				bio: speakerData.bio,
				email: speakerData.email,
				topic: speakerData.topic,
				description: speakerData.description,
				date: speakerData.date
					? format(speakerData.date, "yyyy-MM-dd")
					: null, // Format the date to YYYY-MM-DD

				time: speakerData.time,
				duration: parseInt(speakerData.duration),
				location: speakerData.location,
			}),
		});
		if (!response.ok) {
			throw new Error(`Failed to add speaker (${response.status})`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Error adding speaker: ${error.message}`);
	}
};
