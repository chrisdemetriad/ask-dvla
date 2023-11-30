import React from "react";
import { render } from "@testing-library/react-native";
import CustomStatusBar from "./CustomStatusBar";

jest.mock("react-native/Libraries/Components/StatusBar/StatusBar", () => "StatusBar");

describe("CustomStatusBar", () => {
	it("renders correctly", () => {
		const { getByTestId } = render(<CustomStatusBar />);

		expect(getByTestId("custom-status-bar")).toBeVisible();
	});
});
