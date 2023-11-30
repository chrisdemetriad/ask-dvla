import { renderHook, act, waitFor } from "@testing-library/react-native";
import useVehicleData from "./useVehicleData";

globalThis.fetch = jest.fn();

describe("useVehicleData", () => {
	it("should initialize with the correct initial state", () => {
		const { result } = renderHook(() => useVehicleData());
		const { data, isLoading, error, fetchVehicleData } = result.current;

		expect(data).toEqual({});
		expect(isLoading).toBe(false);
		expect(error).toBe(null);
		expect(typeof fetchVehicleData).toBe("function");
	});

	it("should handle FETCH_INIT action when fetching data", async () => {
		(globalThis.fetch as jest.MockedFunction<typeof globalThis.fetch>).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ some: "data" }),
		} as Response);

		const { result } = renderHook(() => useVehicleData());

		await act(async () => {
			await result.current.fetchVehicleData("YT17 EFF");
		});

		expect(result.current.isLoading).toBe(false);

		expect(result.current.error).toBe(null);
	});

	it("should handle FETCH_SUCCESS action when data is fetched successfully", async () => {
		(globalThis.fetch as jest.MockedFunction<typeof globalThis.fetch>).mockResolvedValueOnce({
			ok: true,
			json: async () => ({ some: "data" }),
		} as Response);

		const { result } = renderHook(() => useVehicleData());
		const { fetchVehicleData } = result.current;

		await act(async () => {
			await fetchVehicleData("YT17 EFF");
		});

		const { data, isLoading, error } = result.current;
		expect(isLoading).toBe(false);
		expect(error).toBe(null);
		expect(data).toEqual({ some: "data" });
	});

	const errorTestCases = [
		{ status: 400, expectedError: "Bad Request" },
		{ status: 403, expectedError: "Forbidden" },
		{ status: 429, expectedError: "Too Many Requests", customMessage: "null" },
		{ status: 502, expectedError: "Bad Gateway" },
		{ status: 504, expectedError: "Gateway Timeout" },
		{ status: 500, expectedError: "Error 500" },
	];

	errorTestCases.forEach(({ status, expectedError, customMessage }) => {
		it(`should handle error correctly for ${status} ${expectedError} response`, async () => {
			const mockErrorMessage = customMessage || "Invalid input";

			(globalThis.fetch as jest.MockedFunction<typeof globalThis.fetch>).mockResolvedValueOnce({
				ok: false,
				status: status,
				json: async () => ({ message: mockErrorMessage }),
			} as Response);

			const { result } = renderHook(() => useVehicleData());

			await act(async () => {
				await result.current.fetchVehicleData("YT17 EFF");
			});

			const expectedErrorMessage = status === 429 && customMessage ? "API throttling limit exceeded" : `${expectedError}: ${mockErrorMessage}`;

			expect(result.current.error).toBe(expectedErrorMessage);
		});
	});

	it("should handle FETCH_FAILURE action when an error occurs during fetch", async () => {
		(globalThis.fetch as jest.MockedFunction<typeof globalThis.fetch>).mockRejectedValueOnce(new Error("Network error"));

		const { result } = renderHook(() => useVehicleData());
		const { fetchVehicleData } = result.current;

		await act(async () => {
			await fetchVehicleData("YT17 EFF");
		});

		const { isLoading, error } = result.current;
		expect(isLoading).toBe(false);
		expect(error).toBe("Network error");
	});
});
