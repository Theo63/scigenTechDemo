import { useState, useEffect } from "react";
import "../styles/registeredSpeakers.css";

export default function RegisteredSpeakers({
	speakers,
	setSpeakers,
	searchResults,
	showSearchResults,
	onCloseSearch,
}) {

	const [error, setError] = useState(null);

	const handleSpeakerDelete = async (id) => {
		try {
			const response = await fetch(`http://localhost:4000/api/speakers/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error(`Failed to delete speaker (${response.status})`);
			}
			setSpeakers(speakers.filter((speaker) => speaker.id !== id));
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
						<div key={speaker.id} className="speaker-item">
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
								<strong>Duration:</strong> {speaker.duration} minutes
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
									<strong>Description:</strong> {speaker.description}
								</p>
							)}
							<button
								type="button"
								onClick={() => handleSpeakerDelete(speaker.id)}
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
								<div key={speaker.id} className="speaker-item">
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
										<strong>Duration:</strong> {speaker.duration} minutes
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
											<strong>Description:</strong> {speaker.description}
										</p>
									)}
									<div>
										<button
											type="button"
											onClick={() => handleSpeakerDelete(speaker.id)}
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
}
