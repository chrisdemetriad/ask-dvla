import React from "react";
import { render } from "@testing-library/react-native";
import Line from "./Line";

describe("Line", () => {
	it("renders correctly", () => {
		const { getByTestId } = render(<Line />);

		expect(getByTestId("line")).toBeVisible();
	});
});
