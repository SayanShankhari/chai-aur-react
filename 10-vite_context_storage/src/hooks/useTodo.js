import { useContext } from "react";
import { TodoContext } from "../contexts";

export default function useTodo () {
	return useContext (TodoContext);
};