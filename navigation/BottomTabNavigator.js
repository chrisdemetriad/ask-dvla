import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Home") {
						iconName = "home";
					} else if (route.name === "Help") {
						iconName = "help";
					} else if (route.name === "Settings") {
						iconName = "settings";
					}
					return <Icon name={iconName} size={focused ? 30 : 25} color={color} />;
				},
				tabBarActiveTintColor: Platform.OS === "ios" ? "#007aff" : "#333",
				tabBarInactiveTintColor: "gray",
				tabBarLabelStyle: { paddingBottom: Platform.OS === "ios" ? 5 : 0 },
				tabBarStyle: { height: 60, paddingVertical: Platform.OS === "ios" ? 10 : 0 },
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Help" component={HelpScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
