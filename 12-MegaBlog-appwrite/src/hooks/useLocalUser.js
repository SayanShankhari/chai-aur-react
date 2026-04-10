import { useCallback, useState } from "react";
import { UserModel } from "../models/UserModel";

function useLocalUser (initialUserData = UserModel) {
	const [ local_user, setLocalUser ] = useState (initialUserData);

	const updateLocalUser = useCallback ((updates) => {
		setLocalUser ((prev) => ( { ...prev, ...updates } ));
	}, []);

	const resetLocalUser = useCallback (() => {
		setLocalUser (initialUserData);
	}, [initialUserData])

	return [ local_user, updateLocalUser, resetLocalUser ];
}

export default useLocalUser;