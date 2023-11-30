import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OpenLinkButton from "./OpenLinkButton";
import { Linking } from "react-native";

jest.mock("react-native/Libraries/Linking/Linking", () => ({
	canOpenURL: jest.fn(),
	openURL: jest.fn(),
}));

describe("OpenLinkButton", () => {
	const buttonText = "Test Button";
	const linkUrl = "https://www.gov.uk/vehicle-tax";
	let consoleSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.clearAllMocks();
		consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	beforeAll(() => {
		// Mocking then restoring console.log to prevent it from outputting during tests
		jest.spyOn(console, "log").mockImplementation(() => {});
	});

	afterAll(() => {
		(console.log as jest.Mock).mockRestore();
	});

	afterEach(() => {
		jest.resetAllMocks;
		consoleSpy.mockRestore();
	});

	it("renders correctly", () => {
		const { getByText } = render(<OpenLinkButton buttonText={buttonText} linkUrl={linkUrl} />);
		expect(getByText(buttonText)).toBeTruthy();
	});

	it("logs an error when Linking throws", async () => {
		const error = new Error("Test error");
		(Linking.canOpenURL as jest.Mock).mockResolvedValue(true);
		(Linking.openURL as jest.Mock).mockRejectedValue(error);

		const { getByText } = render(<OpenLinkButton buttonText={buttonText} linkUrl={linkUrl} />);
		fireEvent.press(getByText(buttonText));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith("An error occurred", error);
		});
	});

	it("opens link on press", async () => {
		(Linking.canOpenURL as jest.Mock).mockResolvedValue(true);
		const { getByText } = render(<OpenLinkButton buttonText={buttonText} linkUrl={linkUrl} />);

		fireEvent.press(getByText(buttonText));

		await waitFor(() => {
			expect(Linking.canOpenURL).toHaveBeenCalledWith(linkUrl);
			expect(Linking.openURL).toHaveBeenCalledWith(linkUrl);
		});
	});
	it("does not open link if not supported", async () => {
		(Linking.canOpenURL as jest.Mock).mockResolvedValue(false);
		const { getByText } = render(<OpenLinkButton buttonText={buttonText} linkUrl={linkUrl} />);

		fireEvent.press(getByText(buttonText));

		await waitFor(() => {
			expect(Linking.canOpenURL).toHaveBeenCalledWith(linkUrl);
			expect(Linking.openURL).not.toHaveBeenCalled();
		});
	});
});
