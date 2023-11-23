import React, { useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SvgUKFlag from "./SvgUKFlag";

const SearchBox = ({ fetchVehicleData, number, setNumber }) => {
	const handleSubmitEditing = () => {
		fetchVehicleData(number);
	};

	const handleFocus = () => {
		setNumber("");
	};

	return (
		<View style={styles.plate} accessibilityLabel={"Search box"}>
			<View style={styles.country}>
				<SvgUKFlag />
				<Text style={styles.countryCode}>GB</Text>
			</View>
			<View>
				<TextInput value={number} onSubmitEditing={handleSubmitEditing} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={setNumber} onFocus={handleFocus} style={styles.input} placeholder="BA65 PDQ" />
			</View>
			<View style={styles.search}>
				<TouchableOpacity onPress={handleSubmitEditing}>
					<MaterialIcons name="search" size={40} color="#666" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default SearchBox;

const styles = StyleSheet.create({
	plate: {
		display: "flex",
		flexDirection: "row",
		borderRadius: 6,
		justifyContent: "space-between",
		backgroundColor: "#fdc832",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 20,
		width: "100%",
	},
	country: {
		display: "flex",
		justifyContent: "space-evenly",
		padding: 2,
		backgroundColor: "#0076bc",
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,
	},
	countryCode: {
		color: "#fff",
		fontFamily: "UKNumberPlate_Regular",
		alignSelf: "center",
	},
	input: {
		backgroundColor: "#fdc832",
		fontFamily: "UKNumberPlate_Regular",
		fontSize: 55,
		textDecorationLine: "none",
	},
	search: {
		display: "flex",
		justifyContent: "space-evenly",
		paddingHorizontal: 5,
	},
	error: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 20,
		marginBottom: 10,
	},
});
