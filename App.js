import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, Button } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function App() {
	const [data, setData] = useState({});

	const url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";
	const API_KEY = "nice one :)";

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
			<StatusBar style="auto" />
			<TextInput style={styles.input} value="BA65 PDQ" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {},
});
