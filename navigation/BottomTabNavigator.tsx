import React from "react";
import { RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import MotAndTax from "../screens/MotAndTax";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MotHistory from "../screens/MotHistory";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

type TabRouteProps = RouteProp<Record<string, object | undefined>, string>;

const BottomTabNavigator: React.FC = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }: { route: TabRouteProps }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "CHECK MOT/TAX") {
						iconName = "home";
					} else if (route.name === "MOT HISTORY") {
						iconName = "history";
					} else if (route.name === "HELP") {
						iconName = "help";
					} else if (route.name === "SETTINGS") {
						iconName = "settings";
					}
					return <Icon name={iconName} size={focused ? 30 : 25} color={color} />;
				},
				tabBarActiveTintColor: Platform.OS === "ios" ? "#007aff" : "#0076bc",
				tabBarInactiveTintColor: "gray",
				tabBarLabelStyle: { paddingBottom: Platform.OS === "ios" ? 5 : 2 },
				tabBarStyle: { height: 60, paddingVertical: Platform.OS === "ios" ? 10 : 5, paddingBottom: Platform.OS === "ios" ? 5 : 10 },
			})}
		>
			<Tab.Screen name="CHECK MOT/TAX" component={MotAndTax} options={{ headerShown: false }} />
			<Tab.Screen name="MOT HISTORY" component={MotHistory} options={{ headerShown: false }} />
			<Tab.Screen name="HELP" component={HelpScreen} options={{ headerShown: false }} />
			<Tab.Screen name="SETTINGS" component={SettingsScreen} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;
