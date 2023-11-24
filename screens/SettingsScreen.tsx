import React from "react";
import { View, Text } from "react-native";
import appStyles from "./../App.style.js";

const SettingsScreen: React.FC = () => {
	return (
		<View style={appStyles.container} accessibilityLabel={"Settings"}>
			<Text>Settings Screen</Text>
		</View>
	);
};

export default SettingsScreen;
