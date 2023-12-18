import { useReducer } from "react";
import motHistoryReducer from "../reducers/motHistoryReducer";

export interface MotHistory {
	registration: string;
	make: string;
	model: string;
	firstUsedDate: string;
	fuelType: string;
	primaryColour: string;
	motTests: MotTest[];
}

export interface MotTest {
	completedDate: string;
	testResult: string;
	expiryDate?: string;
	odometerValue: string;
	odometerUnit: string;
	motTestNumber: string;
	rfrAndComments: RfrAndComment[];
}

export interface RfrAndComment {
	text: string;
	type: string;
}

const useMotHistory = () => {
	const initialState: any = {};

	const motHistoryApiUrl = process.env.EXPO_PUBLIC_MOT_HISTORY_API_URL;
	const motHistoryApiToken = process.env.EXPO_PUBLIC_MOT_HISTORY_API_TOKEN;

	const [state, dispatch] = useReducer(motHistoryReducer, initialState);

	const fetchVehicleData: any = async (number) => {
		dispatch({ type: "FETCH_INIT" });
		try {
			const response = await fetch(motHistoryApiUrl + number, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": motHistoryApiToken,
				},
			});

			const result = await response.json();
			dispatch({ type: "FETCH_SUCCESS", payload: result });
			console.log(result);
		} catch (error) {
			dispatch({ type: "FETCH_FAILURE", payload: error.message });
		}
	};

	return { ...state, fetchVehicleData };
};

export default useMotHistory;
