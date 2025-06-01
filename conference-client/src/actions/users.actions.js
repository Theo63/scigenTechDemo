const API_URL = "http://localhost:4000/api/users";

// Feature	GlobalContextProvider	                                    useGlobalContext
// Purpose	Provides global state to child components.	                Simplifies access to the global state.
// Scope	Wraps the component tree to define the context's scope.	    Used in individual components to consume the context.
// Provides	userDetails and setUserDetails via GlobalContext.Provider.	Access to userDetails and setUserDetails.
// Usage	Wraps the app or parts of it.	                            Called in components to access or update the context.
// GlobalContextProvider wraps the component tree to provide a global context for user details.
// useGlobalContext is a custom hook that allows components to access the global context easily.
// in the app const { userDetails, setUserDetails } = useGlobalContext(); passing the context
// values of the useGlobalContext custom hook.
// in userEffect in App.jsx, we call whoAmI to fetch user details and update the context.
// the userDetails after are available in any component.
export const whoAmI = async ({ userDetails, setUserDetails }) => {
	try {
		const token = localStorage.getItem("token");

		if (!token) {
			throw new Error("No authentication token found");
		}

		const response = await fetch(`${API_URL}/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to fetch user details");
		}

		const userData = await response.json();

		// Update global context with user details
		setUserDetails({
			userName: userData.name,
			email: userData.email,
			role: userData.role,
			userId: userData._id,
		});

		return response.ok;
	} catch (error) {
		console.error("whoAmI error:", error);
		throw error;
	}
};

export const registerLoginUser = async (
	endpoint,
	onAuthSuccess,
	userData,
	errorData
) => {
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			onAuthSuccess(data.token); // Pass the token to App component as token
			localStorage.setItem("token", data.token); // Store token in local storage
			localStorage.setItem("userName", data.name);
			localStorage.setItem("userEmail", data.email);
			localStorage.setItem("userRole", data.role);

			return response.ok; // Return true if registration/login was successful
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || "Failed to register user");
		}
	} catch (error) {
		console.error("Register error:", error);
		throw error;
	}
};

/**
 * Logs out the current user
 */
export const logoutUser = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userName");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userRole");
	localStorage.removeItem("userId");
};
