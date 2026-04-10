import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore (
	{
		reducer: {
			auth: authReducer // rename the key from "state.authReducer" to "state.auth"
		}
	}
);

export default store;