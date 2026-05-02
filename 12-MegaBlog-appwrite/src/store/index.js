import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import authorsReducer from "./authorsSlice";
import postsReducer from "./postsSlice";

const configuredStore = configureStore (
	{
		reducer: {
			auth: authReducer // rename the key from "state.authReducer" to "state.auth"
			, posts: postsReducer
			, authors: authorsReducer
		}
	}
);

export default configuredStore;