import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "../features/todoSlice"

// import into App.jsx 
export const store = configureStore (
	{ reducer: todoReducer }
);