import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import MotAndTax from "./MotAndTax";

describe("MotAndTax", () => {
	it("MotAndTax renders correctly", async () => {
		const { getByTestId } = render(<MotAndTax />);

		await waitFor(() => {
			expect(getByTestId("check-mot-tax")).toBeVisible();
		});
	});
});
