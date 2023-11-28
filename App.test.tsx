import React from "react";
import { render } from "@testing-library/react-native";
import App from "./App";

jest.mock("./navigation/BottomTabNavigator", () => "BottomTabNavigator");
jest.mock("./components/CustomStatusBar", () => "CustomStatusBar");

describe("App", () => {
	it("App renders correctly", () => {
		const { getByTestId } = render(<App />);

		expect(getByTestId("ask-dvla-app")).toBeTruthy();
	});
});
