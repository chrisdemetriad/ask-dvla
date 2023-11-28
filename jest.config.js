module.exports = {
	preset: "react-native",
	setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
	},
};
