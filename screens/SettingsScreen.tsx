import React from "react";
import { View, Text } from "react-native";
import appStyles from "./../App.style.js";

const SettingsScreen: React.FC = () => {
	return (
		<View testID="settings-screen" style={appStyles.container} accessibilityLabel="Settings screen">
			<Text>Settings Screen</Text>
		</View>
	);
};

export default SettingsScreen;
