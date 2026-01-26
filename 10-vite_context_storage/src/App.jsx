import { useEffect, useState } from 'react';
import './App.css';
import { TodoContextProvider } from "./contexts"
import { TodoForm, TodoItem } from './components';
import { nanoid } from "nanoid";

export default function App() {
	const [todos, setTodos] = useState ([]);

	function createTodo (new_task) {
		// shallow copy by destructuring and over-write id value
		setTodos (
			(old_todos) => [
				{
					id: nanoid() + Date.now()
					, task: new_task
					, complete: false
				}
				, ...old_todos
			]
		);
	}

	function updateTodo (id, revised_task) {
		setTodos (
			(old_todos) => old_todos.map (
				(todo) => (todo.id !== id) ? todo : {...todo, task:revised_task}
			)
		);
	}

	function deleteTodo (id) {
		setTodos (
			(old_todos) => old_todos.filter (	// returns only true values
				(todo) => (todo.id !== id)
			)
		);
	}

	function toggleComplete (id) {
		setTodos (
			(old_todos) => old_todos.map (
				(todo) => (todo.id !== id) ? todo : {...todo, complete: !todo.complete}
			)
		);
	}

	// preserves pre-existing todos
	useEffect (() => {
		const existing_todos = JSON.parse (localStorage.getItem ("todos"));

		if (existing_todos && existing_todos.length > 0) {
			setTodos (existing_todos);
		}
	}, []);

	// new changes
	useEffect (() => {
		localStorage.setItem ("todos", JSON.stringify (todos));
	}, [todos]);	// stated one

	return (
		<TodoContextProvider value={
			{ todos, createTodo, updateTodo, deleteTodo, toggleComplete }
		}>
			<div className="bg-[#0C0C0C] min-h-screen py-8">
				<div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
					<div className="mb-4">
						{/* Todo form goes here */}
						<TodoForm />
					</div>
					<div className="flex flex-wrap gap-y-3">
						{/*Loop and Add TodoItem here */}
						{
							todos.map (
								(todo) => {
									return <TodoItem
										key={todo.id}
										todo={todo}
									/>
								}
							)
						}
					</div>
				</div>
			</div>
		</TodoContextProvider>
	)
}