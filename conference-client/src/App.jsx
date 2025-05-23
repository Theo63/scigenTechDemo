import { useState, useEffect } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import RegisteredSpeakers from "./components/RegisteredSpeakers";
import FloatingSearchIcon from "./components/floatingSearch";
import logo from "./assets/logo.png";

function App() {
	const [loading, setLoading] = useState(true);

	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);

	const [speakers, setSpeakers] = useState([]);

	const fetchSpeakers = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:4000/api/speakers");
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setSpeakers(data);
		} catch (error) {
			setError(error.message); // Store error message instead of error object
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSpeakers();
	}, []); //empty array means this effect runs once when the component mounts. if we want to run it on any state change, we can add the state variable to the array

	const handleSearchResults = (results) => {
		setSearchResults(results);
		// console.log('Search results:', results);
		setShowSearchResults(true); //because we want to render the search
		// results overlay on RegisteredSpeakers.jsx
	};
	if (loading) return <div>Loading...</div>;

	return (
		<>
			<div className="header">
				<img src={logo} alt="Logo" className="logo" />
				<h1>Speaker Registration</h1>
			</div>
			<RegisterForm onRegistrationSuccess={fetchSpeakers} />
			<h2>Registered Speakers</h2>
			<RegisteredSpeakers
				speakers={speakers}
				setSpeakers={setSpeakers}
				searchResults={searchResults} // pass search results to RegisteredSpeakers
				setSearchResults={setSearchResults} // pass setSearchResults to RegisteredSpeakers
				showSearchResults={showSearchResults} // pass showSearchResults state to trigger search results overlay
				onCloseSearch={() => setShowSearchResults(false)} // a false preset callback
				//  function to close search results when the
				// overlay is clicked anywhere
			/>
			<FloatingSearchIcon
				searchResults={handleSearchResults} //a function to get search results
			/>
		</>
	);
}

export default App;
