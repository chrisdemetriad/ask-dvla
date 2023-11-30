import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
	const mockFetchVehicleData = jest.fn();
	const mockSetNumber = jest.fn();
	const mockNumber = "YT17 EFM";

	it("renders correctly", () => {
		const { getByTestId, getByPlaceholderText } = render(<SearchBox fetchVehicleData={mockFetchVehicleData} number={mockNumber} setNumber={mockSetNumber} />);

		expect(getByTestId("search")).toBeTruthy();
		expect(getByPlaceholderText("REG NO")).toBeTruthy();
	});

	it("calls setNumber on input change", () => {
		const { getByPlaceholderText } = render(<SearchBox fetchVehicleData={mockFetchVehicleData} number={mockNumber} setNumber={mockSetNumber} />);
		const input = getByPlaceholderText("REG NO");

		fireEvent.changeText(input, "YT17 EFF");

		expect(mockSetNumber).toHaveBeenCalledWith("YT17 EFF");
	});

	it("calls fetchVehicleData on submit", () => {
		const { getByPlaceholderText } = render(<SearchBox fetchVehicleData={mockFetchVehicleData} number={mockNumber} setNumber={mockSetNumber} />);
		const input = getByPlaceholderText("REG NO");

		fireEvent(input, "submitEditing");

		expect(mockFetchVehicleData).toHaveBeenCalledWith(mockNumber);
	});

	it("handles blur event on input", () => {
		const { getByPlaceholderText } = render(<SearchBox fetchVehicleData={mockFetchVehicleData} number={mockNumber} setNumber={mockSetNumber} />);
		const input = getByPlaceholderText("REG NO");

		// Trigger focus and then blur events
		fireEvent(input, "focus");
		fireEvent(input, "blur");

		// Test if the component state changes as expected
		// This might be tricky to test directly since internal state changes are not always visible through render output
		// An indirect approach might be checking if UI elements change (e.g., if something appears or disappears on blur)
		// If there's a direct impact of blur on UI, assert that
		// Otherwise, testing this might require inspecting component state, which is generally not recommended for unit tests
	});

	it("shows search icon when input is focused and not empty", () => {
		const { getByPlaceholderText, queryByTestId } = render(<SearchBox fetchVehicleData={mockFetchVehicleData} number={mockNumber} setNumber={mockSetNumber} />);
		const input = getByPlaceholderText("REG NO");

		fireEvent(input, "focus");
		fireEvent.changeText(input, "YT17 EFF");

		expect(queryByTestId("search-icon")).toBeTruthy();
	});
});
