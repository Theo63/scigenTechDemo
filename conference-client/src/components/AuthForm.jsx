import React, { useState } from "react";
import "../styles/authForm.css"; // Import your CSS styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthForm({ onAuthSuccess }) {
	const [isLogin, setIsLogin] = useState(true); // Track whether it's login or signup
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	}); //these are the fields we need to send to the server and match with the user model

	const handleInputChange = (identifier, value) => {
		setFormData({
			...formData,
			[identifier]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin
			? "http://localhost:4000/api/users/login"
			: "http://localhost:4000/api/users/register";
		try {
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				}, //the type of data we are sending is JSON
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				onAuthSuccess(data.token); // Pass the token to App component
			} else {
				// Handle error
				console.error("Authentication failed");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<h2>{isLogin ? "Login" : "Sign Up"}</h2>
			<form onSubmit={handleSubmit}>
				{!isLogin && (
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={(event) =>
							handleInputChange("name", event.target.value)
						}
					/>
				)}
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={(event) =>
						handleInputChange("email", event.target.value)
					}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={(event) =>
						handleInputChange("password", event.target.value)
					}
				/>
				<button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
			</form>
			<button onClick={() => setIsLogin(!isLogin)}>
				Switch to {isLogin ? "Sign Up" : "Login"}
			</button>
		</div>
	);
}

export default AuthForm;
