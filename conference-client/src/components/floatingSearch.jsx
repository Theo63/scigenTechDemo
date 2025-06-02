import { useState, useRef, useEffect } from "react";
import "../styles/floatingButton.css";
import searchIcon from "../assets/search.png";
import { searchSpeakersAction } from "../actions/speakers.actions";

const FloatingSearch = ({ searchResultsDisplay }) => {
	const [isPressed, setIsPressed] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const searchSpeakers = async (searchTerm) => {
		try {
			const data = await searchSpeakersAction(searchTerm);

			searchResultsDisplay(data);
		} catch (error) {
			console.error("Error searching speakers:", error);
		}
	};

	const handleSearch = async (event) => {
		if (event.key === "Enter") {
			searchSpeakers(searchTerm);
		}
	};

	const handleButtonClick = () => {
		setIsPressed(true); // Focus input after render
	};

	const lostFocus = () => {
		setIsPressed(false);
		setSearchTerm("");
	};
	//contitionally rendering    the input field based on the isPressed
	return (
		<div className="floating-search-container">
			{isPressed && (
				<input
					id="name"
					name="name"
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={handleSearch}
					onBlur={lostFocus}
					placeholder="Type Speaker Search..."
					className="floating-search-input"
					autoFocus
				/>
			)}
			<button className="floating-search-button" onClick={handleButtonClick}>
				<img src={searchIcon} alt="search" />
			</button>
		</div>
	);
};

export default FloatingSearch;
