import { useState } from "react";
import "../styles/registerForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addSpeakerAction } from "../actions/speakers.actions";
import { useGlobalContext } from "../utilities/globalContex";

const RegisterForm = ({ onRegistrationSuccess }) => {
	const [formData, setFormData] = useState({
		name: "",
		bio: "",
		email: "",
		topic: "",
		description: "",
		date: null,
		time: "",
		duration: "",
		location: "",
	});

	const { userDetails } = useGlobalContext(); // Destructure the context values

	const locations = ["Kiosk 1", "Kiosk 2", "Kiosk 3"];

	const handleSubmit = async (event) => {
		//add toast message

		event.preventDefault(); // Prevent the default behavior that refreshes the page and clears the form
		addSpeakerAction(formData);

		onRegistrationSuccess(); //to update the registered speakers list
		handleReset(); // Reset form after successful submission

		console.log(formData);
	};

	const handleInputChange = (idetifier, value) => {
		setFormData((prevValues) => ({ ...prevValues, [idetifier]: value }));
		//  setEdited((prevEdited) => ({...prevEdited, [idetifier]: false }));
	};

	const handleReset = () => {
		setFormData({
			name: "",
			bio: "",
			email: "",
			topic: "",
			description: "",
			date: "",
			time: "",
			duration: "",
			location: "",
		});
	};

	return (
		<div className="form-card">
			<div className="user-name">
				<h2>Organizer: {userDetails.userName}</h2>
				<h3>Email: {userDetails.email}</h3>
				<h3>Role: {userDetails.role}</h3>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-content">
					<div className="form-element">
						<label htmlFor="name" className="required">
							Speaker Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							placeholder="Enter your name"
							value={formData.name}
							onChange={(event) =>
								handleInputChange("name", event.target.value)
							}
						/>
					</div>

					<div className="form-element">
						<label htmlFor="bio">Bio</label>
						<input
							type="text"
							placeholder="Enter a brief bio"
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={(event) =>
								handleInputChange("bio", event.target.value)
							}
						/>
					</div>

					<div className="form-element">
						<label htmlFor="email" className="required">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							placeholder="Enter your email"
							value={formData.email}
							onChange={(event) =>
								handleInputChange("email", event.target.value)
							}
						/>
					</div>

					<div className="form-element">
						<label htmlFor="topic" className="required">
							Topic
						</label>
						<input
							type="text"
							id="topic"
							name="topic"
							required
							placeholder="Enter the topic of your talk"
							value={formData.topic}
							onChange={(event) =>
								handleInputChange("topic", event.target.value)
							}
						/>
					</div>

					<div className="form-element">
						<label htmlFor="description">Description</label>
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Enter a brief description "
							value={formData.description}
							onChange={(event) =>
								handleInputChange("description", event.target.value)
							}
						/>
					</div>

					<div className="form-element">
						<label htmlFor="date" className="required">
							Date
						</label>
						<DatePicker
							selected={formData.date}
							onChange={(date) => handleInputChange("date", date)}
							dateFormat="dd/MM/yyyy"
							id="date"
							name="date"
							required
						/>
					</div>

					<div className="form-element">
						<label htmlFor="time" className="required">
							Time
						</label>
						<input
							type="time"
							id="time"
							name="time"
							value={formData.time}
							onChange={(event) =>
								handleInputChange("time", event.target.value)
							}
							required
						/>
					</div>

					<div className="form-element">
						<label htmlFor="duration" className="required">
							Duration
						</label>
						<input
							type="number"
							id="duration"
							name="duration"
							value={formData.duration}
							onChange={(event) =>
								handleInputChange("duration", event.target.value)
							}
							onKeyDown={(e) => {
								if (
									!/[0-9]/.test(e.key) &&
									e.key !== "Backspace" &&
									e.key !== "Delete" &&
									e.key !== "ArrowLeft" &&
									e.key !== "ArrowRight" &&
									e.key !== "Tab"
								) {
									e.preventDefault();
								}
							}}
							required
							placeholder="Enter the duration of your talk in minutes"
						/>
					</div>

					{/* <div className="form-element">
						<label htmlFor="location">Location</label>
						<input
							type="text"
							id="location"
							name="location"
							value={formData.location}
							onChange={(event) =>
								handleInputChange("location", event.target.value)
							}
							placeholder="Desired kiosk"
						/>
					</div> */}
					<div className="form-checkbox">
						<label>Location</label>
						{locations.map((option) => (
							<div key={option}>
								<label htmlFor={`location-${option}`}>
									<input
										type="checkbox"
										name="location"
										id={`location-${option}`}
										value={option}
										onChange={(event) =>
											handleInputChange("location", option)
										}
									/>
									{option}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="form-buttons">
					<button type="submit" className="submit-button">
						Submit
					</button>
					<button
						type="button"
						className="reset-button"
						onClick={handleReset}>
						Reset form
					</button>
				</div>
			</form>
		</div>
	);
};
export default RegisterForm; //ES6 export syntax
