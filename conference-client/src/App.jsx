import { useState, useEffect } from "react";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import RegisteredSpeakers from "./components/RegisteredSpeakers";
import FloatingSearchIcon from "./components/floatingSearch";
import logo from "./assets/logo.png";
import logoutIcon from "./assets/logout.png";
import AuthForm from "./components/AuthForm";

function App() {
	const [loading, setLoading] = useState(true);

	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);

	const [speakers, setSpeakers] = useState([]);

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const userName = localStorage.getItem("userName") || ""; // Retrieve username from local storage

	useEffect(() => {
		const token = localStorage.getItem("token"); //on refresh without this the is authenticated state will be false and the user will be logged out
		if (token) {
			setIsAuthenticated(true);
			fetchSpeakers(); // Fetch speakers if token is present
		} else {
			setIsAuthenticated(false);
			setLoading(false); // Set loading to false if no token is present
		}
	}, [isAuthenticated]); // useEffect to check if the user is authenticated and fetch speakers !!!!!!!!!!!!!!!

	const fetchSpeakers = async () => {
		try {
			setLoading(true);
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
			setSpeakers(data);
		} catch (error) {
			setError(error.message); // Store error message instead of error object
		} finally {
			setLoading(false);
		}
	};

	const handleSearchResults = (results) => {
		setSearchResults(results);
		// console.log('Search results:', results);
		setShowSearchResults(true); //because we want to render the search
		// results overlay on RegisteredSpeakers.jsx
	};

	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token from local storage
		setIsAuthenticated(false);
	};

	const handleAuth = (token) => {
		setIsAuthenticated(true);
	};

	if (loading) return <div>Loading...</div>;
	if (!isAuthenticated) {
		return <AuthForm onAuthSuccess={handleAuth} />;
	}

	return (
		<>
			<div className="header">
				<img src={logo} alt="Logo" className="logo" />
				<h1>Speaker Registration</h1>
				<button
					className="logout-button"
					type="button"
					onClick={handleLogout}>
					<img src={logoutIcon} alt="Logout" />
				</button>
			</div>
			<RegisterForm
				onRegistrationSuccess={fetchSpeakers}
				userName={userName}
			/>
			<h2>Registered Speakers</h2>
			<RegisteredSpeakers
				speakers={speakers}
				setSpeakers={setSpeakers}
				searchResults={searchResults}
				setSearchResults={setSearchResults}
				showSearchResults={showSearchResults}
				onCloseSearch={() => setShowSearchResults(false)}
			/>
			<FloatingSearchIcon searchResults={handleSearchResults} />
		</>
	);
}

export default App;
