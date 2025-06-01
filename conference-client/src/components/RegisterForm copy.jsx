import { useState } from "react";
// import "../styles/registerForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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

	const locations = ["Kiosk 1", "Kiosk 2", "Kiosk 3"];

	const handleSubmit = async (event) => {
		//add toast message

		event.preventDefault(); // Prevent the default behavior that refreshes the page and clears the form
		try {
			const response = await fetch("http://localhost:4000/api/speakers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", //!!!!!!!!!!!!!!!!!!!!!!
					authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in the request headers
				},
				body: JSON.stringify({
					name: formData.name,
					bio: formData.bio,
					email: formData.email,
					topic: formData.topic,
					description: formData.description,
					date: formData.date ? format(formData.date, "yyyy-MM-dd") : null, // Format the date to YYYY-MM-DD

					time: formData.time,
					duration: parseInt(formData.duration),
					location: formData.location,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Success:", data);

			onRegistrationSuccess(); //to update the registered speakers list
			handleReset(); // Reset form after successful submission
		} catch (error) {
			console.error("Error:", error);
			// Here you might want to show an error message to the user
		}

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
		<div className="flex flex-col bg-[rgb(224,219,219)] text-[#007bff]  rounded-[10px] w-full max-w-[965px] ">
			<div className="mb-8">
				<h2 className="text-gray-700 text-2xl font-bold">
					Organizer: {userDetails.userName}
				</h2>
				<h3 className="text-gray-700 text-base font-bold text-center">
					Email: {userDetails.userEmail}
				</h3>
				<h3 className="text-gray-700 font-bold text-center">
					Role: {userDetails.userRole}
				</h3>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-wrap ">
					{/* Speaker Name */}
					<div className="flex flex-col w-[calc(50%-10px)] ">
						<label
							htmlFor="name"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*']">
							Speaker Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							placeholder="Enter your name"
							value={formData.name}
							onChange={(e) => handleInputChange("name", e.target.value)}
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Bio */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="bio"
							className="mb-2 text-gray-600 text-xl font-bold">
							Bio
						</label>
						<input
							type="text"
							id="bio"
							name="bio"
							placeholder="Enter a brief bio"
							value={formData.bio}
							onChange={(e) => handleInputChange("bio", e.target.value)}
							className="w-3/4 py-16 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Email */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="email"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*'] after:text-red-600 after:ml-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							placeholder="Enter your email"
							value={formData.email}
							onChange={(e) =>
								handleInputChange("email", e.target.value)
							}
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Topic */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="topic"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*'] after:text-red-600 after:ml-1">
							Topic
						</label>
						<input
							type="text"
							id="topic"
							name="topic"
							required
							placeholder="Enter the topic of your talk"
							value={formData.topic}
							onChange={(e) =>
								handleInputChange("topic", e.target.value)
							}
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Description */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="description"
							className="mb-2 text-gray-600 text-xl font-bold">
							Description
						</label>
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Enter a brief description"
							value={formData.description}
							onChange={(e) =>
								handleInputChange("description", e.target.value)
							}
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Date */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="date"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*'] after:text-red-600 after:ml-1">
							Date
						</label>
						<DatePicker
							selected={formData.date}
							onChange={(date) => handleInputChange("date", date)}
							dateFormat="dd/MM/yyyy"
							id="date"
							name="date"
							required
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Time */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="time"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*'] after:text-red-600 after:ml-1">
							Time
						</label>
						<input
							type="time"
							id="time"
							name="time"
							value={formData.time}
							onChange={(e) => handleInputChange("time", e.target.value)}
							required
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Duration */}
					<div className="flex flex-col w-[calc(50%-10px)] mb-4">
						<label
							htmlFor="duration"
							className="mb-2 text-gray-600 text-xl font-bold after:content-['*'] after:text-red-600 after:ml-1">
							Duration
						</label>
						<input
							type="number"
							id="duration"
							name="duration"
							value={formData.duration}
							onChange={(e) =>
								handleInputChange("duration", e.target.value)
							}
							required
							placeholder="Enter the duration in minutes"
							className="w-3/4 py-2 px-4 border rounded-[5px]  text-center   self-center  "
						/>
					</div>

					{/* Location */}
					<div className="flex flex-col w-[calc(50%-10px)] items-center mb-4 m-4">
						<label className="mb-2 text-gray-600 text-xl font-bold">
							Location
						</label>
						{locations.map((option) => (
							<div key={option} className="flex items-center mb-2">
								<label
									htmlFor={`location-${option}`}
									className="flex items-center text-gray-600 text-xl font-bold">
									<input
										type="checkbox"
										name="location"
										id={`location-${option}`}
										value={option}
										onChange={() =>
											handleInputChange("location", option)
										}
										className="mr-2 h-4 w-4"
									/>
									{option}
								</label>
							</div>
						))}
					</div>
				</div>
				<div className=" items-center m-16">
					<button
						type="submit"
						className="h-12 w-40 rounded bg-blue-700 text-white font-medium hover:bg-blue-600 transition-colors">
						Submit
					</button>
					<button
						type="button"
						className="h-12 w-40 rounded bg-red-700 text-white font-medium hover:bg-red-600 transition-colors"
						onClick={handleReset}>
						Reset form
					</button>
				</div>
			</form>
		</div>
	);
};
export default RegisterForm; //ES6 export syntax
