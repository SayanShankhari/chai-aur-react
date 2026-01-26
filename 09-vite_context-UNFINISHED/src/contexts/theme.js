import { createContext, useContext } from "react";

export const ThemeContext = createContext (
	{
		theme_mode: "light"
		, toggleTheme: () => {}
	}
);

export const ThemeContextProvider = ThemeContext.Provider;

// custom hook
export default function useTheme() {
	return useContext (ThemeContext);
}