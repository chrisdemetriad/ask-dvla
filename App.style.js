import { StyleSheet } from "react-native";

export default StyleSheet.create({
	overview: { color: "white", fontSize: 23 },
	mottax: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
	mot: {
		borderTopStartRadius: 5,
		borderBottomStartRadius: 5,
	},
	tax: {
		borderTopEndRadius: 5,
		borderBottomEndRadius: 5,
	},
	common: {
		backgroundColor: "green",
		display: "flex",
		alignItems: "center",
		fontSize: 22,
		paddingVertical: 30,
		width: "50%",

		color: "white",
		position: "relative",
	},
	label: {
		position: "absolute",
		color: "yellow",
		top: 2,
		left: 4,
	},
	error: {
		backgroundColor: "darkred",
		fontSize: 23,
		color: "yellow",
		padding: 10,
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
		backgroundColor: "#1a2a57",
		// alignItems: "center",
		color: "#ffffff",
		justifyContent: "center",
		padding: 20,
		width: "100%",
	},
	form: {
		// flexDirection: "row",
		display: "flex",
		position: "relative",
	},
	input: {
		borderColor: "green",
		borderWidth: 6,

		paddingVertical: 4,
		paddingHorizontal: 10,
		height: 70,
		borderTopLeftRadius: 6,
		borderBottomLeftRadius: 6,

		backgroundColor: "yellow",
		fontSize: 35,
		fontFamily: "UKNumberPlate_Regular",
		fontSize: 45,
		// textAlignVertical: "center",
		textDecorationLine: "none",
	},
	search: {
		borderColor: "green",
		borderWidth: 6,
		paddingVertical: 4,
		paddingHorizontal: 10,
		height: 70,
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,

		backgroundColor: "green",
		fontSize: 18,

		color: "yellow",

		textAlignVertical: "center",
	},
	results: {
		marginTop: 20,
		// padding: 5,
		// backgroundColor: "#1a2a57",
	},
	result: {
		color: "pink",
		marginBottom: 2,
		fontSize: 20,
	},
});
