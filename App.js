import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, YellowBox } from "react-native";
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
				// console.log(data.errors[0].code);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const onPress = () => {
		load(number);
	};

	const onChangeText = (number) => {
		setNumber(number);
		console.log("Regplate number is " + number);
	};

	const { make, colour, engineCapacity, fuelType, revenueWeight, yearOfManufacture, motStatus, motExpiryDate, taxStatus, taxDueDate } = data;

	const styles = StyleSheet.create({
		overview: { color: "white", fontSize: 23 },
		mottax: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
		mot: {
			borderTopStartRadius: 5,
			borderBottomStartRadius: 5,
		},
		tax: {
			borderTopEndRadius: 5,
			borderBottomEndRadius: 5,
		},
		common: {
			backgroundColor: "green",
			display: "flex",
			alignItems: "center",
			fontSize: 22,
			paddingVertical: 30,
			width: "50%",

			color: "white",
			position: "relative",
		},
		label: {
			position: "absolute",
			color: "yellow",
			top: 2,
			left: 4,
		},
		error: {
			backgroundColor: "darkred",
			fontSize: 23,
			color: "yellow",
			padding: 10,
		},
		searchIconContainer: {
			position: "absolute",
			top: 14,
			left: 10,
		},
		searchIcon: {
			width: 40,
			height: 40,
			transform: [{ scaleX: -1 }],
		},
		container: {
			flex: 1,
			backgroundColor: "#1a2a57",
			// alignItems: "center",
			color: "#ffffff",
			justifyContent: "center",
			padding: 20,
			width: "100%",
		},
		form: {
			// flexDirection: "row",
			display: "flex",
			position: "relative",
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
			fontSize: 18,

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

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<TextInput onSubmitEditing={onPress} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={onChangeText} style={styles.input} placeholder="BA65 PDQ" />
				<TouchableOpacity style={styles.searchIconContainer} onPress={onPress}>
					{/* <Text style={styles.search}>SEARCH</Text> */}
					<Image style={styles.searchIcon} source={require("./assets/search.png")} />
				</TouchableOpacity>
			</View>
			{data.make && (
				<View style={styles.results}>
					<Text style={styles.overview}>
						{yearOfManufacture} {make}, {colour}, {engineCapacity}cc, {fuelType}
						{revenueWeight && ", " + revenueWeight + "kg"}
					</Text>
					<Text></Text>
					<View style={styles.mottax}>
						<View style={[styles.mot, styles.common]}>
							<Text style={styles.label}>{motStatus == "Not valid" ? <Text>MOT Not Valid</Text> : motStatus}</Text>
							<Text style={styles.date}>{motExpiryDate}</Text>
						</View>
						<View style={[styles.tax, styles.common]}>
							<Text style={styles.label}>{taxStatus == "Sorn" ? <Text>SOOOORN</Text> : taxStatus}</Text>
							<Text style={styles.date}>{taxDueDate}</Text>
						</View>
					</View>
					{/* {Object.entries(data).map(([key, value]) => {
					return (
						<Text key={key} style={styles.result}>
							{key} {value}
						</Text>
					);
				})} */}
				</View>
			)}
			{!data.make && <Text style={styles.error}>Number is not valid.</Text>}
		</View>
	);
}
