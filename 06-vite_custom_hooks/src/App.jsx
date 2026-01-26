import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Box} from "./components/"
import useCurrencyExchange from "./hooks/useCurrencyExchange"

function App() {
	const [originalAmount, setOriginalAmount] = useState (0);
	const [exchangedAmount, setExchangedAmount] = useState (0);
	const [originalCurrency, setOriginalCurrency] = useState ("usd");
	const [exchangeCurrency, setExchangeCurrency] = useState ("inr");

	const exchange_rate_data = useCurrencyExchange (originalCurrency);
//console.table (exchange_rate_data);
	const options = Object.keys (exchange_rate_data);
//	const options = ["usd", "inr"];
const values = Object.values (exchange_rate_data);

if (values) {
	console.log (values);
	//console.log ("minimum", Math.min (values));
}
//console.log (exchange_rate_data [exchangeCurrency]);


	const swap = () => {
		setOriginalAmount (exchangedAmount);
		setExchangedAmount (originalAmount);
		setOriginalCurrency (exchangeCurrency);
		setExchangeCurrency (originalCurrency);
	}

	useEffect (() => {
		setExchangedAmount (originalAmount * exchange_rate_data [exchangeCurrency]);
	}, [originalAmount, setExchangeCurrency]);

	return (
		<>
			<Box
				currency = {originalCurrency}
				on_currency_change = {setOriginalCurrency}
				currency_options = {options}
				amount = {originalAmount}
				on_amount_change = {setOriginalAmount}
				//amount_disabled = false
				//currency_disabled = false
			/>
			<br />
			<button
				onClick = {swap}
				className='cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Swap
			</button>
			<br />
			<Box
				currency = {exchangeCurrency}
				on_currency_change = {setExchangeCurrency}
				currency_options = {options}
				amount = {exchangedAmount}
				on_amount_change = {setExchangedAmount}
				amount_disabled = {true}
				//currency_disabled = false
			/>
		</>
	)
}

export default App