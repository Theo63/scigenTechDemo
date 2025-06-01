import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalContextProvider } from "./utilities/globalContex";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<GlobalContextProvider>
			<App />
		</GlobalContextProvider>
	</StrictMode>
);
