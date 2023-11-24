interface VehicleDataState {
	data: any;
	isLoading: boolean;
	error: string | null;
}

type VehicleDataAction = { type: "FETCH_INIT" } | { type: "FETCH_SUCCESS"; payload: any } | { type: "FETCH_FAILURE"; payload: string };

const vehicleDataReducer = (state: VehicleDataState, action: VehicleDataAction): VehicleDataState => {
	switch (action.type) {
		case "FETCH_INIT":
			return { ...state, isLoading: true, error: null };
		case "FETCH_SUCCESS":
			return { ...state, isLoading: false, data: action.payload };
		case "FETCH_FAILURE":
			return { ...state, isLoading: false, error: action.payload };
		default:
			throw new Error();
	}
};

export default vehicleDataReducer;
