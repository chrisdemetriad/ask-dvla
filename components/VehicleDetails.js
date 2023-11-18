import React from "react";
import { Text, View } from "react-native";
import styles from "./../App.style.js";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Line from "./Line.js";

const VehicleDetails = ({ vehicleData }) => {
	const { make, yearOfManufacture, colour, engineCapacity, fuelType, revenueWeight, motStatus, motExpiryDate, taxStatus, taxDueDate } = vehicleData;

	return (
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
	);
};

export default VehicleDetails;