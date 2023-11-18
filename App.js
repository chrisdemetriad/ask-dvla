import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Image } from "react-native";
import styles from "./App.style.js";
import { API_URL, API_TOKEN } from "@env";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import Line from "./components/Line.js";

export default function App() {
	const [data, setData] = useState({});
	const [number, setNumber] = useState("");

	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./assets/roboto.ttf"),
	});

	const load = async (number) => {
		const response = await fetch(API_URL, {
			body: '{"registrationNumber":"' + number + '"}',
			headers: {
				"Content-Type": "application/json",
				"X-Api-Key": API_TOKEN,
			},
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				setData(data);
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
	};

	const { make, colour, engineCapacity, fuelType, revenueWeight, yearOfManufacture, motStatus, motExpiryDate, taxStatus, taxDueDate } = data;
	if (!fontsLoaded) {
		return null;
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
				{data.make ? <VehicleDetails vehicleData={data} /> : <Text style={styles.error}>Please enter a valid registration plate number.</Text>}
				<StatusBar style="light" />
			</View>
		);
	}
}

// reg number types - for later: https://gist.github.com/danielrbradley/7567269
