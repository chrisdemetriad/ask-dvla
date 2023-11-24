import React from "react";
import { StatusBar, StatusBarProps } from "react-native";

const CustomStatusBar: React.FC<StatusBarProps> = (props) => {
	return (
		<StatusBar
			backgroundColor="#0076bc"
			barStyle="light-content" // use 'dark-content' after adding the dark theme functionality!
		/>
	);
};

export default CustomStatusBar;
