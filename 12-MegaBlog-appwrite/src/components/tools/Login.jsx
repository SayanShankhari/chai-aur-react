import { useState } from "react";
import { login as signin} from "../../store/authSlice";
import { MyButton, MyInput, MyLogo } from "../atoms"
import { useDispatch } from "react-redux";
import AuthService from "../../lib/appwrite/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login () {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit, watch, formState: {errors} } = useForm (
		{
			defaultValues: {
				email: ""
				, password: ""
			}
		}
	);

	const [error, setError] = useState ("");

	async function handleSignin (data) {
		setError ("");

		try {
			const session = await AuthService.login (data);

			if (session) {
				const user_data = await AuthService.getCurrentUser();

				if (user_data) {
					dispatch (signin (user_data));
				}

				navigate ("/");
			}
		} catch (error) {
			setError (error);
		}
	}

	return (
		<div className="flex items-center justify-center w-full">
			<div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<MyLogo size="100" />
					</span>
					<h2 className="text-center text-2xl font-bold leading-tight">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-base text-black/60">
						Don&apos;t have any account?&nbsp;
						<Link
							to="/signup"
							className="font-medium text-primary transition-all duration-200 hover:underline"
						>
							Sign Up
						</Link>
					</p>
					{ error && (
						<p className="text-red-600 mt-8 text-center">
							{ error }
						</p>
					)}
					<form
						onSubmit={ handleSubmit (handleSignin) }
						className="mt-8 space-y-6"
						action=""
					>
						<div className="space-y-5">
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
								})}
							/>
							<MyButton
								type="submit"
								className="w-full"
							>
								Sign In
							</MyButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}