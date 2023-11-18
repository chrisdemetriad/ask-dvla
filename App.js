import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Image } from "react-native";
// import styles from "./App.style.js";
import { useFonts } from "expo-font";
import VehicleDetails from "./components/VehicleDetails.js";
import useVehicleData from "./hooks/useVehicleData.js";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	error: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 16,
	},
	container: {
		flex: 1,
		color: "#ffffff",
		justifyContent: "center",
		padding: 20,
		width: "100%",
	},
	form: {
		display: "flex",
		position: "relative",
		flexDirection: "row",
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 6,
		justifyContent: "flex-start",
		backgroundColor: "#0076bc",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.39,
		shadowRadius: 8.3,

		elevation: 13,
	},
	sideInfo: {
		display: "flex",
		justifyContent: "flex-end",
	},
	stars: {
		width: 26,
		margin: 4,
		height: 30,
		marginTop: 10,
	},
	countryCode: {
		color: "#fdc832",
		fontFamily: "UKNumberPlate_Regular",
		flexGrow: 1,
		display: "flex",
		alignSelf: "center",
	},
	input: {
		flexGrow: 1,
		paddingVertical: 4,
		paddingHorizontal: 5,
		height: 70,
		backgroundColor: "#fdc832",
		fontFamily: "UKNumberPlate_Regular",
		fontSize: 55,
		textDecorationLine: "none",
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
	},
});

const App = () => {
	const { data, isLoading, error, fetchVehicleData } = useVehicleData();
	const [number, setNumber] = useState("");

	let [fontsLoaded] = useFonts({
		UKNumberPlate_Regular: require("./assets/uknumberplate.ttf"),
		RobotoCondensed_300Light: require("./assets/roboto.ttf"),
	});

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
					<TextInput onSubmitEditing={() => fetchVehicleData(number)} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={setNumber} style={styles.input} placeholder="BA65 PDQ" />
				</View>
				{data.make ? <VehicleDetails vehicleData={data} /> : <Text style={styles.error}>Please enter a valid registration plate number.</Text>}
				<StatusBar style="light" />
			</View>
		);
	}
};

export default App;

// reg number types - for later: https://gist.github.com/danielrbradley/7567269
