import React from "react";
import { render } from "@testing-library/react-native";
import VehicleDetails from "./VehicleDetails";

describe("VehicleDetails", () => {
	const mockVehicleData = {
		make: "Test Make",
		yearOfManufacture: "2020",
		colour: "Red",
		engineCapacity: "2000",
		fuelType: "Petrol",
		revenueWeight: "1500kg",
		motStatus: "Valid",
		motExpiryDate: "2022-12-31",
		taxStatus: "Taxed",
		taxDueDate: "2022-06-30",
	};

	it("renders correctly when motStatus is not valid", () => {
		const mockDataInvalidMot = { ...mockVehicleData, motStatus: "Not valid" };
		const { getByText, getAllByText } = render(<VehicleDetails vehicleData={mockDataInvalidMot} />);

		expect(getByText("NOT VALID")).toBeTruthy();
		expect(getAllByText("Mot").length).toBeGreaterThan(0);
	});

	it("renders no data message when yearOfManufacture is missing", () => {
		const partialData = { make: "Test Make" };
		const { getByText } = render(<VehicleDetails vehicleData={partialData} />);

		expect(getByText("No vehicle data available.")).toBeTruthy();
	});

	it("renders correctly when taxStatus is not taxed", () => {
		const mockDataSORNTax = { ...mockVehicleData, taxStatus: "SORN" };
		const { getByText, getAllByText } = render(<VehicleDetails vehicleData={mockDataSORNTax} />);

		expect(getByText("SORN")).toBeTruthy();
		expect(getAllByText("Road").length).toBeGreaterThan(0);
	});

	it("defaults values when vehicleData is null or undefined", () => {
		const { getByText } = render(<VehicleDetails vehicleData={null} />);

		expect(getByText("No vehicle data available.")).toBeTruthy();
	});

	it("renders correctly with vehicle data", () => {
		const { getByText, getByTestId } = render(<VehicleDetails vehicleData={mockVehicleData} />);

		const expectedVehicleDetailsRegex = new RegExp(`${mockVehicleData.yearOfManufacture}\\s+${mockVehicleData.make},\\s+${mockVehicleData.colour},\\s+${mockVehicleData.engineCapacity}cc,\\s+${mockVehicleData.fuelType}(,\\s+${mockVehicleData.revenueWeight})?`, "i");
		expect(getByText(expectedVehicleDetailsRegex)).toBeTruthy();
		expect(getByTestId("vehicle-details")).toBeTruthy();
	});
});
