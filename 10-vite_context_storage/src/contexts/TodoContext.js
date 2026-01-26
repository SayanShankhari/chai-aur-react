import { createContext } from "react";

export const TodoContext = createContext (
	{
		todos: [
			{
				id: 1
				, task: "Todo 1"
				, complete: false
			} // this is just a placeholder, not an object
		]
		, createTodo: (new_task) => {}
		, updateTodo: (id, revised_task) => {}
		, deleteTodo: (id) => {}
		, toggleComplete: (id) => {}
	}
);

export const TodoContextProvider = TodoContext.Provider;