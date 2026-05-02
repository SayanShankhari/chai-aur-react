// also AuthLayout
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useNavigation,Outlet } from "react-router-dom";

/*
{
		//authentic = false
		//, children = {}
		// slug = "/login"
	}

*/

export default function ProtectedLayout () {
	const navigate = useNavigate ();
	const navigation = useNavigation ();
	const [loading, setLoading] = useState (true);
	const auth_stat = useSelector (state => state.auth.status);

	// detect when navigation changes to "loading" or "submitting"
	const navigating = (navigation.state !== "idle");

	useEffect (() => {
		// TODO: revise later with "&& authentic"
/*
		if (auth_stat) {
			navigate ("/");
		} else {
			navigate ("./login");
		}

		if (!authentic || !auth_stat) {
			navigate ("/login");
		} else if (!authentic && auth_stat !== authentic) {
			navigate ("/");
		}
*/
		// Simulate fetching data from an API

		if (navigating) {
			setLoading (true);

			const timer = setTimeout(() => {
				setLoading (false);
			}, 3000);

			return () => clearTimeout (timer);
		}

		// if (auth_stat) {
		// 	return <Outlet />;
		// } else {
		// 	return <Navigate to="/signin" replace />	// repolace current navigation history
		// 	// Navigate is wrapper of useNavigate hook for class based components
		// 	// we can use the below alternative useNavigate hook
		// 	// navigate ("/signin", { replace: true });
		// }
	}, [auth_stat, navigate]);

	return (
		!auth_stat ? <Navigate to="/signin" replace /> : <Outlet />
	);
}