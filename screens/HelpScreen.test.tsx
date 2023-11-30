import React from "react";
import { render } from "@testing-library/react-native";
import HelpScreen from "./HelpScreen";

describe("HelpScreen", () => {
	it("renders correctly", () => {
		const { getByTestId } = render(<HelpScreen />);

		expect(getByTestId("help-screen")).toBeVisible();
	});
});
