import { StyleSheet } from "react-native";

const getStyles = (isDarkTheme) =>
	StyleSheet.create({
		container: {
			backgroundColor: isDarkTheme ? "#111" : "#FFF",
		},
		centeredContainer: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: isDarkTheme ? "#000" : "#FFF",
		},
		text: {
			color: isDarkTheme ? "#FFF" : "#000",
		},
	});

export default getStyles;
