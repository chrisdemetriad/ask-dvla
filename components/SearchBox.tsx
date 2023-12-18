import React, { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SvgUKFlag from "./SvgUKFlag";
import { Chip } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchBoxProps {
	fetchVehicleData: (number: string) => void;
	number: string;
	setNumber: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ fetchVehicleData, number, setNumber }) => {
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<TextInput | null>(null);
	const [pastSearches, setPastSearches] = useState<string[]>([]);

	const handleSelectPastSearch = async (search: string) => {
		setNumber(search);
		try {
			const result = await fetchVehicleData(search);
			saveSearch(search);
		} catch (error) {
			console.error("Error in fetching data: ", error);
		}
	};

	const handleSubmitEditing = async () => {
		try {
			const result = fetchVehicleData(number);
			console.log("result", result);
			if (result !== null) {
				saveSearch(number);
			} else {
				console.error("No valid data returned from API");
			}
		} catch (error) {
			console.error("Error in fetching data: ", error);
		}
	};

	const handleFocus = () => {
		setNumber("");
		setIsFocused(true);
		inputRef.current && inputRef.current.focus();
	};

	const handleBlur = () => {
		setIsFocused(false);
	};
	const saveSearch = async (search: string) => {
		try {
			const storedSearches = await AsyncStorage.getItem("pastSearches");
			let updatedSearches = storedSearches ? JSON.parse(storedSearches) : [];
			const searchIndex = updatedSearches.indexOf(search);
			if (searchIndex === -1) {
				updatedSearches = [search, ...updatedSearches].slice(0, 3);
			}

			await AsyncStorage.setItem("pastSearches", JSON.stringify(updatedSearches));
			setPastSearches(updatedSearches);
		} catch (error) {
			console.error("Error saving search: ", error);
		}
	};

	const deletePastSearch = async (search: string) => {
		const updatedSearches = pastSearches.filter((s) => s !== search);
		setPastSearches(updatedSearches);
		await AsyncStorage.setItem("pastSearches", JSON.stringify(updatedSearches));
	};

	const getPastSearches = async () => {
		try {
			const storedSearches = await AsyncStorage.getItem("pastSearches");

			if (storedSearches) {
				const parsedSearches = JSON.parse(storedSearches);
				setPastSearches(parsedSearches);
			}
		} catch (error) {
			console.error("Error getting past searches: ", error);
		}
	};

	useEffect(() => {
		getPastSearches();
	}, []);

	return (
		<View>
			<View style={styles.pastSearches}>
				{pastSearches.map((search, index) => (
					<Chip
						style={search === number ? styles.selectedChip : {}}
						mode={search === number ? "flat" : "outlined"}
						key={index}
						onPress={() => handleSelectPastSearch(search)}
						onClose={() => deletePastSearch(search)}
						closeIcon="close"
						selected={search === number}
						selectedColor={search === number ? "#fdc832" : "#ccc"}
						accessibilityLabel={`Past search ${search}`}
						compact={true}
					>
						<Text style={styles.pastSearch}>{search}</Text>
					</Chip>
				))}
			</View>
			<View testID="search" style={styles.plate} accessibilityLabel="Search box">
				<View style={styles.country}>
					<SvgUKFlag />
					<Text style={styles.countryCode}>GB</Text>
				</View>

				<TouchableOpacity onPress={handleFocus} style={styles.inputContainer}>
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
						<TouchableOpacity onPress={handleSubmitEditing} testID="search-icon">
							<MaterialIcons name="search" size={40} color="#666" />
						</TouchableOpacity>
					)}
				</View>
			</View>
		</View>
	);
};

export default SearchBox;

const styles = StyleSheet.create({
	pastSearches: {
		marginBottom: 10,
		justifyContent: "space-between",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	pastSearch: {},
	selectedChip: {
		backgroundColor: "#0076bc",
		color: "#fff",
	},
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
		fontSize: 16,
	},
	inputContainer: {
		flex: 1,
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
