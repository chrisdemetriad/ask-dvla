import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import {} from "react-native";
import Line from "./Line";
import VehicleDetailsStatus from "./VehicleDetailsStatus";
import { useTheme } from "./../ThemeContext";

interface VehicleData {
	make?: string;
	yearOfManufacture?: string;
	colour?: string;
	engineCapacity?: string;
	fuelType?: string;
	revenueWeight?: string;
	motStatus?: string;
	motExpiryDate?: string;
	taxStatus?: string;
	taxDueDate?: string;
}

interface VehicleDetailsProps {
	vehicleData?: VehicleData;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleData }) => {
	const { isDarkTheme } = useTheme();
	const { make = "", yearOfManufacture = "", colour = "", engineCapacity = "", fuelType = "", revenueWeight = "", motStatus = "", motExpiryDate = "", taxStatus = "", taxDueDate = "" } = vehicleData || {};

	const styles = StyleSheet.create({
		vehicleDetails: {
			color: isDarkTheme ? "#eee" : "#333",
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
			marginTop: 30,
		},
		date: {
			fontFamily: "RobotoCondensed_300Light",
			fontSize: 26,
			color: "black",
		},
		linkButton: {
			marginVertical: 24,
		},
	});

	if (!make || !yearOfManufacture) {
		return <Text style={styles.statusError}>No vehicle data available.</Text>;
	}

	return (
		<View testID="vehicle-details">
			<Text style={styles.vehicleDetails}>
				{yearOfManufacture} {make}, {colour}, {engineCapacity}cc, {fuelType}
				{revenueWeight && ", " + revenueWeight + "kg"}
			</Text>
			<Line />
			<View style={styles.taxContainer}>
				<VehicleDetailsStatus isValid={motStatus === "Valid"} title="Mot" statusText={motStatus === "Valid" ? "VALID" : "NOT VALID"} date={motExpiryDate} />
				<VehicleDetailsStatus isValid={taxStatus === "Taxed"} title="Road" statusText={taxStatus === "Taxed" ? "TAXED" : "SORN"} date={taxDueDate} />
			</View>
		</View>
	);
};

export default memo(VehicleDetails);
