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
export const whoAmI = async (token) => {
	try {
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
		// setUserDetails({
		// 	userName: userData.name,
		// 	email: userData.email,
		// 	role: userData.role,
		// 	userId: userData._id,
		// });

		return userData;
	} catch (error) {
		console.error("whoAmI error:", error);
		throw error;
	}
};

export const registerLoginUser = async ({ endpoint, formData }) => {
	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (!response.ok) {
			const errorText = await response.text(); // Read the response as text
			throw new Error(errorText || `HTTP error! status: ${response.status}`);
		}
		const data = response.json();
		console.log("Register/Login user data:", data);
		return data;
	} catch (error) {
		console.error("Register error:", error);
		throw error;
	}
};

export const logoutUser = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userName");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userRole");
	localStorage.removeItem("userId");
};
