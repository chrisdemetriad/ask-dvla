import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import appStyles from "./../App.style.js";
import { useFonts } from "expo-font";
import VehicleDetails from "../components/VehicleDetails.js";
import useVehicleData from "../hooks/useVehicleData.js";
import SearchBox from "../components/SearchBox";

const HomeScreen = () => {
	const [number, setNumber] = useState("");
	const { data, isLoading, error, fetchVehicleData } = useVehicleData();

	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./../assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./../assets/roboto.ttf"),
	});

	if (isLoading || !fontsLoaded) {
		return (
			<View style={[styles.container, styles.centerContent]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	} else {
		return (
			<View style={[styles.container, appStyles.container]} accessibilityLabel={"Homepage"}>
				{!data.make && (
					<View>
						<Text style={styles.info}>Please enter a valid registration plate number</Text>
					</View>
				)}
				<SearchBox fetchVehicleData={fetchVehicleData} number={number} setNumber={setNumber} />
				{data.make && <VehicleDetails vehicleData={data} />}
				{error && <Text style={[styles.info, styles.error]}>{error}</Text>}
				<StatusBar style="light" />
			</View>
		);
	}
};

export default HomeScreen;

const styles = StyleSheet.create({
	info: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	error: {
		color: "red",
	},
	container: {
		padding: 20,
		width: "100%",
	},
	centerContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
