import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Profile() {
	const { user } = useContext (UserContext);

	if (!user) {
		return (
			<h1 className="text-red-500">Please Login</h1>
		);
	}

	return (
		<>
			<h1 className="text-green-500">Welcome { user.username }!</h1>
		</>
	)
}