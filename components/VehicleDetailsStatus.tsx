import React, { memo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import OpenLinkButton from "./OpenLinkButton";
import { useTheme } from "./../ThemeContext";

const VehicleDetailsStatus: React.FC<{
	isValid: boolean;
	title: string;
	statusText: string;
	date: string;
}> = ({ isValid, title, statusText, date }) => {
	const { isDarkTheme } = useTheme();

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
			color: isDarkTheme ? "#eee" : "#333",
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
			color: isDarkTheme ? "#eee" : "#333",
		},
		linkButton: {
			marginVertical: 24,
		},
	});

	return (
		<View style={styles.statusContainer} testID="vehicle-details-status">
			{isValid ? (
				<>
					<MaterialIcons name="check" size={34} color="green" />
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.statusText}>{statusText}</Text>
					<Text style={styles.date}>{date}</Text>
				</>
			) : (
				<>
					<AntDesign name="warning" size={34} color="red" />
					<Text style={styles.title}>{title}</Text>
					<Text style={[styles.statusText, styles.statusError]}>{statusText}</Text>
					<View style={styles.linkButton}>
						<OpenLinkButton buttonText={title !== "Mot" ? "Tax your vehicle" : "Getting an MOT"} linkUrl={title !== "Mot" ? "https://www.gov.uk/vehicle-tax" : "https://www.gov.uk/getting-an-mot"} />
					</View>
				</>
			)}
		</View>
	);
};

export default memo(VehicleDetailsStatus);
