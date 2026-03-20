import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { pages, tools } from "./components";
//import ErrorBoundary from "./components/errors/ErrorBoundary";

const routes = createBrowserRouter (
	createRoutesFromElements (
		<Route path="/" element={ <pages.HomePage /> } >
			<Route path="about" element={ <pages.AboutPage /> } />
			<Route path="contact" element={ <pages.ContactPage /> } />
			<Route path="auth" element={ <pages.SigninPage /> } />
			<Route path="signup" element={ <pages.SignupPage /> } />
			<Route path="signin" element={ <pages.SigninPage /> } />
			<Route path="posts" element={ <pages.AllPosts /> } />
			<Route path="post/:postId" element={<pages.PostPage />} />
			<Route path="add-post" element={<pages.AddPost />} />
		</Route>
	)
);

export default routes;

// TODO: implement custom <ErrorBoundary /> for errorElement prop