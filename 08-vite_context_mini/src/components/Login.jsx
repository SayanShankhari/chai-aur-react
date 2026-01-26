import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("********");

	const { setUser } = useContext (UserContext);
	console .log (setUser);

	function handleSubmit (event) {
		event.preventDefault();
		setUser ({username, password});
	}

	return (
		<>
			<h1>Login</h1>
			<input
				type="text" placeholder="username"
				value={username}
				onChange={(event) => setUsername (event.target.value)}
			/>
			{" "}	{/* this was an Spacer */}
			<input type="password" placeholder="password"
				value={password}
				onChange={(event) => setPassword (event.target.value)}
			/>
			<button onClick={ handleSubmit }>Submit</button>
		</>
	)
}