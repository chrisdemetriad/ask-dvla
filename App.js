import React, { useState } from "react";
import { Text, TextInput, View, Image } from "react-native";
import styles from "./App.style.js";
import { API_KEY } from "@env";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

import Line from "./components/Line";

export default function App() {
	const [data, setData] = useState({});
	const [number, setNumber] = useState("");

	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./assets/roboto.ttf"),
	});

	const url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles";

	const load = async (number) => {
		// console.log("load() called: ", number);
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
					<TextInput onSubmitEditing={onPress} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={onChangeText} style={styles.input} placeholder="BA65 PDQ" />
				</View>
				{data.make && (
					<View style={styles.results}>
						<Text style={styles.overview}>
							{yearOfManufacture} {make}, {colour}, {engineCapacity}cc, {fuelType}
							{revenueWeight && ", " + revenueWeight + "kg"}
						</Text>
						<Line />
						<View style={styles.resultsContainer}>
							<View style={styles.common}>
								{motStatus == "Not valid" ? (
									<View>
										<AntDesign name="warning" size={34} color="red" />
										<Text style={[styles.status, styles.statusError]}>NOT VALID</Text>
									</View>
								) : (
									<View>
										<MaterialIcons name="check" size={34} color="green" />
										<Text style={styles.status}>{motStatus}</Text>
									</View>
								)}
								<Text style={styles.title}>Mot</Text>
								<Text style={styles.date}>{motExpiryDate}</Text>
							</View>
							<View style={(styles.tax, styles.common)}>
								{taxStatus == "SORN" ? (
									<View>
										<AntDesign name="warning" size={34} color="red" />
										<Text style={[styles.status, styles.statusError]}>SORN</Text>
									</View>
								) : (
									<View>
										<MaterialIcons name="check" size={34} color="green" />
										<Text style={styles.status}>{taxStatus}</Text>
									</View>
								)}
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

// reg number types - for later: https://gist.github.com/danielrbradley/7567269
