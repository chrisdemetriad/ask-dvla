import React, { memo } from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";
// import styles from "./../App.style.js";
import { StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Line from "./Line.js";

const styles = StyleSheet.create({
	vehicleDetails: {
		color: "black",
		fontSize: 24,
		marginBottom: 20,
		marginTop: 20,
		fontFamily: "RobotoCondensed_300Light",
	},
	taxContainer: {
		display: "flex",
		flexDirection: "row",
	},
	statusContainer: {
		display: "flex",
		fontSize: 22,
		paddingVertical: 30,
		width: "50%",
		alignItems: "center",
	},
	statusText: {
		fontFamily: "RobotoCondensed_300Light",
		color: "black",
	},
	statusError: {
		color: "red",
	},
	title: {
		fontFamily: "UKNumberPlate_Regular",
		fontSize: 40,
		color: "#666666",
		marginBottom: 30,
	},
	date: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 26,
		color: "black",
	},
});

const VehicleDetails = ({ vehicleData }) => {
	const { make, yearOfManufacture, colour, engineCapacity, fuelType, revenueWeight, motStatus, motExpiryDate, taxStatus, taxDueDate } = vehicleData;

	const openTaxLink = () => {
		Linking.openURL("https://www.gov.uk/vehicle-tax");
	};

	return (
		<View>
			<Text style={styles.vehicleDetails}>
				{yearOfManufacture} {make}, {colour}, {engineCapacity}cc, {fuelType}
				{revenueWeight && ", " + revenueWeight + "kg"}
			</Text>
			<Line />
			<View style={styles.taxContainer}>
				<View style={styles.statusContainer}>
					{motStatus == "Not valid" ? (
						<View>
							<AntDesign name="warning" size={34} color="red" />
							<Text style={[styles.statusText, styles.statusError]}>NOT VALID</Text>
						</View>
					) : (
						<View>
							<MaterialIcons name="check" size={34} color="green" />
							<Text style={styles.statusText}>{motStatus}</Text>
						</View>
					)}
					<Text style={styles.title}>Mot</Text>
					<Text style={styles.date}>{motExpiryDate}</Text>
				</View>
				<View style={styles.statusContainer}>
					{taxStatus == "SORN" ? (
						<TouchableOpacity onPress={openTaxLink}>
							<View>
								<AntDesign name="warning" size={34} color="red" />
								<Text style={[styles.statusText, styles.statusError]}>SORN</Text>
							</View>
						</TouchableOpacity>
					) : (
						<View>
							<MaterialIcons name="check" size={34} color="green" />
							<Text style={styles.statusText}>{taxStatus}</Text>
						</View>
					)}
					<Text style={styles.title}>Road</Text>
					<Text style={styles.date}>{taxDueDate}</Text>
				</View>
			</View>
		</View>
	);
};

export default memo(VehicleDetails);
