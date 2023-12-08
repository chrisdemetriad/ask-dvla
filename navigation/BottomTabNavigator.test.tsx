import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");

describe("BottomTabNavigator", () => {
	it("renders the bottom tabs and navigates correctly", () => {
		const { getByText } = render(
			<NavigationContainer>
				<BottomTabNavigator />
			</NavigationContainer>
		);

		expect(getByText("HOME")).toBeTruthy();

		const helpTab = getByText("HELP");

		fireEvent.press(helpTab);

		waitFor(() => {
			expect(getByText("Frequently Asked Questions")).toBeTruthy();
		});
	});
});
