import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import * as Components from './components'; // usage: <Components.pages.Home/>, <Components.pages.About/>, ...
import { RouterProvider } from 'react-router-dom';
import routes from './routes';

function App() {
	return (
		<RouterProvider router={routes}/>
	)
}

export default App
