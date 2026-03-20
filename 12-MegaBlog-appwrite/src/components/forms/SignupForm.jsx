import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthenticationService } from "../../services";
import { store_signin, store_signup } from "../../store/authSlice";
import { MyButton, MyInput, MyLogo } from "../atoms";

export default function SignupForm () {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState ("");
	const { register, handleSubmit, watch, formState:{ errors } } = useForm();

	async function handle_signup (form_data) {
		setError ("");
		localStorage.clear();
		// console.log (form_data.email, form_data.password);

		try {
			const user_data = await AuthenticationService.createUser (form_data);
			// console.log ("user data:", user_data);

			if (user_data) {
 				dispatch (store_signup (user_data));

				const session_data = await AuthenticationService.login ({ ...form_data });

				// console.log ("session:", session_data);
				// console.log ("cookie:", document.cookie);

				if (session_data) {
					const user = await AuthenticationService.getCurrentUser();
					// console.log ("gotten user:", user);

					const auth_store_data = {
						"name": user.name
						, "email": user.email
						, "userId": user.$id
						, "session": session_data.$id
					};

					// console.log (auth_store_data);

					dispatch (store_signin (auth_store_data));
				}

				navigate ("/");
			}
		} catch (error) {
			setError (error.message);
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div className="mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[50px]">
						<MyLogo size="100" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to your account
				</h2>
				<p className="mt-2 text-center text-base text-white/60">
					Already have an account?&nbsp;
					<Link
						to="/signin"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{/* { error && (
					<p className="text-red-600 mt-8 text-center">
						{ error }
					</p>
				)} */}
				<form
					onSubmit={ handleSubmit (handle_signup) }
					className="mt-8 space-y-6"
				>
					<div className="space-y-5">
						<MyInput
							label="Full Name: "
							type="text"
							placeholder="Enter your full name"
							{...register ("name", {
								// { value:true, message:"Name is required." }
								required: "Name is required."
							})}
						/>
						{ errors.name && <p>{errors.email.name}</p> }
						<MyInput
							label="Email: "
							placeholder="Enter your eMail"
							type="email"
							{...register ("email", {
								required: "email address is required" // short-hand for { value: true, message: "email ... required" }
								, validate: {}
								, pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //.test(value)
									, message: "Invalid eMail address"
								}
							})}
						/>
						{ errors.email && <p>{errors.email.message}</p> }
						<MyInput
							label="Password: "
							placeholder="Enter your Password"
							type="password"
							{...register ("password", {
								required: "password is required"
								, minLength: {
									value: 8
									, message: "Password length should be at least 8"
								}
								, pattern: {
									value: /^(?=(.*[A-Z]){2,})(?=.*[!@#$%^&*()\-__+.])(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{8,}$/ //.test(value)
									, message: `Invalid pattern, please provide:
2 letters in Upper Case
1 Special Character (!@#$&*)
2 numerals (0-9)
3 letters in Lower Case
8 characters minimum
`
								}
							})}
						/>
						{ errors.password && <p>{errors.email.password}</p> }
						<MyButton
							type="submit"
							className="w-full"
							action="signup"
						>
							Sign Up
						</MyButton>
					</div>
				</form>
			</div>
		</div>
	);
}