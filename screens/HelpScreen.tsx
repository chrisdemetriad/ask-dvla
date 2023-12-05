import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HelpScreen: React.FC = () => {
	const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null);

	const handleToggleFAQ = (index: number) => {
		setExpandedFAQIndex(expandedFAQIndex === index ? null : index);
	};

	const faqs = [
		{
			question: "How do I search for a vehicle?",
			answer: "Enter the registration plate number in the search box. Tap the search icon or press Enter on your keyboard to perform the search.",
		},
		{
			question: "What information is available about a vehicle?",
			answer: "The app provides details such as make, year of manufacture, color, engine capacity, fuel type, weight, MOT status, tax status, and more.",
		},
		{
			question: "Is the vehicle data provided accurate?",
			answer: "Yes, the data is sourced from reliable databases. Ensure the registration number is entered correctly for accurate results.",
		},
		{
			question: "Can I find the MOT history of a vehicle?",
			answer: "The app shows the current MOT status and expiry date. For a full MOT history, you may need to visit the relevant government website.",
		},
		{
			question: "How up-to-date is the vehicle information?",
			answer: "The information is regularly updated. However, there may be a short delay in reflecting the most recent data from government databases.",
		},
		{
			question: "What should I do if the information is incorrect?",
			answer: "If you suspect any discrepancies, verify the registration number and search again. For further discrepancies, contact the relevant authorities.",
		},
		{
			question: "Can I use this app for commercial purposes?",
			answer: "Please review the terms of service and privacy policy for information regarding commercial use.",
		},
		{
			question: "Is there a limit to how many searches I can perform?",
			answer: "There may be limits to prevent abuse. If you encounter limits, try again later or consider contacting us for more information.",
		},
		{
			question: "What happens if the vehicle data is not found?",
			answer: "Ensure the registration number is correct. If the issue persists, the vehicle may not be in the database or there may be a system error.",
		},
		{
			question: "Does the app provide vehicle valuation?",
			answer: "No, the app focuses on providing vehicle registration information and does not offer valuation services.",
		},
	];

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Frequently Asked Questions</Text>
			<ScrollView style={styles.faqList}>
				{faqs.map((faq, index) => (
					<View key={index} style={[styles.faqItem, index === faqs.length - 1 && styles.lastItem]}>
						<TouchableOpacity style={styles.questionContainer} onPress={() => handleToggleFAQ(index)}>
							<Text style={styles.question}>{faq.question}</Text>
							<MaterialIcons name={expandedFAQIndex === index ? "expand-less" : "expand-more"} size={24} style={styles.icon} />
						</TouchableOpacity>
						{expandedFAQIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
					</View>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 15,
	},
	faqList: {
		flex: 1,
		padding: 15,
	},
	faqItem: {
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingVertical: 10,
	},
	lastItem: {
		borderBottomWidth: 0,
	},
	questionContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	question: {
		flex: 1,
		fontSize: 18,
		paddingRight: 10,
	},
	icon: {
		color: "#666",
	},
	answer: {
		fontSize: 16,
		marginTop: 5,
		color: "#333",
	},
});

export default HelpScreen;
