import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import CustomStatusBar from "./components/CustomStatusBar";

const App: React.FC = () => {
	return (
		<View testID="ask-dvla-app">
			<NavigationContainer>
				<CustomStatusBar />
				<BottomTabNavigator />
			</NavigationContainer>
		</View>
	);
};

export default App;
