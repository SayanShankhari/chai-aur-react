import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SigninForm } from "../components/forms";

export default function SigninPage () {
	const status = useSelector ((state) => (state.auth.status));
	const navigate = useNavigate ();

	useEffect (() => {
		if (status) {
			navigate ("/");
		}
	}, [ status, navigate ]);

	return (
		<div className="py-8">
			<SigninForm />
		</div>
	);
}