import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { pages } from "./components";
import RealTimeEditor from "./components/tools/RealTimeEditor";

const routes = createBrowserRouter (
	createRoutesFromElements (
		<Route path="/" element={ <pages.HomePage /> }>
			<Route path="rte" element={ <RealTimeEditor /> } />
			<Route path="signup" element={ <pages.SignupPage /> } />
			<Route path="signin" element={ <pages.SigninPage /> } />
		</Route>
	)
);

export default routes;