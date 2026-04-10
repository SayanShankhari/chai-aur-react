import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import * as pages from "../pages";
import ProtectedRoutes from "./ProtectedRoutes";
//import ErrorBoundary from "./components/errors/ErrorBoundary";

const routes = createBrowserRouter (
	createRoutesFromElements (
		<Route path="/" element={ <pages.HomePage /> } >
			<Route path="about" element={ <pages.AboutPage /> } />
			<Route path="contact" element={ <pages.ContactPage /> } />
			<Route path="signin" element={ <pages.SigninPage /> } />
			<Route path="signup" element={ <pages.SignupPage /> } />
			<Route element={ <ProtectedRoutes /> } >	{/* TODO: implement roles */}
				<Route path="posts" element={ <pages.AllPosts /> } />
				<Route path="post/:postId" element={ <pages.PostPage /> } />
				<Route path="add-post" element={<pages.AddPost />} />
			</Route>
		</Route>
	)
);

export default routes;

// TODO: implement custom <ErrorBoundary /> for errorElement prop