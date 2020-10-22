import { StyleSheet } from "react-native";

export default StyleSheet.create({
	overview: {
		color: "black",
		fontSize: 24,
		marginBottom: 20,
		marginTop: 20,
		fontFamily: "RobotoCondensed_300Light",
	},

	common: {
		display: "flex",
		fontSize: 22,
		paddingVertical: 30,
		width: "50%",
	},
	status: {
		fontFamily: "RobotoCondensed_300Light",
		color: "black",
	},
	mtContainer: {
		display: "flex",
		flexDirection: "row",
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
	statusError: {
		color: "red",
	},
	error: {
		fontFamily: "RobotoCondensed_300Light",
		fontSize: 16,
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
	container: {
		flex: 1,
		color: "#ffffff",
		justifyContent: "center",
		padding: 20,
		width: "100%",
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
		// textAlignVertical: "center",
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
