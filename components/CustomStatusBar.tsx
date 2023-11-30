import React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";

const CustomStatusBar: React.FC<StatusBarProps> = (props) => {
	return (
		<View testID="custom-status-bar">
			<StatusBar
				backgroundColor="#0076bc"
				barStyle="light-content" // use 'dark-content' after adding the dark theme functionality!
			/>
		</View>
	);
};

export default CustomStatusBar;
