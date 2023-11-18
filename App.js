import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View, Image } from "react-native";
import styles from "./App.style.js";
import { useFonts } from "expo-font";
import VehicleDetails from "./components/VehicleDetails.js";
import useVehicleData from "./hooks/useVehicleData.js";

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
