import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import CustomStatusBar from "./components/CustomStatusBar";
import { ThemeProvider } from "./ThemeContext";

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<View style={styles.container} testID="ask-dvla-app">
				<NavigationContainer>
					<CustomStatusBar />
					<BottomTabNavigator />
				</NavigationContainer>
			</View>
		</ThemeProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
