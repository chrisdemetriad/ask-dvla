import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback, YellowBox } from "react-native";
import styles from "./App.style.js";
import { API_KEY } from "@env";

import { AppLoading } from "expo";
import { useFonts } from "expo-font";

export default function App() {
	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./assets/UKNumberPlate.ttf"),
		RobotoCondensed_300Light: require("./assets/RobotoCondensed-Light.ttf"),
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
		console.log("Regplate number is " + number);
	};

	const { make, colour, engineCapacity, fuelType, revenueWeight, yearOfManufacture, motStatus, motExpiryDate, taxStatus, taxDueDate } = data;
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
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
					</View>
				)}
				{!data.make && <Text style={styles.error}>Number is not valid.</Text>}
			</View>
		);
	}
}
