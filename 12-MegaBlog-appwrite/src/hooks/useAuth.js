import { useDispatch, useSelector } from "react-redux";
import useLocalUser from "./useLocalUser";
import { UserModel } from "../models/UserModel";
import { AuthenticationService } from "../services";
import { useEffect, useCallback } from "react";
import { store_signin, store_signout, store_signup } from '../store/authSlice';
import useLocalStore from "./useLocalStore";

function useAuth() {
	const dispatch = useDispatch();

	// redux state stored user
	const auth_state = useSelector ((state) => state.auth);	// { status, user }

	// local user, keeps UserModel
	const [ localUser, updateLocalUser, resetLocalUser ] = useLocalUser (auth_state.user ?? UserModel);

	// window's local storage
	// referred original names [ localStoreValue, setLocalStoreValue, unsetLocalStoreValue ]
	const [ localStoreUser, setLocalStoreUser, unsetLocalStoreUser ] = useLocalStore ("weblog_user"); // temporary, later update with real id
	// const [ localStoreValue, setLocalStoreValue, unsetLocalStoreValue ] = useLocalStore ("weblog_user"); // temporary, later update with real id

	useEffect (() => {
		// Sync with Appwrite on mount
		async function syncWithLocalUser () {
			//const remote_user = AuthenticationService.logout().then ().catch((error) => {console.log(error?.message);});

			// check if local user already present
			if (localStoreUser && localStoreUser.id !== "") {
				console.log ("FOUND USER LOCALLY!");
				updateLocalUser (localStoreUser);
				dispatch (store_signin (localUser));

				try {
					const remote_user = await AuthenticationService.getCurrentUser();

					if (!remote_user) {
						throw new Error ("Remote user session not found!");
					}
				} catch (error) {
					console.log (error?.message);
					throw error;
				}
			} else {
				console.log ("NOT FOUND USER LOCALLY!");

				resetLocalUser ();
				unsetLocalStoreUser ();
				dispatch (store_signout ());
			}
		}
/*
		// Sync with Appwrite on mount
		// TODO: fix this
		async function syncWithAppwrite () {
			try {
				const remote_user = await AuthenticationService.getCurrentUser();
				// console.log(AuthenticationService);
				if (!remote_user) {
					throw new Error ("Not logged in!");
				}
				// if (null == localStorage.getItem (key)) {
				// 	throw new Error ("Locally stored user not found!");
				// }
				// setLocalStoreUser (remote_user.$id);
				if (!localStoreUser) {
					throw new Error ("Locally stored user not found!");
				}
				// updateLocalUser ( { id: remote_user.id, name: remote_user.name, email: remote_user.email } );
				// dispatch (store_signin ( { user: {...UserModel}, ...localUser } ));
				//return localUser;
				dispatch (store_signout ());
				resetLocalUser ();
				unsetLocalStoreUser ();
			} catch (errors) {
				//await AuthenticationService.logout ();
				dispatch (store_signout ());
				resetLocalUser ();
				unsetLocalStoreUser ();
				throw errors;
			}
		}
*/
		syncWithLocalUser();
//		syncWithAppwrite();
	}, [ dispatch, updateLocalUser, resetLocalUser ]);

	const auth_signin = useCallback (async ( { email, password } ) => {
		try {
			const remote_session = await AuthenticationService.login ( { email, password } );

			if (!remote_session) {
				throw new Error ("Unable to create session!");
			}

			// need the value now, not after re-render
			const updatedUserInfo = {
				...localUser
				, id: remote_session.userId
				, email							// equivalent to `email: email`
				, session: remote_session.$id
			};

			updateLocalUser (updatedUserInfo);

			setLocalStoreUser (updatedUserInfo);
			dispatch (store_signin ( { user: updatedUserInfo } ));	// sync global with local

			return updatedUserInfo;
		} catch (error) {
			console.error ("Login failed: ", error);
			throw error;
		}
	}, [ dispatch, updateLocalUser, setLocalStoreUser ]);

	const auth_signup = useCallback (async ( { name, email, password } ) => {
		try {
			const user = await AuthenticationService.createUser ( { name, email, password } );

			if (!user) {
				throw new Error ("Failed creating new user!");
			}

			// set immediately, instead of relying upon localUser to wait for next render
			const updatedUserInfo = {
				...localUser
				, id: user.$id
				, name: user.name
				, email: user.email
			}

			updateLocalUser (updatedUserInfo);
			setLocalStoreUser (updatedUserInfo);
			dispatch (store_signup ( { user: updatedUserInfo } ));

			return login ( { email, password } );
		} catch (errors) {
			throw errors;
		}
	}, [ dispatch, updateLocalUser ]);

	const auth_signout = useCallback (async () => {
		await AuthenticationService.logout ();
		resetLocalUser ();
		unsetLocalStoreUser ();
		dispatch (store_signout ());
	}, [ dispatch, resetLocalUser ]);

	return { auth_signup, auth_signin, auth_signout };
}

export default useAuth;