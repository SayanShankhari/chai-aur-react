import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{ id: "0", name: "Tianna Jenkins", avatar: "" },
	{ id: "1", name: "Kevin Grant", avatar: "" },
	{ id: "2", name: "Madison Price", avatar: "" }
];

const authorsSlice = createSlice(
	{
		name: "authors",
		initialState,
		reducers: {
			// You could add actions to fetch users from an API here
		}
	}
);

export default authorsSlice.reducer;