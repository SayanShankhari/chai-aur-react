import { createSlice } from "@reduxjs/toolkit";	// RTK

const init_state = {
	status: false
	, user_data: null
}

const authSlice = createSlice (	// slice: modular abstraction over reducers
	{
		name: "Auth"
		, initialState: init_state
		, reducers: {	// reducers: state generator low level functions
			store_signup: (state, action) => {
				state.status = false;
				state.user_data = action.payload.user_data;
			}
			, store_signin: (state, action) => {
				state.status = true;
				state.user_data = action.payload.user_data;
			}
			, store_signout (state, action) {
				state.status = false;
				state.user_data = null;
			}
		}
	}
);

// Named exports for actions (optional, but common)
export const { store_signup, store_signin, store_signout } = authSlice.actions; // list of reducer functions

// Named export for the reducer function list itself
export const authReducer = authSlice.reducer;

// Default export for the entire slice (useful if you need other parts like selectors)
export default authSlice;