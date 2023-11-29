import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
	it("HomeScreen renders correctly", async () => {
		const { getByTestId } = render(<HomeScreen />);

		await waitFor(() => {
			expect(getByTestId("home-screen")).toBeVisible();
		});
	});
});
