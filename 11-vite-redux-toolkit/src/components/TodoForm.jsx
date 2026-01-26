import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features";

export default function TodoForm () {
	const [input_text, setInputText] = useState("");

	// Dispatch changes Store using Reducer
	const dispatch = useDispatch ();

	function handleSubmit (event) {
		event.preventDefault();
		dispatch (createTodo (input_text));
		setInputText (""); // clears input field
	}

	return (
		<form
			onSubmit={ handleSubmit }
			className="flex items-center space-x-4 w-4/5 justify-center"
		>
			<input
				name="task"
				type="text-input"
				className="flex-1 min-w-0 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				placeholder="Enter your Task"
				value={input_text}
				onChange={(event) => setInputText (event.target.value)}
			/>
			<button
				type="submit"
				className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0 cursor-pointer"
			>
				✚
			</button>
		</form>
	);
}