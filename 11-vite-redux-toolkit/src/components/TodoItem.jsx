import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo, toggleComplete } from "../features";

export default function TodoItem ({ todo }) {
	const dispatch = useDispatch();

	const [task, setTask] = useState (todo.task);
	const [editable, setEditable] = useState (false);

	return (
		<div
			className={`${
				todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
			} flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black`}
		>
			<input
				type="checkbox"
				className="cursor-pointer"
				checked={todo.complete}
				onChange={() => {
					dispatch (toggleComplete (todo.id))
				}}
			/>
			<input
				type="text"
				className={`${
					editable ? "border-black/10 px-2" : "border-transparent"
				} ${
					todo.complete ? "line-through" : ""
				} border outline-none w-full bg-transparent rounded-lg`}
				value={task}
				onChange={(event) => setTask (event.target.value)}
				readOnly={!editable}
			/>
			<button
				className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 cursor-pointer"
				onClick={() => {
					if (todo.complete) return;

					if (editable) {
						dispatch (updateTodo (todo.id, task));
						setEditable (false);
					} else {
						setEditable ((prev_flag) => !prev_flag);
					}
				}}
				disabled={todo.complete}
			>
				{editable ? "💾" : "✏️"}
			</button>
			<button
				className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 cursor-pointer"
				onClick={() => dispatch (deleteTodo (todo.id))}
			>
				❌
			</button>
		</div>
	)
}