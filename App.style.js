import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
