import React from "react";
import { render } from "@testing-library/react-native";
import SettingsScreen from "./SettingsScreen";

describe("SettingsScreen", () => {
	it("renders correctly", () => {
		const { getByTestId } = render(<SettingsScreen />);

		expect(getByTestId("settings-screen")).toBeVisible();
	});
});
