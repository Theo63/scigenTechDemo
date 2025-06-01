import { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalContext = createContext();

// Create a provider component
export function GlobalContextProvider({ children }) {
	// This function can be used to fetch user details from an API or other source
	const [userDetails, setUserDetails] = useState({
		userName: "",
		email: "",
		role: "",
		userId: "",
	});

	return (
		<GlobalContext.Provider value={{ userDetails, setUserDetails }}>
			{children}
		</GlobalContext.Provider>
	);
}

// Custom hook to use the context
export function useGlobalContext() {
	return useContext(GlobalContext);
}
