// also known as AuthLayout
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes () {
	const auth_stat = useSelector (state => state.auth.status);

	// Navigate is wrapper of useNavigate hook for class based components
	// we can use the below alternative JS style useNavigate hook
	/* const navigate = useNavigate ();
	if (auth_stat) {
		return <Outlet />;
	} else {
		navigate ("/signin", { replace: true });
	} */

	return (
		auth_stat ? <Outlet /> : <Navigate to="/signin" replace />	//  replace current navigation history
	);
}