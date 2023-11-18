import { useState } from "react";
import { API_URL, API_TOKEN } from "@env";

const useVehicleData = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchVehicleData = async (number) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Api-Key": API_TOKEN,
				},
				body: JSON.stringify({ registrationNumber: number }),
			});

			if (!response.ok) {
				throw new Error("HTTP status " + response.status);
			}

			const result = await response.json();
			setData(result);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, error, fetchVehicleData };
};

export default useVehicleData;
