import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoForm, TodoList } from "./components";
import { Provider } from 'react-redux';
import { store } from "./app/store"

function App() {
	return (
		<Provider store={store}>
			<div id="container" className="max-w-lg mx-auto mt-10 p-5 bg-grey-500 shadow-lg rounded-lg">
				<h1 className="text-3xl font-bold text-center mb-4 text-gray-800">To-Do List</h1>
				<TodoForm />
				<TodoList />
			</div>
		</Provider>
	)
}

export default App