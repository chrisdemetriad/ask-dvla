import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, Button } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { API_KEY } from "@env";

export default function App() {
	const [data, setData] = useState({});

	const url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

	const load = async () => {
		const response = await fetch(url, {
			body: '{"registrationNumber": "YT17 EFM"}',
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": API_KEY,
			},
			method: "POST",
		})
			.then((response) => response.json())
			.then((dt) => {
				setData(dt);
				console.log(data);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		load();
	}, []);

	return (
		<View style={styles.container}>
			<TextInput style={styles.input} value="BA65 PDQ" />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a2a57",
		alignItems: "center",
		color: "#ffffff",
		justifyContent: "center",
		padding: 20,
	},
	input: {
		borderColor: "green",
		borderWidth: 10,
		paddingHorizontal: 40,
		paddingVertical: 4,
		borderRadius: 10,
		backgroundColor: "yellow",
		fontSize: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
});
