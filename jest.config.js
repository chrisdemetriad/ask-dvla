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
	testEnvironment: "node",
	transformIgnorePatterns: ["node_modules/(?!(jest-)?react-native|@react-native|react=native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)"],
	collectCoverage: true,
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**", "!**/vendor/**"],
};
