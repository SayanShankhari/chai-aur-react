// also AuthLayout
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected (
	{
		children
		, user_authentication = true
	}
) {
	const navigate = useNavigate ();
	const [loader, setLoader] = useState (true);
	const auth_stat = useSelector (state => state.auth.status);

	useEffect (() => {
		if (auth_stat) {
			navigate ("/");
		} else {
			navigate ("./login");
		}

		// TODO: revise later
		if (user_authentication && auth_stat !== user_authentication) {
			navigate ("/login");
		} else if (!user_authentication && auth_stat !== user_authentication) {
			navigate ("/");
		}
	}, [auth_stat, navigate, authentication]);

	return (
		loader ? <h1>Loading...</h1> : <>{children}</>
	);
}