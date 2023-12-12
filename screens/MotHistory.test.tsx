import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import MotHistory from "./MotHistory";

describe("MotHistory", () => {
	it("MotHistory renders correctly", async () => {
		const { getByTestId } = render(<MotHistory />);

		await waitFor(() => {
			expect(getByTestId("mot-history")).toBeVisible();
		});
	});
});
