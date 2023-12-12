import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import useMotHistory from "../hooks/useMotHistory";
import SearchBox from "../components/SearchBox";
import { useTheme } from "../ThemeContext";
import getStyles from "../App.style";

const MotHistory: React.FC = () => {
	const [number, setNumber] = useState("");
	const { data, isLoading, error, fetchVehicleData } = useMotHistory();

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
			<View testID="mot-history" style={[styles.screen, appStyles.container]} accessibilityLabel="Loading">
				<ActivityIndicator size="large" color="#0076bc" />
			</View>
		);
	} else {
		return (
			<View testID="mot-history" style={[styles.screen, appStyles.container]} accessibilityLabel="Mot History">
				<Text style={styles.title}>MOT History</Text>
				<View style={[styles.container, appStyles.centeredContainer, appStyles.container]}>
					<SearchBox fetchVehicleData={fetchVehicleData} number={number} setNumber={setNumber} />
				</View>
			</View>
		);
	}
};

export default MotHistory;
