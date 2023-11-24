import React from "react";
import { View, Button, Linking, StyleSheet } from "react-native";

const OpenLinkButton: React.FC<{
	buttonText: string;
	linkUrl: string;
}> = ({ buttonText, linkUrl }) => {
	const handlePress = () => {
		Linking.canOpenURL(linkUrl)
			.then((supported) => {
				if (!supported) {
					console.log("Can't handle URL: " + linkUrl);
				} else {
					return Linking.openURL(linkUrl);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};

	return (
		<View style={styles.button}>
			<Button title={buttonText} onPress={handlePress} />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {},
});

export default OpenLinkButton;
