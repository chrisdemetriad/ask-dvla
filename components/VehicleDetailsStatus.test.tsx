import React from "react";
import { render } from "@testing-library/react-native";
import VehicleDetailsStatus from "./VehicleDetailsStatus";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(),
}));

describe("VehicleDetailsStatus", () => {
	it("renders correctly", () => {
		const { getByTestId } = render(<VehicleDetailsStatus isValid={true} title="Mot" statusText="VALID" date="2022-12-31" />);
		expect(getByTestId("vehicle-details-status")).toBeVisible();
	});

	it("renders valid status correctly", () => {
		const { getByText } = render(<VehicleDetailsStatus isValid={true} title="Mot" statusText="VALID" date="2022-12-31" />);

		expect(getByText("Mot")).toBeTruthy();
		expect(getByText("VALID")).toBeTruthy();
		expect(getByText("2022-12-31")).toBeTruthy();
	});

	it("renders invalid status correctly", () => {
		const { getByText } = render(<VehicleDetailsStatus isValid={false} title="Mot" statusText="NOT VALID" date="2022-12-31" />);

		expect(getByText("Mot")).toBeTruthy();
		expect(getByText("NOT VALID")).toBeTruthy();
		expect(getByText("Getting an MOT")).toBeTruthy();
	});
});
