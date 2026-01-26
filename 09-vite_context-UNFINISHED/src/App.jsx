import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeContextProvider } from "./contexts/theme";
import * as components from "./components"

function App() {
	const [theme, setTheme] = useState ("dark");
	const [mode, setMode] = useState ("dark");

	function toggleTheme() {
		console.log ((theme === "light") ? "dark" : "light");

		setTheme ((theme === "light") ? "dark" : "light");

		//const themes = ["light", "dark"];
		//console.log (themes [!themes.indexOf (theme_mode)]);

		//setThemeMode (!themes.indexOf (theme_mode));
	}

	const card_reference = useRef ("card");

	useEffect (() => {
		let style = document.documentElement.classList;
		style.classList.remove ("light", "dark");
		style.classList.add (theme);
	}, [theme]);

	return (
		<ThemeContextProvider
			value={
				{ theme, toggleTheme }
			}
		>
			<div className={`${theme}-${mode} flex flex-wrap min-h-screen items-center`}>
				<div className="w-full">
					<div className="w-full max-w-sm mx-auto flex justify-end mb-4">
						<components.ThemeButton />
					</div>
					<div className="w-full max-w-sm mx-auto">
						<components.Card ref={ card_reference } />
					</div>
				</div>
			</div>
		</ThemeContextProvider>
	)
}

export default App
