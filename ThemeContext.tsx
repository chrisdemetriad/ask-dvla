import React, { createContext, useState, useContext } from "react";

const defaultThemeState = {
	isDarkTheme: false,
	setIsDarkTheme: (isDark: boolean) => {},
};

const ThemeContext = createContext(defaultThemeState);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	return <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>{children}</ThemeContext.Provider>;
};
