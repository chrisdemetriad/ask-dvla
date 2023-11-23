import React, { useState } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBox = ({ fetchVehicleData, number, setNumber }) => {
	const handleSubmitEditing = () => {
		fetchVehicleData(number);
	};

	const handleFocus = () => {
		setNumber("");
	};

	return (
		<View style={styles.form} accessibilityLabel={"Search box"}>
			<View style={styles.sideInfo}>
				<Image style={styles.stars} source={require("./../assets/eurostars.png")} />
				<Text style={styles.countryCode}>GB</Text>
			</View>
			<TextInput value={number} onSubmitEditing={handleSubmitEditing} autoCapitalize="characters" spellCheck={false} autoCorrect={false} textAlign={"center"} onChangeText={setNumber} onFocus={handleFocus} style={styles.input} placeholder="BA65 PDQ" />
			<TouchableOpacity onPress={handleSubmitEditing} style={styles.searchIcon}>
				<MaterialIcons name="search" size={30} color="#000" />
			</TouchableOpacity>
		</View>
	);
};

export default SearchBox;

const styles = StyleSheet.create({
	error: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 20,
		marginBottom: 10,
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
	searchIconContainer: {
		position: "absolute",
		top: 14,
		left: 10,
	},
	searchIcon: {
		width: 40,
		height: 40,
		transform: [{ scaleX: -1 }],
	},
	search: {
		paddingVertical: 4,
		paddingHorizontal: 10,
		height: 70,
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
		fontSize: 18,
		textAlignVertical: "center",
	},
});
