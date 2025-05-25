import React, { createContext, useContext, useState } from "react";

// Create a context with a default value
const GlobalContext = createContext();

// Create a provider component
export function GlobalProvider({ children }) {
	const [userDetails, setUserDetails] = useState({
		userName: "",
		email: "",
		role: "",
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
