import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../lib/appwrite/AuthenticationService";

import { MyButton, MyInput, MyLogo } from "../atoms";
import { useForm } from "react-hook-form";
import { store_signin, store_signup } from "../../store/authSlice";

export default function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState ("");

	const { register, handleSubmit } = useForm();

	async function handle_signup (data) {
		setError ("");

		try {
			const user_data = await AuthenticationService.createAccount (data);
			if (user_data) {
				const user = await AuthenticationService.getCurrentUser ();

				if (user) {
					dispatch (store_signin (user));
				}

				navigate ("/");
			} else {

			}
		} catch (error) {
			setError (error.message);
		}
	}

	return (
		<div className="flex items-center justify-center">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<MyLogo size="100" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/signin"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{ error && (
					<p className="text-red-600 mt-8 text-center">
						{ error }
					</p>
				)}
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
						<MyInput
							label="Email: "
							placeholder="Enter your eMail"
							type="email"
							{...register ("email", {
								required: "email address is required" // short-hand for { value: true, message: "email ... required" }
								, validate: {}
								, pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
									, message: "Invalid eMail address"
								}
							})}
						/>
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
									value: /^(?=(.*[A-Z]){2,})(?=.*[!@#$%^&*()\-__+.])(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{8,}$/.test(value)
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
						<MyButton
							type="submit"
							className="w-full"
						>
							Sign Up
						</MyButton>
					</div>
				</form>
			</div>
		</div>
	);
}