import React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";

const CustomStatusBar: React.FC<StatusBarProps> = (props) => {
	return (
		<View testID="custom-status-bar">
			<StatusBar backgroundColor="#0076bc" barStyle="light-content" />
		</View>
	);
};

export default CustomStatusBar;
