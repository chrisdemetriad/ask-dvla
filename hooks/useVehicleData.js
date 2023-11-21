import { useReducer } from "react";
import { API_URL, API_TOKEN } from "@env";
import vehicleDataReducer from "../reducers/vehicleDataReducer";

const useVehicleData = () => {
	const initialState = {
		data: {},
		isLoading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(vehicleDataReducer, initialState);

	const fetchVehicleData = async (number) => {
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
				throw new Error("HTTP status " + response.status);
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
