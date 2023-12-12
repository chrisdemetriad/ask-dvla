import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "./../ThemeContext";
import getStyles from "./../App.style";

const SettingsScreen = () => {
	const { isDarkTheme, setIsDarkTheme } = useTheme();
	const appStyles = getStyles(isDarkTheme);

	const toggleSwitch = () => setIsDarkTheme(!isDarkTheme);

	const styles = StyleSheet.create({
		label: {
			color: isDarkTheme ? "#eee" : "#333",
			fontSize: 18,
		},
	});

	return (
		<View testID="settings-screen" style={[appStyles.centeredContainer, appStyles.container]} accessibilityLabel="Settings screen">
			<Text style={styles.label}>Dark theme</Text>
			<Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isDarkTheme ? "#0076bc" : "#f4f3f4"} onValueChange={toggleSwitch} value={isDarkTheme} />
		</View>
	);
};

export default SettingsScreen;
