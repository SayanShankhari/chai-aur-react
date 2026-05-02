import { useCallback } from "react";
import { PostModel } from "../models";

export default function useDB (post = PostModel) {
	// const [value, setValue] = useState(() => Cookies.get (name));

	// const updateCookie = useCallback (
	// 	(
	// 		newValue
	// 		, options = {}
	// 	) => {
	// 		const secureOptions = {
	// 			secure: true
	// 			, sameSite: "None"
	// 			, path: "/"
	// 			, ...options
	// 		}
	// 	}	// callback ends here
	// 	, [name]	// dependancy list
	// );

	// const deleteCookie = useCallback (() => {
	// 	Cookies.remove (name);
	// 	setValue (undefined);
	// }, [name]);

	// return [ value, updateCookie, deleteCookie ];
}