import React from "react";

const TailwindTest = () => {
	return (
		<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 m-4">
			<div className="shrink-0">
				<div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
					T
				</div>
			</div>
			<div>
				<div className="text-xl font-medium text-black">Tailwind CSS</div>
				<p className="text-gray-500">Successfully installed and working!</p>
			</div>
		</div>
	);
};

export default TailwindTest;
