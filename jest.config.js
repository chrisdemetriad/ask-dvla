module.exports = {
	preset: "jest-expo",
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react",
				},
			},
		],
	},
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
	testEnvironment: "jsdom",
	// transform: {
	// 	"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	// },
	// transform: {
	// 	"^.+\\.(js|jsx)$": "babel-jest",
	// 	"^.+\\.(ts|tsx)$": "ts-jest",
	// },
	// transformIgnorePatterns: ["node_modules/(?!(expo-font|@react-native|react-native|react-navigation-tabs|react-native-splash-screen|react-native-screens|react-native-reanimated)/)"],
	transformIgnorePatterns: ["node_modules/(?!(jest-)?react-native|@react-native|react=native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)"],
	collectCoverage: true,
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**", "!**/vendor/**"],
};
