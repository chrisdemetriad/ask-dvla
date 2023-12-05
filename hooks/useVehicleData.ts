import { useReducer } from "react";
import { API_URL, API_TOKEN } from "@env";
import vehicleDataReducer from "../reducers/vehicleDataReducer";

interface VehicleDataState {
	data: any;
	isLoading: boolean;
	error: string | null;
}

interface FetchVehicleData {
	(number: string): Promise<void>;
}

const useVehicleData = () => {
	const initialState: VehicleDataState = {
		data: {},
		isLoading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(vehicleDataReducer, initialState);

	const fetchVehicleData: FetchVehicleData = async (number) => {
		dispatch({ type: "FETCH_INIT" });

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
				const errorJson = await response.json();
				let errorMessage = errorJson.message || "Unknown error occurred";

				switch (response.status) {
					case 400:
						errorMessage = "Bad Request: " + errorMessage;
						break;
					case 403:
						errorMessage = "Forbidden: " + errorMessage;
						break;
					case 429:
						errorMessage = errorMessage === "null" ? "API throttling limit exceeded" : "Too Many Requests";
						break;
					case 502:
						errorMessage = "Bad Gateway: " + errorMessage;
						break;
					case 504:
						errorMessage = "Gateway Timeout: " + errorMessage;
						break;
					default:
						errorMessage = `Error ${response.status}: ` + errorMessage;
				}

				throw new Error(errorMessage);
			}

			const result = await response.json();
			dispatch({ type: "FETCH_SUCCESS", payload: result });
		} catch (error) {
			dispatch({ type: "FETCH_FAILURE", payload: error.message });
		}
	};

	return { ...state, fetchVehicleData };
};

export default useVehicleData;
