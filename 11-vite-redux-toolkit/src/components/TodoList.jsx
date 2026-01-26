import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
	const todo_list = useSelector (state => state.todo_list);

	return (
		<ul id="task-list" className="space-y-3 list-none">
			{todo_list.map (
				(todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm"
					>
						<TodoItem todo={todo} />
					</li>
				)
			)}
		</ul>
	)
}