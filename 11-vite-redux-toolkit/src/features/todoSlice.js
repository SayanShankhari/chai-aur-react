import { createSlice, nanoid } from "@reduxjs/toolkit";

const init_state = {
	todo_list: [
		{
			id: 1
			, task: "one"
			, complete: false
		}
	]
};

const todoSlice = createSlice (
	{
		name: "TodoList"
		, initialState: init_state
		, reducers: {
			createTodo: (state, action) => { // payload is "task"
				const todo = {
					id: nanoid () // #len id(undefined)=21; #len id(null)=0
					, task: action.payload
					, complete: false
				};
				state.todo_list.push (todo);
			}
			, deleteTodo: (state, action) => { // payload is "id"
				state.todo_list = state.todo_list.filter (
					(todo) => (todo.id !== action.payload)
				);
			}
			, updateTodo: (state, action) => { // payload is "id"
				state.todo_list = state.todo_list.map (
					(todo) => (todo.id !== action.payload.id) ? todo : action.payload.task
				);
			}
			, toggleComplete: (state, action) => {
				state.todo_list = state.todo_list.map (
					(todo) => (todo.id !== action.payload.id) ? todo : {...todo, complete: !todo.complete}
				);
			}
		}
	}
);

// need to seperately export
// for Components to update States
export const { createTodo, deleteTodo, updateTodo, toggleComplete } = todoSlice.actions;

// need to export Reducer for store
export default todoSlice.reducer;