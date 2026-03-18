import { useDispatch } from "react-redux";
import { register, login, logout } from "../../store/authSlice";
import { useEffect } from "react";
import { AuthenticationService } from "../../services";

export default function MyButton (
	{
		children
		, text = "Press"
		, action = "default"
		, styles = ""
		, ...props
	}
) {
	const action_styles = {
		default: "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signup: "text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signin: "text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
		, signout: "text-white bg-warning box-border border border-transparent hover:bg-warning-strong focus:ring-4 focus:ring-warning-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
	}

	// const action_texts = {
	// 	default: "Press"
	// 	, signup: "SignUp"
	// 	, signin: "SignIn"
	// 	, signout: "SignOut"
	// }

	const action_handlers = {
		"default": ""
		, "signup": handle_register
		, "signin": handle_login
		, "signout": handle_logout
	}

	const dispath = useDispatch();

	function handle_register () {
		AuthenticationService.register()
			.then (() => {
				dispath (register);
			})
			.catch ((error) => {
				throw (error);
			})
			.finally ();
	}

	function handle_login () {
		AuthenticationService.login()
			.then (() => {
				dispath (login);
			})
			.catch ((error) => {
				throw (error);
			})
			.finally ();
	}

	function handle_logout () {
		AuthenticationService.logout()
			.then (() => {
				dispath (logout);
			})
			.catch ((error) => {
				throw (error);
			})
			.finally ();
	}

	function handle_action() {
		console.log ("reached here...", { text });
		//action_handlers [action];

		/*if (action == "signup") {
			handle_register ();
		} else if (action == "signin") {
			handle_login ();
		} else if (action == "signout") {
			handle_logout ();
		} else {

		}*/
	}

	useEffect(() => {
		console.log ("received action: ", action);
		console.log ("action style:", action);
		//console.log ("action handlers:", action_handlers);
	}, []);

	return (
		<button
			type="button"
			className={ `${styles} ${action_styles [action]}` }
			onSubmit={ handle_action }
			{...props}
		>
			{ text }
			{ children }
		</button>
	);
}