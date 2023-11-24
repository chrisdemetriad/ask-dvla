import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import CustomStatusBar from "./components/CustomStatusBar";

const App: React.FC = () => {
	return (
		<NavigationContainer>
			<CustomStatusBar />
			<BottomTabNavigator />
		</NavigationContainer>
	);
};

export default App;
