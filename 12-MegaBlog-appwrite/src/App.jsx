import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { account, ID } from "./lib/appwrite";
import AuthenticationService from "./lib/appwrite/AuthenticationService";
import DatabaseService from "./lib/appwrite/DatabaseService";
import articles from "./conf/articles";
import { useDispatch } from "react-redux";
// import { login, logout } from "./store/authSlice";
// import { Home, Loading } from "./components/pages";
import { RouterProvider } from 'react-router-dom';
import routes from "./routes";
import RealTimeEditor from "./components/tools/RealTimeEditor";

function App() {
/*
	async function login(email, password) {
 		await account.createEmailPasswordSession({
			email,
			password
		});
		setLoggedInUser (await account.get());
	}
*/
	useEffect (() => {
		//var response;
		//response = DatabaseService.deleteAllPosts ();
		//response = DatabaseService.insertDummyPosts (articles);
		//response = DatabaseService.listAllPosts ();
		//console.log (response.rows);

	}, []);

	const [loading, setLoading] = useState (true);

	const dispatch = useDispatch();
/*
	useEffect (() => {
		AuthenticationService.getCurrentUser()
			.then ((user_data) => {
				if (user_data) {
					dispatch (login ({ user_data }));
				} else {
					dispatch (logout ());
				}
			})
			.catch (error => console.log ("ERROR: AuthenticationService:", error))
			.finally (() => {
				setLoading (false);
			});
	}, [dispatch]);
*/

	return (
		<RouterProvider router={routes}>

		</RouterProvider>
	);

/*

({loading}) ? <Home /> : <Loading />

	const [loggedInUser, setLoggedInUser] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	return (
		<>
			<p>
		{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
	  </p>

	  <form>
		<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
		<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
		<input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

		<button type="button" onClick={() => login(email, password)}>
		  Login
		</button>

		<button
		  type="button"
		  onClick={async () => {
			await account.create({
				userId: ID.unique(),
				email,
				password,
				name
			});
			login(email, password);
		  }}
		>
		  Register
		</button>

		<button
		  type="button"
		  onClick={async () => {
			await account.deleteSession({
				sessionId: 'current'
			});
			setLoggedInUser(null);
		  }}
		>
		  Logout
		</button>
	  </form>
		</>
	)
*/
}

export default App