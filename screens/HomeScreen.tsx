import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import VehicleDetails from "../components/VehicleDetails";
import useVehicleData from "../hooks/useVehicleData";
import SearchBox from "../components/SearchBox";
import { useTheme } from "./../ThemeContext";
import getStyles from "./../App.style";

const HomeScreen: React.FC = () => {
	const [number, setNumber] = useState("");
	const { data, isLoading, error, fetchVehicleData } = useVehicleData();

	const { isDarkTheme } = useTheme();
	const appStyles = getStyles(isDarkTheme);

	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./../assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./../assets/roboto.ttf"),
	});

	const styles = StyleSheet.create({
		screen: {
			flex: 1,
		},
		info: {
			fontFamily: "RobotoCondensed_300Light",
			fontSize: 20,
			marginTop: 10,
			marginBottom: 10,
			color: isDarkTheme ? "#eee" : "#333",
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
		title: {
			fontSize: 24,
			fontWeight: "bold",
			padding: 15,
			color: isDarkTheme ? "#eee" : "#333",
		},
		centered: {
			flex: 1,
		},
	});

	if (isLoading || !fontsLoaded) {
		return (
			<View testID="check-mot-tax" style={[styles.screen, appStyles.container]} accessibilityLabel="Loading">
				<ActivityIndicator size="large" color="#0076bc" />
			</View>
		);
	} else {
		return (
			<View testID="check-mot-tax" style={[styles.screen, appStyles.container]} accessibilityLabel="Check MOT and Vehicle Tax">
				<Text style={styles.title}>Check MOT and Vehicle Tax</Text>
				{/* <ScrollView style={styles.centered}> */}
				<View style={[styles.container, appStyles.centeredContainer, appStyles.container]}>
					{!data.make && (
						<View>
							<Text style={styles.info}>Please enter a valid registration plate number</Text>
						</View>
					)}
					<SearchBox fetchVehicleData={fetchVehicleData} number={number} setNumber={setNumber} />
					{data.make && !error && <VehicleDetails vehicleData={data} />}
					{error && <Text style={[styles.info, styles.error]}>{error}</Text>}
				</View>
				{/* </ScrollView> */}
			</View>
		);
	}
};

export default HomeScreen;
