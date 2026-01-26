import { useState } from "react";
import { useTodo } from "../hooks"

export default function TodoForm() {
	const [text_input, setTextInput] = useState ("");

	const { createTodo } = useTodo ();

	function handleSubmit (event) {
		event.preventDefault();

		if (!text_input) return;

		createTodo (text_input);

		// clear the input field
		setTextInput ("");
	}

	return (
		<form onSubmit={ handleSubmit } className="flex">
			<input
				type="text"
				placeholder="Write Todo..."
				className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
				value={text_input}
				onChange={(event) => setTextInput (event.target.value)}
			/>
			<button
				type="submit"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
			>
				✚
			</button>
		</form>
	)
}