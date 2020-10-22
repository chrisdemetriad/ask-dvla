import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TextInput, View, Image } from "react-native";
import styles from "./App.style.js";
import { API_KEY } from "@env";

import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function App() {
	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./assets/roboto.ttf"),
	});

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
		// console.log("Registration plate number is " + number);
	};

	const { make, colour, engineCapacity, fuelType, revenueWeight, yearOfManufacture, motStatus, motExpiryDate, taxStatus, taxDueDate } = data;
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.form}>
					<View style={styles.sideInfo}>
						<Image style={styles.stars} source={require("./assets/eurostars.png")} />
						<Text style={styles.countryCode}>GB</Text>
					</View>
					<TextInput onSubmitEditing={onPress} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={onChangeText} style={styles.input} placeholder="BA65 PDQ" placeholderTextColor="#e1ac18" caretHidden clearTextOnFocus />
					{/* <TouchableOpacity style={styles.searchIconContainer} onPress={onPress}>
						<Image style={styles.searchIcon} source={require("./assets/search.png")} />
					</TouchableOpacity> */}
				</View>
				{data.make && (
					<View style={styles.results}>
						<Text style={styles.overview}>
							{yearOfManufacture} {make}, {colour}, {engineCapacity}cc, {fuelType}
							{revenueWeight && ", " + revenueWeight + "kg"}
						</Text>

						<View style={styles.mtContainer}>
							<View style={styles.common}>
								{motStatus == "Not valid" ? <Text style={[styles.status, styles.statusError]}>MOT Not Valid</Text> : <Text style={styles.status}>{motStatus}</Text>}
								<Text style={styles.title}>Mot</Text>
								<Text style={styles.date}>{motExpiryDate}</Text>
							</View>
							<View style={(styles.tax, styles.common)}>
								{taxStatus == "SORN" ? <Text style={[styles.status, styles.statusError]}>DECLARED SORN</Text> : <Text style={styles.status}>{taxStatus}</Text>}
								<Text style={styles.title}>Tax</Text>
								<Text style={styles.date}>{taxDueDate}</Text>
							</View>
						</View>
					</View>
				)}
				{!data.make && <Text style={styles.error}>Please enter a valid registration plate number.</Text>}
			</View>
		);
	}
}
