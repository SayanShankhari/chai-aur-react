import {useState, useEffect} from "react";

function useCurrencyExchange (currency) {
	let remote_api_url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;

	const [data, setData] = useState ({});

	useEffect (() => {
		fetch (remote_api_url)
		.then ((response) => response.json())
		.then ((response) => setData (response [currency]))
	}, []);

	// console.table (data);

	return data;
}

export default useCurrencyExchange;