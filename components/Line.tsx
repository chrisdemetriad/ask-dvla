import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "./../ThemeContext";
import getStyles from "./../App.style";

const Line: React.FC = () => {
	const { isDarkTheme } = useTheme();
	const appStyles = getStyles(isDarkTheme);

	const styles = StyleSheet.create({
		line: {
			borderBottomColor: isDarkTheme ? "#222" : "#eee",
			borderBottomWidth: 1,
		},
	});

	return <View style={styles.line} testID="line" />;
};

export default Line;
