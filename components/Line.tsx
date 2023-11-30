import React from "react";
import { View, StyleSheet } from "react-native";

const Line: React.FC = () => {
	return <View style={styles.line} testID="line" />;
};

const styles = StyleSheet.create({
	line: {
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});

export default Line;
