import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import { pages } from './components';
import { githubInfoLoader } from './components/pages/Github';

/*
// traditional method
const routes = createBrowserRouter (
	[
		{ path: "/", element: <Layout/> }
		, { path: "/home", element: <pages.Home/> }
		, { path: "/about", element: <pages.About/> }
		, { path: "/contact", element: <pages.Contact/> }
		, { path: "/user/:userid", element: <pages.User/> }
		, { path: "/github", element: <pages.Github/>, loader: {githubInfoLoader} }
	]
);
*/

/*
// using nested (children) routes
const routes = createBrowserRouter (
	[{
		path: "/"
		, element: <Layout/>
		, children: [
			{ path: "", element: <pages.Home/> }
			, { path: "about", element: <pages.About/> }
			, { path: "contact", element: <pages.Contact/> }
			, { path: "user/:userid", element: <pages.User/> }
			, { path: "github", element: <pages.Github/>, loader: {githubInfoLoader} }
		]
	}]
);
*/

// using component style routes
const routes = createBrowserRouter (
	createRoutesFromElements (
		<Route path="/" element={ <Layout/> } >
			<Route path="home" element={ <pages.Home/> } />
			<Route path="about" element={ <pages.About/> } />
			<Route path="contact" element={ <pages.Contact/> } />
			<Route path="user/:userid" element={ <pages.User/> } />
			<Route path="github" element={ <pages.Github/> } loader={githubInfoLoader} />
		</Route>
	)
);


export default routes;