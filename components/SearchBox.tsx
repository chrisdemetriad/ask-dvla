import React, { useState, useRef } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SvgUKFlag from "./SvgUKFlag";

interface SearchBoxProps {
	fetchVehicleData: (number: string) => void;
	number: string;
	setNumber: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ fetchVehicleData, number, setNumber }) => {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<TextInput | null>(null);

	const handleFocus = () => {
		setNumber("");
		setIsFocused(true);
		inputRef.current && inputRef.current.focus();
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const handleSubmitEditing = () => {
		fetchVehicleData(number);
	};

	return (
		<View style={styles.plate} accessibilityLabel={"Search box"}>
			<View style={styles.country}>
				<SvgUKFlag />
				<Text style={styles.countryCode}>GB</Text>
			</View>

			<TouchableOpacity style={{ flex: 1 }} onPress={handleFocus}>
				<View>
					<TextInput
						ref={inputRef}
						maxLength={7}
						placeholder={!isFocused ? "REG NO" : ""}
						placeholderTextColor={"#999"}
						onBlur={handleBlur}
						onFocus={handleFocus}
						onChangeText={setNumber}
						onSubmitEditing={handleSubmitEditing}
						value={number}
						autoCapitalize="characters"
						spellCheck={false}
						autoCorrect={false}
						style={styles.input}
					/>
				</View>
			</TouchableOpacity>

			<View style={styles.search}>
				{number !== "" && isFocused && (
					<TouchableOpacity onPress={handleSubmitEditing}>
						<MaterialIcons name="search" size={40} color="#666" />
					</TouchableOpacity>
				)}
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
		color: "#333",
		fontFamily: "UKNumberPlate_Regular",
		fontSize: 55,
		height: 65,
		textDecorationLine: "none",
		textAlign: "center",
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
