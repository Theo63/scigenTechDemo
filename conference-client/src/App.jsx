import { useState, useEffect } from "react";
import "./App.css";
import RegisterForm from "./components/registerForm";
import RegisteredSpeakers from "./components/RegisteredSpeakers";
import FloatingSearch from "./components/floatingSearch";
import logo from "./assets/logo.png";
import logoutIcon from "./assets/logout.png";
import AuthForm from "./components/AuthForm";
import { fetchSpeakersAction } from "./actions/speakers.actions";
import { useGlobalContext } from "./utilities/globalContex";
import { whoAmI } from "./actions/users.actions";

const App = () => {
	const token = localStorage.getItem("token"); //on refresh without this the is authenticated state will be false and the user will be logged out

	const [userDetailsloading, setUserDetailsLoading] = useState(true);
	const [fetchSpeakersLoading, setFetchSpeakersLoading] = useState(true);

	const [searchResults, setSearchResults] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [speakers, setSpeakers] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(!!token);
	// const [error, setError] = useState(null); // Error state to handle errors
	const { setUserDetails } = useGlobalContext(); // Destructure the context values !!!!!

	const getUserDetails = async (token) => {
		try {
			const data = await whoAmI(token);
			setUserDetails({
				userName: data.name,
				email: data.email,
				role: data.role,
			});
		} catch (error) {
			console.error("Error fetching user details:", error);
			//logout the user if there is an error fetching user details
		} finally {
			setUserDetailsLoading(false);
		}
	};

	const fetchSpeakers = async () => {
		try {
			setFetchSpeakersLoading(true);
			const data = await fetchSpeakersAction();
			setSpeakers(data);
		} catch (error) {
			console.error("Error fetching speakers:", error);

			// Handle error, e.g., show a toast notification
		} finally {
			setFetchSpeakersLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token from local storage
		setIsAuthenticated(false);
	};

	useEffect(() => {
		if (token) {
			getUserDetails(token);
			fetchSpeakers(token);
		} else {
			setUserDetailsLoading(false);
		}
	}, [token]);

	const handleSearchResults = (results) => {
		setSearchResults(results);
		console.log("Search result on App:", results);
		setShowSearchResults(true); //because we want to render the search
		// results overlay on RegisteredSpeakers.jsx
	};

	const handleAuth = () => {
		setIsAuthenticated(true);
	};

	if (userDetailsloading || fetchSpeakersLoading) return <div>Loading...</div>;
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
			<RegisterForm onRegistrationSuccess={fetchSpeakers} />
			<h2>Registered Speakers</h2>
			<RegisteredSpeakers
				speakers={speakers}
				setSpeakers={setSpeakers}
				searchResults={searchResults}
				setSearchResults={setSearchResults}
				showSearchResults={showSearchResults}
				onCloseSearch={() => setShowSearchResults(false)}
				//setIsAuthenticated={setIsAuthenticated} // to logout when 401 is received
			/>
			<FloatingSearch searchResultsDisplay={handleSearchResults} />
		</>
	);
};

export default App;
