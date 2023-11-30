import vehicleDataReducer, { VehicleDataAction } from "./vehicleDataReducer";

describe("vehicleDataReducer", () => {
	const initialState = {
		data: {},
		isLoading: false,
		error: null,
	};

	it("should handle FETCH_INIT action", () => {
		const action = { type: "FETCH_INIT" } as VehicleDataAction;
		const expectedState = { ...initialState, isLoading: true, error: null };
		expect(vehicleDataReducer(initialState, action)).toEqual(expectedState);
	});

	it("should handle FETCH_SUCCESS action", () => {
		const action = { type: "FETCH_SUCCESS", payload: { some: "data" } } as VehicleDataAction;
		const expectedState = { ...initialState, isLoading: false, data: { some: "data" } };
		expect(vehicleDataReducer(initialState, action)).toEqual(expectedState);
	});

	it("should handle FETCH_FAILURE action", () => {
		const action = { type: "FETCH_FAILURE", payload: "error message" } as VehicleDataAction;
		const expectedState = { ...initialState, isLoading: false, error: "error message" };
		expect(vehicleDataReducer(initialState, action)).toEqual(expectedState);
	});

	it("should throw an error for unknown action types", () => {
		const action = { type: "UNKNOWN_ACTION", payload: "" } as any;

		const dispatchWithUnknownAction = () => {
			vehicleDataReducer(initialState, action);
		};

		expect(dispatchWithUnknownAction).toThrow();
	});
});
