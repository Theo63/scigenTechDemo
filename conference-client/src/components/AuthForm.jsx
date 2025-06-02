import React, { useState } from "react";
import "../styles/authForm.css"; // Import your CSS styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/authForm.css"; // Import your CSS styles
import { registerLoginUser } from "../actions/users.actions"; // Import the action to handle user registration/login

const AuthForm = ({ onAuthSuccess }) => {
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
	const authendicationController = async ({ endpoint, formData }) => {
		try {
			console.log("Endpoint:", endpoint); // Debugging
			const userAuthResponse = await registerLoginUser({
				endpoint,
				formData,
			});
			console.log("userAuthResponse", userAuthResponse);
			if (userAuthResponse && userAuthResponse.token) {
				localStorage.setItem("token", userAuthResponse.token); // Store the token
				onAuthSuccess();
			} else {
				toast("Authentication failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Authentication error:", error);
			toast("Authentication failed. Please try again.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const endpoint = isLogin
			? "http://localhost:4000/api/users/login"
			: "http://localhost:4000/api/users/register";
		authendicationController({
			endpoint,
			formData: {
				name: isLogin ? "" : formData.name,
				email: formData.email,
				password: formData.password,
			},
		});
	};

	return (
		<div>
			<h2>{isLogin ? "Login" : "Sign Up"}</h2>
			<form onSubmit={handleSubmit}>
				<div className="login-container">
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
					<button className="login-button" type="submit">
						{isLogin ? "Login" : "Sign Up"}
					</button>
				</div>
			</form>
			<button className="login-button" onClick={() => setIsLogin(!isLogin)}>
				or {isLogin ? "Sign Up" : "Login"}
			</button>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				theme="light"
			/>
		</div>
	);
};

export default AuthForm;
