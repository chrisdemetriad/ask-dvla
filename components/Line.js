import React from "react";
import { View, StyleSheet } from "react-native";

const Line = () => {
	return <View style={styles.line} />;
};

const styles = StyleSheet.create({
	line: {
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});

export default Line;
