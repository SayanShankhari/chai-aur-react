import {useId} from "react";

function Box ({
	amount = 0
	, on_amount_change
	, on_currency_change
	, currency
	, currency_options = []	// contingency
	, amount_disabled = false
	, currency_disabled = false
	, class_style = ""
}) {
	const currency_id = useId();

	return (
		<div className={`bg-gray-100 p-4 m-2 rounded-lg text-sm flex ${class_style}`}>
			<label htmlFor={currency_id} className="py-4">Pick a currency:</label>
			<select
				id={currency_id}
				className='mr-4'
				value={currency}
				onChange={(event) => on_currency_change && on_currency_change (event.target.value)}
				disabled={currency_disabled}
			>
				{currency_options.map ((c) => (
					<option key={c} value={c}>{c.toUpperCase()}</option>
				))}
			</select>

			<input
				id={currency_id}
				type="number"
				min={0}
				placeholder="Amount"
				disabled={amount_disabled}
				value={amount}
				onChange={(event) => on_amount_change && on_amount_change (Number (event.target.value))}
				className="text-xl border-black border border-gray-400 p-2 rounded-md focus:outline-none focus:border-blue-500"
			/>
		</div>
	);
}

export default Box;