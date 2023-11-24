import React from "react";
import { View, Text } from "react-native";
import appStyles from "./../App.style.js";

const HelpScreen: React.FC = () => {
	return (
		<View style={appStyles.container} accessibilityLabel={"Help"}>
			<Text>Help Screen</Text>
		</View>
	);
};

export default HelpScreen;
