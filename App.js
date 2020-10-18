import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { API_KEY } from "@env";

export default function App() {
	const [data, setData] = useState({});
	const [number, setNumber] = useState("");
	const url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

	const load = async (number) => {
		console.log("loadcalled: ", number);
		const response = await fetch(url, {
			body: '{"registrationNumber":"' + number + '"}',
			// body: '{"registrationNumber": "YT17 EFM"}',
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": API_KEY,
			},
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				console.log(data.make, data.colour);
			})
			.catch((error) => console.error(error));
	};

	const onPress = () => {
		load(number);
	};

	const onChangeText = (number) => {
		setNumber(number);
		console.log("Regplate number is " + number);
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={onChangeText} style={styles.input} placeholder="BA65 PDQ" />
				<TouchableOpacity onPress={onPress}>
					<Text style={styles.search}>SEARCH</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.results}>
				<Text style={styles.overview}>
					{data.yearOfManufacture} {data.make}, {data.colour}, {data.engineCapacity}cc, {data.fuelType}, {data.revenueWeight}kg
				</Text>
				<View style={styles.mottax}>
					<Text style={styles.mot}>
						{data.motStatus} {data.motExpiryDate}
					</Text>
					<Text style={styles.tax}>
						{data.taxStatus} {data.taxDueDate}
					</Text>
				</View>
				{Object.entries(data).map(([key, value]) => {
					return (
						<Text key={key} style={styles.result}>
							{key} {value}
						</Text>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	overview: { color: "white", fontSize: 23 },
	mottax: {},
	mot: {},
	tax: {},

	container: {
		flex: 1,
		backgroundColor: "#1a2a57",
		// alignItems: "center",
		color: "#ffffff",
		justifyContent: "center",
		padding: 20,
	},
	form: {
		flexDirection: "row",
	},
	input: {
		borderColor: "green",
		borderWidth: 6,

		paddingVertical: 4,
		paddingHorizontal: 10,
		height: 70,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,

		backgroundColor: "yellow",
		fontSize: 35,

		// textAlignVertical: "center",
		textDecorationLine: "none",
	},
	search: {
		borderColor: "green",
		borderWidth: 6,
		paddingVertical: 4,
		paddingHorizontal: 10,
		height: 70,
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,

		backgroundColor: "green",
		fontSize: 22,

		color: "yellow",

		textAlignVertical: "center",
	},
	results: {
		marginTop: 20,
		// padding: 5,
		// backgroundColor: "#1a2a57",
	},
	result: {
		color: "pink",
		marginBottom: 2,
		fontSize: 20,
	},
});
