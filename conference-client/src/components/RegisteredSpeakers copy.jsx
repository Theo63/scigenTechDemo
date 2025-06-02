import { useState, useEffect } from "react";
import "../styles/registeredSpeakers.css";
import { deleteSpeakerAction } from "../actions/speakers.actions";

const RegisteredSpeakers = ({
	speakers,
	setSpeakers,
	searchResults,
	setSearchResults,
	showSearchResults,
	onCloseSearch,
}) => {
	const [error, setError] = useState(null);

	const handleSpeakerDelete = async (id) => {
		try {
			await deleteSpeakerAction(id); // Call the action to delete the speaker
			setSpeakers(speakers.filter((speaker) => speaker._id !== id));
			setSearchResults(
				searchResults.filter((speaker) => speaker._id !== id)
			); // remove the deleted speaker from search results
		} catch (error) {
			setError(error.message);
		}
	};

	if (error) return <div>Error: {error}</div>;
	// console.log(speakers);

	return (
		<>
			<div className="speakers-container">
				{speakers.length === 0 ? (
					<p>No speakers registered yet.</p>
				) : (
					speakers.map((speaker) => (
						<div key={speaker._id} className="speaker-item">
							{/*  key={speaker.id} for SQL and _id for mongo compatibility */}
							<h3>{speaker.name}</h3>
							<p>
								<strong>Email:</strong> {speaker.email}
							</p>
							<p>
								<strong>Topic:</strong> {speaker.topic}
							</p>
							<p>
								<strong>Date:</strong> {speaker.date}
							</p>
							<p>
								<strong>Time:</strong> {speaker.time}
							</p>
							<p>
								<strong>Duration:</strong> {speaker.duration} minutes
							</p>
							<p>
								<strong>Bio:</strong> {speaker.bio}
							</p>
							<p>
								<strong>Description:</strong> {speaker.description}
							</p>
							<p>
								<strong>Location:</strong> {speaker.location}
							</p>

							<button
								type="button"
								onClick={() => handleSpeakerDelete(speaker._id)}
								className="delete-button">
								{" "}
								Delete Speaker
							</button>
						</div>
					))
				)}
			</div>

			{searchResults && showSearchResults && (
				<div className="search-result-overlay" onClick={onCloseSearch}>
					<div
						className="search-result-container"
						onClick={(e) => e.stopPropagation()}>
						{/* clicking the container will not trigger the 
                        onCloseSearch because of the stopPropagation */}
						{Array.isArray(searchResults) &&
							searchResults.map((speaker) => (
								<div key={speaker._id} className="speaker-item">
									<h3>{speaker.name}</h3>
									<p>
										<strong>Topic:</strong> {speaker.topic}
									</p>
									<p>
										<strong>Date:</strong> {speaker.date}
									</p>
									<p>
										<strong>Time:</strong> {speaker.time}
									</p>
									<p>
										<strong>Duration:</strong> {speaker.duration}{" "}
										minutes
									</p>
									<p>
										<strong>Location:</strong> {speaker.location}
									</p>
									{speaker.bio && (
										<p>
											<strong>Bio:</strong> {speaker.bio}
										</p>
									)}
									{speaker.description && (
										<p>
											<strong>Description:</strong>{" "}
											{speaker.description}
										</p>
									)}
									<div>
										<button
											type="button"
											onClick={() =>
												handleSpeakerDelete(speaker._id)
											}
											className="delete-button">
											Delete Speaker
										</button>
										{/* <button type="button" 
                                        onClick={onCloseSearch}
                                        className="delete-button">
                                    Exit search
                                </button> */}
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</>
	);
};
export default RegisteredSpeakers;
