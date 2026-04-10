import { useRef, useState } from "react";
import { MyButton, MyInput, MyLogo } from "../atoms"
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";

export default function SigninForm () {
	const navigate = useNavigate();
	//const dispatch = useDispatch();
	const { register, handleSubmit, watch, formState:{ errors } } = useForm (
		{
			defaultValues: {
				email: ""
				, password: ""
			}
		}
	);
	const buttonReference = useRef (null);
	const [error, setError] = useState ("");
	const { auth_signin } = useAuth();

	async function handleSignin (form_data) {
		//event.preventDefault();
		setError ("");
		// console.log (form_data);

		const user = await auth_signin (form_data);	// handover to hook

		if (user) {
			navigate ("/");
		} else {
			setError ("Unable to login at the moment!");
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
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-white/60">
					Don&apos;t have an account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{/* { authError && (
					<p className="text-red-600 mt-8 text-center">
						{ authError.message }
					</p>
				)} */}
				<form
					onSubmit={ handleSubmit (handleSignin) }
					className="mt-8 space-y-6"
				>
					<div className="space-y-5">
						<MyInput
							label="Email: "
							placeholder="Enter your eMail"
							type="email"
							autoComplete="username"
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
							type="password"
							name="password"
							placeholder="Enter your Password"
							autoComplete="current-password"
							{...register ("password", {
								required: "password is required"
								, minLength: {
									value: 4
									, message: "Password length should be at least 8"
								}
								, pattern: {
									value: /^(?=(.*[A-Z]){2,})(?=.*[!@#$%^&*()\-__+.])(?=(.*[0-9]){2,})(?=(.*[a-z]){3,}).{8,}$/ //.test(value)
									, message: `Invalid password`
								}
							})}
						/>
						{ errors.password && <p>{errors.password.message}</p> }
						<MyButton
							type="submit"
							className="w-full"
							action="signin"
							ref={ buttonReference }
						>
							Sign In
						</MyButton>
					</div>
				</form>
			</div>
		</div>
	);
}